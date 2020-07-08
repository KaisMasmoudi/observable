import { EventSubscriber, EntitySubscriberInterface, Connection, InsertEvent } from "typeorm";
//import { Attendance } from "../interface/attendance.interface";
import { Attendance } from "../attendance.entity";
import { AttendanceService } from "../attendance.service";

@EventSubscriber()
export class AttendanceSubscriber implements EntitySubscriberInterface<Attendance> {
  constructor(connection: Connection, private attendanceService:AttendanceService) {
    connection.subscribers.push(this);
  }

  listenTo() {
    return Attendance;
  }

  beforeInsert(event: InsertEvent<Attendance>) {
    console.log(`BEFORE USER INSERTED: `, event.entity);
  }
  async afterInsert(event: InsertEvent<Attendance>){
    await this.attendanceService.getAllAttendances();
  }
}