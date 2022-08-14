import { Controller, 
  Post, 
  Body, 
  UseGuards,
  Patch,
  Param,
  Get,
  Query
} from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { User } from 'src/users/user.entity';
import { ApproveReportDto } from './dtos/approve-report.dto';
import { CreateReportDto } from './dtos/create-report.dto';
import { ReportDto } from './dtos/report.dto';
import { ReportsService } from './reports.service';
import { AdminGuard } from './../guards/admin.guard';
import { GetEstimateDto } from './dtos/get-etimate.dto';

@Controller('reports')
export class ReportsController {

  constructor(private reportsService: ReportsService) {}

  @Get()
  getEstimate(@Query() query: GetEstimateDto) {
    return this.reportsService.createEstimate(query);
  }

  @Post() 
  @Serialize(ReportDto)
  @UseGuards(AuthGuard)
  createReport(@Body() body: CreateReportDto, @CurrentUser() user: User) {
    return this.reportsService.create(body, user);
  }

  @Patch('/:id')
  @UseGuards(AdminGuard)
  approveReport(@Param('id') id: string, @Body() body: ApproveReportDto ) {
    console.log(id);
    return this.reportsService.changeApproval(+id, body.approved);
  }
}
