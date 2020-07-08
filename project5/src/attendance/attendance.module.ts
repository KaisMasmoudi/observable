import { Module } from '@nestjs/common';
import { AttendanceController } from './attendance.controller';
import { Attendance } from './attendance.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttendanceService } from './attendance.service';
import { AttendanceSubscriber } from './subscribers/PostSubscriber';

@Module({
  imports: [TypeOrmModule.forFeature([Attendance])],
  providers: [AttendanceService,AttendanceSubscriber],
  controllers: [AttendanceController],
  //If you want to use the repository outside
  exports:[TypeOrmModule]
})
export class AttendanceModule {}
