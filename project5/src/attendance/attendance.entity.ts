import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn, AfterInsert, EventSubscriber, EntitySubscriberInterface } from 'typeorm';

@Entity()
export class Attendance
{
    @PrimaryGeneratedColumn()
    Id:number;
    @Column({ nullable: true})
    UserName:string;
    @Column({ nullable: true})
    DeviceIP:string;
    @Column({ nullable: true})
    DateIN:Date;
    @Column({ nullable: true})
    DateOUT:Date;

}
