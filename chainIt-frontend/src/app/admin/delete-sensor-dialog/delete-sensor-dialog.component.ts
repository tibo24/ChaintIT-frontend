import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-delete-sensor-dialog',
  templateUrl: './delete-sensor-dialog.component.html',
  styleUrls: ['./delete-sensor-dialog.component.css']
})
export class DeleteSensorDialogComponent implements OnInit {

  title: string;

  constructor(
    private dialogRef: MatDialogRef<DeleteSensorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
      this.title = data.title;
    }

  ngOnInit() {
  }

  deleteSensor(lrcid: string, sensorId: string) {
    this.dialogRef.close({lrcid, sensorId});
  }

  close() {
    this.dialogRef.close();
  }

}
