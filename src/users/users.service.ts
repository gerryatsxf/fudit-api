import {Injectable} from '@nestjs/common';
import {Neo4jService} from '../neo4j/neo4j.service';
import {Node, types} from 'neo4j-driver';
import {EncryptionService} from '../encryption/encryption.service';
export type User = Node;

@Injectable()
export class UsersService {
  constructor(
    private readonly neo4jService: Neo4jService,
    private readonly encryptionService: EncryptionService,
  ) {}

  async findByEmail(email: string): Promise<User | undefined> {
    const res = await this.neo4jService.read(
      `MATCH (u:User {email: $email}) RETURN u`,
      {email},
    );
    return res.records.length ? res.records[0].get('u') : undefined;
  }

  async create(
    email: string,
    password: string,
    dateOfBirth: Date,
    firstName?: string,
    lastName?: string,
  ): Promise<User> {
    const res = await this.neo4jService.write(
      `CREATE (u:User) SET u.id = randomUUID(), u += $properties RETURN u`,
      {
        properties: {
          email,
          password: await this.encryptionService.hash(password),
          firstName,
          lastName,
          dateOfBirth: types.Date.fromStandardDate(dateOfBirth),
        },
      },
    );

    const user = res.records[0].get('u');

    try {
      await this.neo4jService.write(
        `
          MATCH (f:Food {public: True})
          MATCH (r:Recipe {public: True})
          MATCH (u:User {id: $userId})
          MERGE (u)-[:HAS_ACCESS_TO {canEdit: False, canDelete: False, createdByUser: False}]->(f)
          MERGE (u)-[:HAS_ACCESS_TO {canEdit: False, canDelete: False, createdByUser: False}]->(r)
        `,
        {
          userId: user.properties.id,
        },
      );
    } catch (e) {
      console.log('Unable to create HAS_ACCESS_TO relationship');
    }

    return user;
  }
}
