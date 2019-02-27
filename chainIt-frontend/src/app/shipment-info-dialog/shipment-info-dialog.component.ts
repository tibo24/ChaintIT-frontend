import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { RemoveResourcePipe } from '../shared/remove-resource.pipe';

@Component({
  selector: 'app-shipment-info-dialog',
  templateUrl: './shipment-info-dialog.component.html',
  styleUrls: ['./shipment-info-dialog.component.css']
})
export class ShipmentInfoDialogComponent implements OnInit {

  responsibleUsers: [] = [];
  sender: string;
  shipper: string;
  receiver: string;
  test: string = "disabled";
  buttonModel;
  responsibleUser: string;
  count: number;
  shipmentId: string;
  status: string;

  checkedSender: boolean;
  checkedShipper: boolean;
  checkedReceiver: boolean;

  disabledSender: boolean;
  disabledShipper: boolean;
  disabledReceiver: boolean;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ShipmentInfoDialogComponent>,
    private snackBar: MatSnackBar,
    private removeResourcePipe: RemoveResourcePipe,
    @Inject(MAT_DIALOG_DATA) data) {
    this.shipmentId = data.shipmentId;
    this.responsibleUsers = data.responsibleUsers;
    this.sender = data.sender;
    this.shipper = data.shipper;
    this.receiver = data.receiver;
  }

  ngOnInit() {
    this.count = this.responsibleUsers.length;
    this.responsibleUser = this.responsibleUsers[this.count - 1];
    this.setResponsibleUser();
  }

  setResponsibleUser() {
    const resUser = this.removeResourcePipe.transform(this.responsibleUser);
    if (resUser === this.removeResourcePipe.transform(this.sender)) { this.setSenderAsResponsibleUser() };
    if (resUser === this.removeResourcePipe.transform(this.shipper)) { this.setShipperAsResponsibleUser() };
    if (resUser === this.removeResourcePipe.transform(this.receiver)) { this.setReceiverAsResponsibleUser() };
  }

  setSenderAsResponsibleUser() {
    this.checkedSender = true;
    this.disabledSender = true;
    this.responsibleUser = this.sender;
  }

  setShipperAsResponsibleUser() {
    this.checkedShipper = true;
    this.checkedSender = false;
    this.disabledSender = true;
    this.disabledShipper = true;
    this.responsibleUser = this.shipper;
    this.status = 'IN_TRANSIT';
  }

  setReceiverAsResponsibleUser() {
    this.checkedShipper = false;
    this.checkedReceiver = true;
    this.disabledReceiver = true;
    this.disabledSender = true;
    this.disabledShipper = true;
    this.responsibleUser = this.receiver;
    this.status = 'ARRIVED';
  }

  submit() {
    const data = {
      shipmentId: this.shipmentId,
      status: this.status,
      responsibleUser: this.responsibleUser,
    }
    if (data.shipmentId, data.responsibleUser, data.status) {
      this.dialogRef.close(data);
    }
  }

  close() {
    this.dialogRef.close();
  }

}
