import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Report } from './report.entity';
import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';

@Module({
  controllers: [ReportsController],
  providers: [ReportsService],
  imports: [
    TypeOrmModule.forFeature([Report])
  ]
})
export class ReportsModule {}
