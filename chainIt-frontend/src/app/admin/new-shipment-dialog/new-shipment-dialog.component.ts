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
      product: [this.product, [Validators.required]],
      minTemp: [this.minTemp, [Validators.required]],
      maxTemp: [this.maxTemp, [Validators.required]],
      unitCount: [this.unitCount, [Validators.required]],
      selectedSensor: [this.selectedSensor, [Validators.required]],
      selectedSender: [this.selectedSender, [Validators.required]],
      selectedShipper: [this.selectedShipper, [Validators.required]],
      selectedReceiver: [this.selectedReceiver, [Validators.required]],
    });
  }

  submit() {
    var valid = this.form.validator;
    if (true) {
      console.log(this.form.value);
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
