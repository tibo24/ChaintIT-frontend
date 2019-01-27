import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SensorService {

  sensorDataList;
  sensorList;
  sensor = 'sensor1'

  constructor(private http: HttpClient) { }


  getSensorDataByName(sensor: string) {
    //http://172.16.106.128:3000
    this.sensorDataList = this.http.get('http://127.0.0.1:2024/api/Sensor/' + sensor);
    return this.sensorDataList;
  }

  getSensorList() {
    this.sensorList = this.http.get('http://127.0.0.1:2024/api/Sensor');
    return this.sensorList;
  }

}
