import { Component, OnInit } from '@angular/core';
import { BreakpointState, BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
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
