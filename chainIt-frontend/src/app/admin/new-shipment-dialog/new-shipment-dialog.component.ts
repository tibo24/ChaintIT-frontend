import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { NewUserDialogComponent } from '../new-user-dialog/new-user-dialog.component';
import { SensorService } from 'src/app/services/sensor.service';

@Component({
  selector: 'app-new-shipment-dialog',
  templateUrl: './new-shipment-dialog.component.html',
  styleUrls: ['./new-shipment-dialog.component.css']
})
export class NewShipmentDialogComponent implements OnInit {

  form: FormGroup;
  product: string;
  minTemp: string;
  maxTemp: string;
  sensor: string;
  unitCount: number;
  senders: any[] = [];
  shippers: any[] = [];
  receivers: any[] = [];
  selectedSensor: string;
  selectedSender: string;
  selectedShipper: string;
  selectedReceiver: string;
  sensors: any[] = [];

  constructor(    
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<NewUserDialogComponent>,
    private snackBar: MatSnackBar,
    private sensorService: SensorService,
    @Inject(MAT_DIALOG_DATA) data) { 
      this.product = data.product;
      this.minTemp = data.minTemp;
      this.maxTemp = data.maxTemp;
      this.unitCount = data.unitCount;
      this.sensors = data.sensors;
      this.senders = data.senders;
      this.shippers = data.shippers;
      this.receivers = data.receivers;
    }

  ngOnInit() {
    this.form = this.fb.group({
      product: [this.product],
      minTemp: [this.minTemp],
      maxTemp: [this.maxTemp],
      unitCount: [this.unitCount],
      selectedSensor: [this.selectedSensor],
      selectedSender: [this.selectedSender],
      selectedShipper: [this.selectedShipper],
      selectedReceiver: [this.selectedReceiver],
    });
  }

  submit() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    } else {
      this.openSnackbar('Gelieven alles in te vullen aub')
    }
  }

  close() {
    this.dialogRef.close();
  }

  openSnackbar(message: string) {
    this.snackBar.open(message, 'Ok', {
      duration: 3000,
    });
  }

}
