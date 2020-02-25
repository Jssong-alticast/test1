import { Injectable, HttpService } from '@nestjs/common';
import * as fs from 'fs';
import { Data, CreateData } from './dtos/data.dto';

@Injectable()
export class DataService {
  constructor(private readonly httpService: HttpService) {}

  getHello(): string {
    return 'Hello World!';
  }

  async income(path: string): Promise<number> {
    var stream = fs.readFileSync(path, {encoding: "utf8"});
    var rows = stream.split("\n");    
    var count = 0;

    for (var rowIndex in rows) {
      var row = rows[rowIndex].split(",");
      if (row.length == 5) {
        var date: string = row[0].replace(/(^\s*)|(\s*$)/g, "");
        // data.date = new Date(date);
        var data = new Data();
        data.date = date;
        data.name = row[1];
        data.type = row[2];
        data.account = row[3];
        data.income = +row[4];
        
        if (data.type === '상환' || data.type === '비용' || data.type === '투자') {
          console.log(count, data.date, data.type, data.name, data.income);
          this.httpService.post('http://localhost:3001/products/history', data)
            .subscribe((response) => {
              console.log(response.config.data);
            }, (err) => {
              console.log('error', err);
            }, () => {
              console.log('complete');
            });
          count = count + 1;
        }
      }
    }
    return count;
  }

  async create(path: CreateData): Promise<number> {
    var stream = fs.readFileSync(path.path, {encoding: "utf8"});
    var rows = stream.split("\n");    
    var count = 0;

    for (var rowIndex in rows) {
      var row = rows[rowIndex].split(",");
      if (row.length == 5) {
        var date: string = row[0].replace(/(^\s*)|(\s*$)/g, "");
        // data.date = new Date(date);
        var data = new Data();
        data.date = date;
        data.name = row[1];
        data.type = row[2];
        data.account = row[3];
        data.income = +row[4];
        
        if (data.type === '투자') {
          console.log(count, data.date, data.type, data.name, data.income);
          this.httpService.post('http://localhost:3001/products', data)
            .subscribe((response) => {
              console.log(response.config.data);
            }, (err) => {
              console.log('error');
            }, () => {
              console.log('complete');
            });
          count = count + 1;
        }
      }
    }

    // this.httpService.post('', {});
    return count;
  }
}
