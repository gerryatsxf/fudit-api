import {ArgumentsHost, Catch, ExceptionFilter} from '@nestjs/common';
import {Neo4jError} from 'neo4j-driver';
import {Request, Response} from 'express';
import {
  EXISTING_RELATIONSHIPS_CONSTRAINT,
  UNIQUE_EMAIL_CONSTRAINT,
} from '../neo4j.constants';

@Catch(Neo4jError)
export class Neo4jErrorFilter<T> implements ExceptionFilter {
  constructor() {} // private readonly logger = new Logger(NEO4J_DRIVER_ERROR_LOGS); // TODO: set a value for NEO4J_DRIVER_ERROR_LOGS in constants file // TODO: implement this.logger

  // TYPES OF NEO4J CONSTRAINTS:
  // - (COMMUNITY) Unique node property constraints: Unique node property constraints, or node property uniqueness constraints,
  //   ensure that property values are unique for all nodes with a specific label.
  // - (ENTERPRISE) Node property existence constraints: Node property existence constraints ensure that
  //   a property exists for all nodes with a specific label.
  // - (ENTERPRISE) Relationship property existence constraints: Relationship property existence constraints
  //   ensure that a property exists for all relationships with a specific type.
  // - (ENTERPRISE) Node key constraints: Node key constraints ensure that, for a given label and set of properties:
  //      1. All the properties exist on all the nodes with that label.
  //      2. The combination of the property values is unique.

  catch(exception: Neo4jError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const logError = {
      code: exception.code,
      name: exception.name,
      error: exception.message,
      messageStack: ['An error ocurred in the Neo4j database.'],
    };

    const clientError = {
      statusCode: 500,
      error: 'Internal Server Error',
      message: 'Try again later',
    };

    const exceptionCodeContains = {
      constraintNotSatisfied: 'ConstraintValidationFailed',
    };

    if (exception.code.includes(exceptionCodeContains.constraintNotSatisfied)) {
      clientError.statusCode = 409;
      clientError.error = 'Conflict';
      clientError.message = 'A conflict happened';
      logError.messageStack.push('Constraint not satisfied');

      if (exception.message.includes(UNIQUE_EMAIL_CONSTRAINT)) {
        // Neo4jError:
        // New data does not satisfy Constraint( id=4, name='unique_user_email', type='UNIQUENESS', schema=(:User {email}), ownedIndex=3 ):
        // Both node 5 and node -1 share the property value ( String("gerry@gmail.com") )
        logError.messageStack.push(
          `Uniqueness constraint ${UNIQUE_EMAIL_CONSTRAINT} for user.email not satisfied.`,
        );
        const emailInUseMsg = `Email ${request.body.email} already in use.`;
        logError.messageStack.push(emailInUseMsg);
        clientError.message = emailInUseMsg;
      }

      if (exception.message.includes(EXISTING_RELATIONSHIPS_CONSTRAINT)) {
        // Neo4jError:
        // Cannot delete node<15>, because it still has relationships. To delete this node, you must first delete its relationships.
        logError.messageStack.push(
          `Existing relationships constraint enforced while trying to delete node. DELETE statement failed.`,
        );
        clientError.message = `Cannot delete record.`;
      }
    }

    // TODO: add logger and log business-logic error.
    // We log internal-use information
    // this.logger.log(logError)
    console.log(exception.stack);
    console.log(logError);

    // We send client-side error response
    response.status(clientError.statusCode).json(clientError);
  }
}
