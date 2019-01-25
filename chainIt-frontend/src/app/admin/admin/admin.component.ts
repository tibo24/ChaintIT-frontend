import { Component, OnInit } from '@angular/core';
import { BreakpointState, BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
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
