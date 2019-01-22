import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-module',
  templateUrl: './module.component.html',
  styleUrls: ['./module.component.css']
})
export class ModuleComponent implements OnInit {
  moduleName : String = "Module 123";
  
  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Large).pipe(
  map(({ matches }) => {
      if (matches) {
        return [
          { cols: 3, rows: 2 },
          { cols: 1, rows: 1 },
          { cols: 1, rows: 1 },
          { cols: 4, rows: 2 }
        ];
      }
      return [
        { cols: 4, rows: 2 },
        { cols: 2, rows: 1 },
        { cols: 2, rows: 1 },
        { cols: 4, rows: 2 }
      ];
    })
  );
  
  public multi = [
    {
      "name": "Germany",
      "series": [
        {
          "name": "2006",
          "value": 5410000
        },
        {
          "name": "2007",
          "value": 5780000
        },
        {
          "name": "2008",
          "value": 6150000
        },
        {
          "name": "2009",
          "value": 6990000
        },
        {
          "name": "2010",
          "value": 7300000
        },
        {
          "name": "2011",
          "value": 8940000
        }
      ]
    },
  
    {
      "name": "USA",
      "series": [
        {
          "name": "2009",
          "value": 6890000
        },
        {
          "name": "2010",
          "value": 7870000
        },
        {
          "name": "2011",
          "value": 8270000
        }
      ]
    },
  
    {
      "name": "France",
      "series": [
        {
          "name": "2009",
          "value": 4680000
        },
        {
          "name": "2010",
          "value": 5000002
        },
        {
          "name": "2011",
          "value": 5800000
        }
      ]
    }
  ];
  
  view: any[] = [700,400];
  
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA','#0000b2 ']
  };
  
  
  
    

  constructor(private breakpointObserver: BreakpointObserver) { }

  ngOnInit() {
  }

}
