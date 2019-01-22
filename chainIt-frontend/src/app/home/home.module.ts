import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ModuleComponent } from './home/module/module.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@NgModule({
  declarations: [HomeComponent, ModuleComponent],
  imports: [
    SharedModule,
    HomeRoutingModule,
    NgxChartsModule
  ]
})
export class HomeModule {}
