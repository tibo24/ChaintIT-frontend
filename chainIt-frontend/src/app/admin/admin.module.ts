import { NgModule } from '@angular/core';
import { AdminComponent } from './admin/admin.component';
import { SharedModule } from '../shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminUserInfoComponent } from './admin/admin-user-info//admin-user-info.component'

@NgModule({
  declarations: [AdminComponent, AdminUserInfoComponent],
  imports: [
    SharedModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
