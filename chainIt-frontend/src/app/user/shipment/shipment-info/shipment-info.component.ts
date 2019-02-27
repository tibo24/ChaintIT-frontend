import { Component, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { ShipmentService } from 'src/app/services/shipment.service';
import { DatePipe } from '@angular/common';
import { MatSort } from '@angular/material';

@Component({
  selector: 'app-shipment-info',
  templateUrl: './shipment-info.component.html',
  styleUrls: ['./shipment-info.component.css'],
  providers: [DatePipe]
})
export class ShipmentInfoComponent implements OnInit {
  sensorDataList;
  moduleName: string;
  cardSizes: any;
  view: number[];
  private name: string;
  snapshotParam: string;
  product: string;
  minTemp: string;
  maxTemp: string;
  currentTemp: string;
  shipmentData: any;
  status: string;

  dataSource = new MatTableDataSource<any[]>();
  temperatureList: any[] = [];

  displayedColumns: string[] = ['location', 'date', 'temp', 'responsibleUser'];

  cards = this.breakpointObserver.observe(Breakpoints.Large).pipe(
    map(({ matches }) => {
      if (matches) {
        this.cardSizes = [
          { cols: 1, rows: 1 },
          { cols: 2, rows: 2 },
          { cols: 2, rows: 2 }
        ];
      } else {
        this.cardSizes = [
          { cols: 4, rows: 1 },
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

  dateFormat: string = 'dd/MM/yyyy hh:mm:ss';

  response: any[] = [];

  constructor(private breakpointObserver: BreakpointObserver, private route: ActivatedRoute, private shipmentService: ShipmentService, private datePipe: DatePipe) { }

  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    this.snapshotParam = this.route.snapshot.paramMap.get('shipment');
    this.shipmentInformation(this.snapshotParam);
    this.dataSource.sort = this.sort;
  }

  shipmentInformation(shipmentId: string) {
    this.shipmentService.getShipmentInformationWithReadings(shipmentId)
    .then((shipmentInfo) => {
      this.temperatureList.push(shipmentInfo['temperatureReadings']);
      this.shipmentData = shipmentInfo['shipmentData'][0];

      this.status = shipmentInfo['status'];
      this.product = this.shipmentData.productName;
      this.minTemp = this.shipmentData.minTemp;
      this.maxTemp = this.shipmentData.maxTemp;
      this.currentTemp = this.temperatureList[0][this.temperatureList[0].length - 1].temperature;

      this.temperatureList[0].map((temperatureReading) => {
        this.tempGraph[0].series.push({ 'name': this.datePipe.transform(temperatureReading.time, this.dateFormat), 'value': temperatureReading.temperature });
        this.response.push({ 'location': temperatureReading.Lrcid, 'date': this.datePipe.transform(temperatureReading.time, this.dateFormat), 'temp': temperatureReading.temperature, 'responsibleUser': temperatureReading.verantwoordelijke});
        this.tempGraph = [...this.tempGraph];
        this.dataSource.data = this.response;
      });
    })
    .catch((err) => {
      this.product = 'Geen info gevonden over deze shipment';
    });
  }

  onResize(event) { this.view = [event.target.innerWidth - 900, 280]; }
}
