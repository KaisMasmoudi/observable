import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Attendance} from '../classes/attendance';


@Injectable()
export class FreeApiService
{
  constructor(private httpClient : HttpClient) {}

  getAllAttendances():Observable<Attendance[]>
  {
    return this.httpClient.get<Attendance[]>('/attendance');
  }

}
