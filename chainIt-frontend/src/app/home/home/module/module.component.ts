import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { NgxChartsModule, CardSeriesComponent } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-module',
  templateUrl: './module.component.html',
  styleUrls: ['./module.component.css']
})
export class ModuleComponent implements OnInit {
  moduleName : String = "Module 123";
  cardSizes : any;
  
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

}
