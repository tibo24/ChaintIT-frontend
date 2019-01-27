import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-main-dashboard',
  templateUrl: './main-dashboard.component.html',
  styleUrls: ['./main-dashboard.component.css']
})
export class MainDashboardComponent implements OnInit {
  sensorDataList;
  moduleName: string;
  cardSizes: any;
  view: number[];

  dataSource = new MatTableDataSource<any[]>();

  displayedColumns: string[] = ['lrcid', 'date', 'temp', 'status'];

  sensorData = [
    {
      "name": "Goed",
      "value": 9
    },
    {
      "name": "Slecht",
      "value": 1
    }
  ];

  cards = this.breakpointObserver.observe(Breakpoints.Large).pipe(
    map(({ matches }) => {
      if (matches) {
        this.cardSizes = [
          { cols: 2, rows: 2 },
          { cols: 2, rows: 2 }
        ];
      } else {
        this.cardSizes = [
          { cols: 4, rows: 2 },
          { cols: 4, rows: 2 }
        ];
      }
    })
  ).subscribe();

  public tempGraph = [
    {
      'name': "Temperatuur",
      'series': [
      ]
    }
  ];


  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA', '#0000b2 ']
  };

  response: any[] = [];

  constructor(private breakpointObserver: BreakpointObserver) { this.view = [innerWidth / 1.3, 400]; }

  ngOnInit() {
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onResize(event) {  this.view = [event.target.innerWidth / 1.35, 400]; }
}
