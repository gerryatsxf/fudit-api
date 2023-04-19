import {Controller, Get, Request, Res, All} from '@nestjs/common';
import {ApiTags} from '@nestjs/swagger';
import {METHOD_NOT_ALLOWED} from './app.constants';
import {AppService} from './app.service';

@ApiTags('Database check')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @All('')
  // async notAllowed(@Request() request, @Res() response): Promise<any> {
  //   // Return a 405 Method Not Allowed error for any HTTP method that is not POST
  //   if (request.method !== 'GET') {
  //     response.setHeader('Allow', 'GET');
  //     response.status(405).send({statusCode: 405, error: METHOD_NOT_ALLOWED});
  //   }
  // }
}
