import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class SensorService {

  sensorDataList;
  sensorList = [];
  sensor = 'sensor1'
  loading: boolean = false;

  api: string = environment.APIEndPoint;
  readonly SENSOR_URL = this.api + 'sensor/';
  readonly SENSORS_URL = this.api + 'sensors/';

  constructor(private http: HttpClient, private snackBar: MatSnackBar, private authService: AuthService) { }

  getSensorDataByName(sensor: string) {
    this.sensorDataList = this.http.get(this.SENSOR_URL + sensor);
    return this.sensorDataList;
  }

  getAllSensors() {
    const currentUser = this.authService.currentUserValue;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + currentUser.token
    });

    return new Promise((resolve, reject) => {
      this.loading = true;
      this.http.get(this.SENSORS_URL, { headers }).toPromise()
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

  createSensor(data: any) {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return new Promise(resolve => {
      this.loading = true;
      this.http.post(this.SENSORS_URL,
        {
          'lrcid': data.lrcid,
        }, { headers }).toPromise()
        .then(() => {
          this.loading = false;
          this.openSnackbar('Sensor ' + data.lrcid + ' is aangemaakt');
          resolve();
        })
        .catch(() => {
          this.loading = false;
          this.openSnackbar('Er is iets mis gegaan met het aanmaken van de sensor');
        })
    });
  }

  deleteSensor(lrcid: string, sensorId: string) {
    const currentUser = this.authService.currentUserValue;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + currentUser.token
    });

    return new Promise(resolve => {
      this.loading = true;
      this.http.delete(this.SENSORS_URL + sensorId).toPromise()
        .then(() => {
          this.loading = false;
          this.openSnackbar('Sensor ' + lrcid + ' is verwijderd');
          resolve();
        })
        .catch(() => {
          this.loading = false;
          this.openSnackbar('Er is iets mis gegaan met het verwijderen van de sensor')
        })
    })
  }

  openSnackbar(message: string) {
    this.snackBar.open(message, 'Ok', {
      duration: 3000,
    });
  }

}
