import { Component, OnInit, ViewChild } from '@angular/core';
import { BreakpointState, BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material';
import { FormControl } from '@angular/forms';
import { SensorService } from 'src/app/services/sensor.service';
import { ModuleInfoComponent } from './module-info/module-info.component';


@Component({
  selector: 'app-module',
  templateUrl: './module.component.html',
  styleUrls: ['./module.component.css']
})
export class ModuleComponent implements OnInit {
  @ViewChild(ModuleInfoComponent) child;
  modules : String[] = [];
  modeView : String;
  sensorList: any;

  mode = this.breakpointObserver.observe(Breakpoints.Large)
  .subscribe((state: BreakpointState) => {
      if(state.matches){
        this.modeView = 'side';
      } else {
        this.modeView = 'push';
      }
    }    
  );

  constructor(private breakpointObserver: BreakpointObserver, private sensorService: SensorService) {  }

  ngOnInit() {
    this.sensorList = this.sensorService.getSensorList();
    console.log(this.sensorList);
    this.sensorList.subscribe(res => {
      let list = res;
        for (let sensor of list) {
          this.modules.push(sensor.name);
        }
      });

  }

  windowResize(){
    window.dispatchEvent(new Event('resize'));
  }

  openSensorData(sensor : string){
    this.child.getSensor(sensor);
  }

}
