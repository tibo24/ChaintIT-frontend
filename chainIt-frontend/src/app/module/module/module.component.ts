import { Component, OnInit } from '@angular/core';
import { BreakpointState, BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-module',
  templateUrl: './module.component.html',
  styleUrls: ['./module.component.css']
})
export class ModuleComponent implements OnInit {
  modules : String[] = new Array('module111', 'module112', 'module113', 'module123' );
  modeView : String;

  mode = this.breakpointObserver.observe(Breakpoints.Large)
  .subscribe((state: BreakpointState) => {
      if(state.matches){
        this.modeView = 'side';
      } else {
        this.modeView = 'push';
      }
    }    
  );

  constructor(private breakpointObserver: BreakpointObserver) {  }

  ngOnInit() {
  }

  windowResize(){
    window.dispatchEvent(new Event('resize'));
  }

}
