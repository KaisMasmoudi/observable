import { Module } from '@nestjs/common';
import { AttendanceModule } from './attendance.module';
import { AttendanceService } from './attendance.service';
import { AttendanceController } from './attendance.controller';

@Module({
    imports: [AttendanceModule],
  providers: [AttendanceService],
  controllers: [AttendanceController]
})
export class AttendanceHttpModule {}
