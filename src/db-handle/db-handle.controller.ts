import { Controller, Delete, Get } from "@nestjs/common";
import {DbHandleService} from './db-handle.service';
import { ApiTags } from "@nestjs/swagger";

@ApiTags('Database')
@Controller('db-handle')
export class DbHandleController {
  constructor(private readonly dbHandleService: DbHandleService) {}
  @Get('/graphs/init')
  async createGraphs(): Promise<any> {
    return this.dbHandleService.initGraphs().then((result: any) => {
      const response = {
        data: 'Initialized database graphs',
        result: result,
      };
      return response;
    });
  }

  @Delete('/graphs/delete')
  async deleteGraphs(): Promise<any> {
    return this.dbHandleService.deleteGraphs().then((result: any) => {
      const response = {
        data: 'Deleted database graphs',
        result: result,
      };
      return response;
    });
  }

  @Get('/constraints/init')
  async createConstraints(): Promise<any> {
    return this.dbHandleService.initConstraints().then((result: any) => {
      const response = {
        data: 'Initialized database constraints',
        result: result,
      };
      return response;
    });
  }

  @Delete('/constraints/delete')
  async deleteConstraints(): Promise<any> {
    return this.dbHandleService.deleteConstraints().then((result: any) => {
      const response = {
        data: 'Deleted database constraints',
        result: result,
      };
      return response;
    });
  }
}
