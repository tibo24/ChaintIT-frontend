import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class SensorService {

  sensorDataList;
  sensorList = [];
  sensor = 'sensor1'

  constructor(private http: HttpClient, private snackBar: MatSnackBar) { }


  getSensorDataByName(sensor: string) {
    this.sensorDataList = this.http.get('http://172.16.106.128:8200/api/Sensor/' + sensor);
    return this.sensorDataList;
  }

  getAllSensors() {
    return new Promise((resolve, reject) => {
      this.http.get('http://localhost:8200/api/sensors').toPromise()
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      })
    })
  }

  registerUser(data: any) {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return new Promise(resolve => {
      this.http.post('http://localhost:8200/api/sensors/',
        {
          'lrcid': data.lrcid,
        }, { headers }).toPromise()
        .then(() => {
          this.openSnackbar('Sensor ' + data.lrcid + ' is aangemaakt');
          resolve();
        })
        .catch(() => {
          this.openSnackbar('Er is iets mis gegaan met het aanmaken van de sensor');
        })
    });
  }

  deleteSensor(lrcid: string, sensorId: string) {
    return new Promise(resolve => {
      this.http.delete('http://localhost:8200/api/sensors/' + sensorId).toPromise()
        .then(() => {
          this.openSnackbar('Sensor ' + lrcid + ' is verwijderd');
          resolve();
        })
        .catch(() => {
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
