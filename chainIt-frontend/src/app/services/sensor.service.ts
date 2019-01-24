import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SensorService {

  sensorDataList;
  sensor = 'sensor1'

  constructor(private http: HttpClient) { }


  getSensorDataByName(sensor: string) {
    this.sensorDataList = this.http.get('http://172.16.106.128:3000/api/Sensor/' + sensor);
    return this.sensorDataList;
  }

}
