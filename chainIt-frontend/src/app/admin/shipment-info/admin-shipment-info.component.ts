import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatDialog, MatDialogConfig } from '@angular/material';
import { ShipmentService } from 'src/app/services/shipment.service';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { RemoveResourcePipe } from 'src/app/shared/remove-resource.pipe';
import { NewShipmentDialogComponent } from '../new-shipment-dialog/new-shipment-dialog.component';
import { SensorService } from 'src/app/services/sensor.service';
import { UserService } from 'src/app/services/user.service';
import { useAnimation } from '@angular/animations';

@Component({
  selector: 'app-admin-shipment-info',
  templateUrl: './admin-shipment-info.component.html',
  styleUrls: ['./admin-shipment-info.component.css']
})
export class AdminShipmentInfoComponent implements OnInit {

  displayedColumns: string[] = ['shipmentId', 'productName', 'minTemp', 'maxTemp', 'sensor', 'unitCount', 'sender', 'shipper', 'receiver'];
  dataSource = new MatTableDataSource<any[]>();
  cardSizes: any;
  shipmentList;
  response: any[] = [];
  sensors: any[] = [];
  users: any[] = [];
  senders: any[] = [];
  shippers: any[] = [];
  receivers: any[] = [];


  @ViewChild(MatPaginator) paginator: MatPaginator;

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

  constructor(private breakpointObserver: BreakpointObserver, private dialog: MatDialog, private shipmentService: ShipmentService, private removeResourcePipe: RemoveResourcePipe, private sensorService: SensorService, private userService: UserService) { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.getAllShipments();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getAllShipments() {
    this.dataSource.data = [];
    this.shipmentList = this.shipmentService.getAllShipments();
    this.shipmentList.subscribe(res => {
      if (res.length <= 0) this.dataSource.data = [];
      this.dataSource.data = res;
    });
  }

  getAllUsers() {
    return new Promise(resolve => {
      this.userService.getAllUsers()
      .then((res) => this.users.push(res))
      .then(() => resolve())
      .catch((err) => console.log(err));
    })
  }

  getAllSensors() {
    return new Promise(resolve => {
      this.sensorService.getAllSensors()
      .then((res) => this.sensors.push(res))
      .then(() => resolve())
      .catch((err) => console.log(err));
      });
  }

  openNewShipmentDialog() {
    this.getAllUsers()
    .then(() => this.getAllSensors()
    .then(() => this.senders.push(this.users[0].filter(user => user.participant == "Sender")))
    .then(() => this.shippers.push(this.users[0].filter(user => user.participant == "Shipper")))
    .then(() => this.receivers.push(this.users[0].filter(user => user.participant == "Receiver")))
    .then(() => this.dialogSettings()));
  }

  dialogSettings() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;


    dialogConfig.data = {
      product: '',
      minTemp: '',
      maxTemp: '',
      sensors: this.sensors[0],
      unitCount: 0,
      senders: this.senders[0],
      shippers: this.shippers[0],
      receivers: this.receivers[0],
    };

    const dialogRef = this.dialog.open(NewShipmentDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => {
        if (data) {
          this.shipmentService.newShipment(data)
          .then(() => {
            this.getAllShipments();
          })
        }
      }
    );
  }

}
