import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class ShipmentService {

  shipmentDataList;
  shipmentList;

  constructor(private http: HttpClient, private snackBar: MatSnackBar) { }

  getShipmentInformationWithReadings(shipmentId: string) {
    return new Promise((resolve, reject) => {
      this.http.get('http://localhost:8200/shipments/api/' + shipmentId + '/readings').toPromise()
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        })
    })
  }

  getShipmentInformation(shipmentId: string) {
    return new Promise((resolve, reject) => {
      this.http.get('http://localhost:8200/shipments/' + shipmentId).toPromise()
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        })
    })
  }

  getAllShipments() {
    this.shipmentList = this.http.get('http://localhost:8200/shipments');
    return this.shipmentList;
  }

  newShipment(data: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const resource = 'resource:org.chainit.network.';

    return new Promise(resolve => {
      this.http.post('http://localhost:8200/shipments',
        {
          'sensor': data.selectedSensor,
          'productName': data.product,
          'unitCount': data.unitCount,
          'minTemp': data.minTemp,
          'maxTemp': data.maxTemp,
          'sender': resource + 'Sender#' + data.selectedSender,
          'shipper': resource + 'Shipper#' + data.selectedShipper,
          'receiver': resource + 'Receiver#' + data.selectedReceiver,
        }, { headers }).toPromise()
        .then(() => {
          this.openSnackbar('De shipment is aangemaakt');
          resolve();
        })
        .catch(() => {
          this.openSnackbar('Er is iets mis gegaan met het aanmaken van de shipment');
        })
    });
  }

  updateShipment(data: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return new Promise(resolve => {
      this.http.post('http://localhost:8200/shipments/api/update',
        {
          'status': data.status,
          'participant': data.responsibleUser,
          'shipment': data.shipmentId,
        }, { headers }).toPromise()
        .then((res) => {
          resolve(res);
        })
        .catch(() => {
          this.openSnackbar('Er is iets mis gegaan met het updaten van de shipment');
        })
    });
  }

  openSnackbar(message: string) {
    this.snackBar.open(message, 'Ok', {
      duration: 3000,
    });
  }

}
