import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatDialog, MatDialogConfig } from '@angular/material';
import { SensorService } from 'src/app/services/sensor.service';
import { NewSensorDialogComponent } from '../new-sensor-dialog/new-sensor-dialog.component';
import { DeleteSensorDialogComponent } from '../delete-sensor-dialog/delete-sensor-dialog.component';

@Component({
  selector: 'app-admin-sensor-info',
  templateUrl: './admin-sensor-info.component.html',
  styleUrls: ['./admin-sensor-info.component.css']
})
export class AdminSensorInfoComponent implements OnInit {

  displayedColumns: string[] = ['lrcid', 'actions'];
  dataSource = new MatTableDataSource<any[]>();
  cardSizes: any;
  sensorList;
  response: any[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private dialog: MatDialog, public sensorService: SensorService) { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.getAllSensors();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getAllSensors() {
    this.response = [];
    this.sensorService.getAllSensors()
    .then((result) => this.sensorList = result)
    .then(() => this.dataSource.data = this.sensorList)
    .catch((err) => console.log(err));
  }

  openAddSensorDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      lrcid: '',
    };

    const dialogRef = this.dialog.open(NewSensorDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => {
        if (data) {
          this.sensorService.createSensor(data)
            .then(() => {
              this.getAllSensors();
            })
        }
      }
    );
  }

  openDeleteUserDialog(lrcid: string, sensorId: string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      title: 'Bent u zeker dat u ' + lrcid + ' wilt verwijderen?'
    }

    const dialogRef = this.dialog.open(DeleteSensorDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      (data) => {
        if (data) {
          this.sensorService.deleteSensor(lrcid, sensorId)
            .then(() => {
              this.getAllSensors();
            })
        }
      }
    );
  }

}
