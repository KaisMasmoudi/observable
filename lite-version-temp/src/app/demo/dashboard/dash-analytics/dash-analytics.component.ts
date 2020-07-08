import {Component, OnInit, ViewChild} from '@angular/core';
import {Attendance} from '../../Api/classes/attendance';
import {FreeApiService} from '../../Api/services/freeapi.service';
import {BehaviorSubject, Subscription} from 'rxjs';
import {MatPaginator, MatSort, MatTableDataSource, Sort} from '@angular/material';
import {element} from 'protractor';

@Component({
  selector: 'app-dash-analytics',
  templateUrl: './dash-analytics.component.html',
  styleUrls: ['./dash-analytics.component.scss']
})
export class DashAnalyticsComponent implements OnInit {

  displayedColumns = ['Id', 'UserName', 'DeviceIP', 'DateIN', 'DateOUT'];
  public dataSource = new MatTableDataSource<Attendance>();

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private freeApiService: FreeApiService) {}
  listAttendances: Attendance[];
  displayData: boolean;

  //delay in ms
  private delay(ms: number)
  {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async ngOnInit() {
    this.displayData = false;
    this.freeApiService.getAllAttendances()
      .subscribe
      (data => {
		  console.log(data);
        this.listAttendances = data;
        this.displayData = true;
		this.dataSource = new MatTableDataSource(this.listAttendances);
      });
    await this.delay(500);
    this.listAttendances.forEach(element=>
    {
      /*if(element.DateIN == null || element.DateOUT == null)
      {
        let rows = document.getElementsByName("mat-row");
        rows.forEach(row =>
        {
          const r = row as HTMLInputElement;
          console.log(r.id);
          if (parseInt(r.id) == element.Id)
          {
            console.log(r.id);
            //row.id.fontcolor('#FF0000');
            row.style.backgroundColor= '#FF00000';
          }
        });
      }*/
    });
    //	this.dataSource = new MatTableDataSource(this.listAttendances);

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    //console.log(this.listAttendances);*/
  }

   applyFilter(event: Event) {
     const filterValue = (event.target as HTMLInputElement).value;
     this.dataSource.filter = filterValue.trim().toLowerCase();

     if (this.dataSource.paginator) {
       this.dataSource.paginator.firstPage();
     }
   }


}

