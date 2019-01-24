import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-module-info',
  templateUrl: './module-info.component.html',
  styleUrls: ['./module-info.component.css']
})
export class ModuleInfoComponent implements OnInit {
  moduleName : String = "Module 123";
  cardSizes : any;
  view: number[];
  dataSource : any[] = [
    {location: 'FF0109CE', date: '23/1/2019-18:00', temp: 1.0079},
    {location: 'FF0109CE', date: '23/1/2019-19:00', temp: 4.0026},
    {location: 'FF0109CE', date: '23/1/2019-20:00', temp: 6.941},    
    {location: 'FF0109CE', date: '23/1/2019-21:00', temp: 9.0122},
    {location: 'FF0109CE', date: '23/1/2019-22:00', temp: 10.811},
    {location: 'FF0109CE', date: '23/1/2019-23:00', temp: 12.0107},
    {location: 'FF0109CE', date: '24/1/2019-00:00', temp: 14.0067},
    {location: 'FF0109CE', date: '24/1/2019-01:00', temp: 15.9994},
    {location: 'FF0109CE', date: '24/1/2019-02:00', temp: 18.9984},
    {location: 'FF0109CE', date: '24/1/2019-03:00', temp: 20.1797},
  ];
  displayedColumns: string[] = ['location', 'date', 'temp'];
  
  cards = this.breakpointObserver.observe(Breakpoints.Large).pipe(
  map(({ matches }) => {
      if (matches) {
        this.cardSizes = [
          { cols: 2, rows: 2 },
          { cols: 2, rows: 2 }
        ];
      } else {
        this.cardSizes =  [
          { cols: 4, rows: 2 },
          { cols: 4, rows: 2 }
        ];
      }
    })
  ).subscribe();

  public tempGraph = [
    {
      "name": "Temperatuur",
      "series": [
        {
          "name": "05",
          "value": 5
        },
        {
          "name": "06",
          "value": 8
        },
        {
          "name": "07",
          "value": 5
        },
        {
          "name": "08",
          "value": 3
        },
        {
          "name": "09",
          "value": -2
        },
        {
          "name": "10",
          "value": -5
        }
      ]
    }
  ];
  
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA','#0000b2 ']
  };
  
  
  
  constructor(private breakpointObserver: BreakpointObserver) { }
  
  ngOnInit() {
  }

  onResize(event) { this.view = [event.target.innerWidth - 900, 280 ]; }
}
