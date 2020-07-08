import { Controller, Post, Body, Get, Param, Put, Delete, ParseIntPipe } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { Attendance } from './attendance.entity';
import { Observable, from } from 'rxjs';

@Controller('attendance')
export class AttendanceController {

    constructor (private readonly  attendanceService:AttendanceService){}

    @Post()
    createAttendance(@Body() attendance:Attendance):Observable<Attendance>
    {
        return (this.attendanceService.createAttendance(attendance));
    }

    @Get()
    getAllAttendances():Observable<Attendance[]>
    {
        return (this.attendanceService.getAllAttendances());
    }

    @Put('/:id')
    updateAttendanceById(@Param('id',new ParseIntPipe()) id:number,@Body() attendance:Attendance)
    {
        return this.attendanceService.updateAttendanceById(id,attendance);
    }

    @Delete('/:id')
    deleteAttendanceById(@Param('id',new ParseIntPipe()) id:number)
    {
        return this.attendanceService.deleteAttendanceById(id);
    }
}
