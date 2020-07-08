import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AttendanceModule } from './attendance/attendance.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Attendance } from './attendance/attendance.entity';
import { AttendanceHttpModule } from './attendance/attendance-http.module';
import { AttendanceController } from './attendance/attendance.controller';
import { AttendanceService } from './attendance/attendance.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'zktaccess',
    entities: [Attendance],
    synchronize: true,
    autoLoadEntities:true
  })/*
  TypeOrmModule.forRootAsync({
    useFactory: () => ({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'zktaccess',
      entities: [Attendance],
      synchronize: true,
    }),
  })*/
  ,AttendanceModule],
  controllers: [AppController],
  providers: [AppService,AttendanceService],
})
export class AppModule {}
