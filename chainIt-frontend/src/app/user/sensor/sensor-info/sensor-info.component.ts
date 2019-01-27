import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { SensorService } from 'src/app/services/sensor.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-sensor-info',
  templateUrl: './sensor-info.component.html',
  styleUrls: ['./sensor-info.component.css']
})
export class SensorInfoComponent implements OnInit {
  sensorDataList;
  moduleName: string;
  cardSizes: any;
  view: number[];

  dataSource = new MatTableDataSource<any[]>();

  displayedColumns: string[] = ['location', 'date', 'temp'];

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

  constructor(private breakpointObserver: BreakpointObserver, private sensorService: SensorService) { }

  ngOnInit() {
    
  }

  getSensor(sensor : string){
    this.moduleName = sensor;
    this.sensorDataList = this.sensorService.getSensorDataByName(sensor);
    this.sensorDataList.subscribe(res => {
    let sensorData = res.dataReading;

      for (let data of sensorData) {
        this.tempGraph[0].series.push({ 'name': data.timestamp, 'value': data.value });
        this.response.push({ 'location': data.lrcid, 'date': data.timestamp, 'temp': data.value });
        this.tempGraph = [...this.tempGraph];
        this.dataSource.data = this.response;
      }
    });
  }


  onResize(event) { this.view = [event.target.innerWidth - 900, 280]; }
}
