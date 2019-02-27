import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import { resolve } from 'q';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ShipmentService {

  shipmentDataList;
  shipmentList;
  loading: boolean = false;

  api: string = environment.APIEndPoint;
  readonly SHIPMENTS_API_URL = this.api + 'shipments/api/';
  readonly SHIPMENTS_UPDATE_API_URL = this.api + 'shipments/api/update/';
  readonly SHIPMENTS_URL = this.api + 'shipments/';

  constructor(private http: HttpClient, private snackBar: MatSnackBar, private authService: AuthService) { }

  getShipmentInformationWithReadings(shipmentId: string) {
    return new Promise((resolve, reject) => {
      this.loading = true;
      this.http.get(this.SHIPMENTS_API_URL + shipmentId + '/readings').toPromise()
        .then((res) => {
          this.loading = false;
          resolve(res);
        })
        .catch((err) => {
          this.loading = false;
          reject(err);
        })
    })
  }

  getShipmentInformation(shipmentId: string) {
    return new Promise((resolve, reject) => {
      this.loading = true;
      this.http.get(this.SHIPMENTS_URL + shipmentId).toPromise()
        .then((res) => {
          this.loading = false;
          resolve(res);
        })
        .catch((err) => {
          this.loading = false;
          reject(err);
        })
    })
  }

  getAllShipments() {
    return new Promise((resolve, reject) => {
      this.loading = true;
      this.http.get(this.SHIPMENTS_URL).toPromise()
      .then((res) => {
        this.loading = false;
        resolve(res);
      })
      .catch((err) => {
        this.loading = false;
        reject(err);
      })
    })
  }

  newShipment(data: any) {
    const currentUser = this.authService.currentUserValue;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + currentUser.token
    });

    const resource = 'resource:org.chainit.network.';

    return new Promise(resolve => {
      this.loading = true;
      this.http.post(this.SHIPMENTS_URL,
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
          this.loading = false;
          this.openSnackbar('De shipment is aangemaakt');
          resolve();
        })
        .catch(() => {
          this.loading = false;
          this.openSnackbar('Er is iets mis gegaan met het aanmaken van de shipment');
        })
    });
  }

  updateShipment(data: any) {
    const currentUser = this.authService.currentUserValue;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + currentUser.token
    });

    return new Promise(resolve => {
      this.loading = true;
      this.http.post(this.SHIPMENTS_UPDATE_API_URL,
        {
          'status': data.status,
          'participant': data.responsibleUser,
          'shipment': data.shipmentId,
        }, { headers }).toPromise()
        .then((res) => {
          this.loading = false;
          resolve(res);
        })
        .catch(() => {
          this.loading = false;
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
