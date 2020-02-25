import { Controller, Get, Post, Body } from '@nestjs/common';
import { DataService } from './data.service';
import { CreateData } from './dtos/data.dto';

@Controller('data')
export class DataController {
  constructor(private readonly dataService: DataService) { }

  @Post('history')
  async inve(@Body() path: CreateData): Promise<number> {
    return this.dataService.income(path.path);
  }

  @Post('product')
  async income(@Body() path: CreateData): Promise<number> {
    return this.dataService.create(path);
  }
}
