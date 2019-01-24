import { NgModule } from '@angular/core';
import { ModuleComponent } from './module/module.component';
import { ModuleInfoComponent } from './module/module-info/module-info.component';
import { ModuleRoutingModule } from './module-routing.module';
import { SharedModule } from '../shared/shared.module';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@NgModule({
  declarations: [ModuleComponent, ModuleInfoComponent],
  imports: [
    SharedModule,
    ModuleRoutingModule,
    NgxChartsModule
  ]
})
export class ModuleModule { }
