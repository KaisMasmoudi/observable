import { Injectable, NotFoundException } from '@nestjs/common';
import { Attendance } from './attendance.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Observable, from } from 'rxjs';
import { switchMap, map, catchError} from 'rxjs/operators';


@Injectable()
export class AttendanceService {

    constructor(@InjectRepository(Attendance)
        private attendancesRepository: Repository<Attendance>,
    ) {}


    private attendances: Attendance[]=[];

    createAttendance(attendance: Attendance):Observable<Attendance>
    {
        return from(this.attendancesRepository.save(attendance));
    }

    getAllAttendances():Observable<Attendance[]>
    {
        //return from(this.attendancesRepository.find());
        return from(this.attendancesRepository.find()).pipe(
            map((attendances: Attendance[]) => {
                //attendances.forEach(function (v) {delete v.password});
                return attendances;
            })
        );

    }

    /***
    getAttendancesByUser():Promise<Attendance[]>
    {
        
        return this.attendancesRepository.createQueryBuilder('Attendance')
        .orderBy('UserName',"ASC").getMany();
    }

    getAttendancesByDevice():Promise<Attendance[]>
    {
        return this.attendancesRepository.createQueryBuilder('Attendance')
        .orderBy('DeviceIP',"ASC").getMany();
    }
    ***/

    async updateAttendanceById(Id:number,attendance:Attendance)
    {
        //get attendance by id 
        const updateAttendance = this.attendancesRepository.findOne(Id);
        // return error if there is no attendance found
        if (!updateAttendance)
            return new NotFoundException('error ! Attendance not found');
        // update an element in attendance
        if(attendance.UserName)
           (await updateAttendance).UserName=attendance.UserName;

        if(attendance.DeviceIP)
           (await updateAttendance).DeviceIP=attendance.DeviceIP;

        if(attendance.DateIN)
           (await updateAttendance).DateIN=attendance.DateIN;

        if(attendance.DateOUT)
           (await updateAttendance).DateOUT=attendance.DateOUT;

        this.attendancesRepository.update( await this.attendancesRepository.findOne(Id),await updateAttendance)
    }

    async deleteAttendanceById(Id:number):Promise<void> 
    {
        await this.attendancesRepository.delete(Id);
    }
}
