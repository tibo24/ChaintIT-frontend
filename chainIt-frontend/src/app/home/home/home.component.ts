import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BreakpointObserver, BreakpointState, Breakpoints } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
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

}
