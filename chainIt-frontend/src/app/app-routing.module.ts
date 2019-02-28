import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainDashboardComponent } from './user/main-dashboard/main-dashboard.component'
import { LoginComponent } from './login/login.component'
import { AdminSensorInfoComponent } from './admin/sensor-info/admin-sensor-info.component';
import { AdminUserInfoComponent } from './admin/user-info/admin-user-info.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ShipmentInfoComponent } from './user/shipment/shipment-info/shipment-info.component';
import { UserGuard } from './guards/user.guard';
import { Role } from './models/role';
import { AdminShipmentInfoComponent } from './admin/shipment-info/admin-shipment-info.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'main-dashboard',
    component: MainDashboardComponent,
    canActivate: [UserGuard],
    data: { roles: [Role.User] }
  },
  {
    path: 'shipment/:shipment',
    component: ShipmentInfoComponent
  },
  {
    path: 'admin/sensors',
    component: AdminSensorInfoComponent,
    canActivate: [UserGuard],
    data: { roles: [Role.Admin] }
  },
  {
    path: 'admin/users',
    component: AdminUserInfoComponent,
    canActivate: [UserGuard],
    data: { roles: [Role.Admin] }
  },
  {
    path: 'admin/shipments',
    component: AdminShipmentInfoComponent,
    canActivate: [UserGuard],
    data: { roles: [Role.Admin] }
  },
  {
    path: '**',
    component: PageNotFoundComponent
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
