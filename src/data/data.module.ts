import { Module, HttpModule } from '@nestjs/common';
import { DataController } from './data.controller';
import { DataService } from './data.service';

@Module({
  imports: [HttpModule],
  controllers: [DataController],
  providers: [DataService]
})
export class DataModule {}
