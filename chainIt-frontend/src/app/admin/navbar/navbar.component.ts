import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
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
  constructor(private breakpointObserver: BreakpointObserver) {}

  windowResize(){
    window.dispatchEvent(new Event('resize'));
  }

}
