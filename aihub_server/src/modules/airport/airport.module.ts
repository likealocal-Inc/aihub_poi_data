import { Module } from '@nestjs/common';
import { AirportService } from './airport.service';
import { AirportController } from './airport.controller';
import { Files } from 'src/config/core/files/files';

@Module({
  controllers: [AirportController],
  providers: [AirportService],
})
export class AirportModule {}
