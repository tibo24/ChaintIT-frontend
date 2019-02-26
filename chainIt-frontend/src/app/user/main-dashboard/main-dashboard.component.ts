import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from 'src/app/services/user.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { ShipmentInfoDialogComponent } from 'src/app/shipment-info-dialog/shipment-info-dialog.component';
import { ShipmentService } from 'src/app/services/shipment.service';

@Component({
  selector: 'app-main-dashboard',
  templateUrl: './main-dashboard.component.html',
  styleUrls: ['./main-dashboard.component.css']
})
export class MainDashboardComponent implements OnInit {
  shipmentDataList;
  moduleName: string;
  cardSizes: any;
  view: number[];
  response: any[] = [];

  dataSource = new MatTableDataSource<any[]>();

  displayedColumns: string[] = ['product', 'aantal', 'status', 'sensor', 'actions'];
  sensorData = [
    {
          "name": "Created",
          "value": 0,
        },
        {
          "name": "In Transit",
          "value": 0,
        },
        {
          "name": "Arrived",
          "value": 0,
        }
  ]

  cards = this.breakpointObserver.observe(Breakpoints.Large).pipe(
    map(({ matches }) => {
      if (matches) {
        this.cardSizes = [
          { cols: 4, rows: 2 },
          { cols: 4, rows: 2 }
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
    domain: ['#0000b2', '#C7B42C', '#5AA454']
  };

  constructor(private breakpointObserver: BreakpointObserver, private dialog: MatDialog, private userService: UserService, private shipmentService: ShipmentService) { this.view = [innerWidth / 1.3, 300]; }

  ngOnInit() {
    this.getAllShipments();
  }

  openResponsibleUserDialog(sender: string, shipper: string, receiver: string, responsibleUsers: [], shipmentId: string) {
    const dialogConfig = new MatDialogConfig();
    // dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      responsibleUsers,
      sender,
      shipper,
      receiver,
      shipmentId,
    };

    const dialogRef = this.dialog.open(ShipmentInfoDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      (data) => {
        if (data) {
          this.shipmentService.updateShipment(data)
            .then(() => {
              this.getAllShipments();
            })
        }
      });
  }

  getAllShipments() {
    this.response = [];
    this.userService.getAllUserShipments()
    .then((result) => this.fillSensorAndShipmentData(result))
    .then(() => this.sensorData = [...this.sensorData])
    .then(() => this.dataSource.data = this.shipmentDataList)
    .catch((err) => console.log(err));
  }

  fillSensorAndShipmentData(result: any) {
    this.sensorData[0].value = result['created'];
    this.sensorData[1].value = result['inTransit'];
    this.sensorData[2].value = result['arrived'];
    this.shipmentDataList = result['shipments'];
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onResize(event) {  this.view = [event.target.innerWidth / 1.3, 300]; }
}
