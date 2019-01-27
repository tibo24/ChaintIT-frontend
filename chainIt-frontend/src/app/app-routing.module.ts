import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainDashboardComponent } from './user/main-dashboard/main-dashboard.component'
import { LoginComponent } from './login/login.component'
import { AdminSensorInfoComponent } from './admin/sensor-info/admin-sensor-info.component';
import { AdminUserInfoComponent } from './admin/user-info/admin-user-info.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SensorInfoComponent } from './user/sensor/sensor-info/sensor-info.component';
import { UserGuard } from './guards/user.guard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'main-dashboard',
    component: MainDashboardComponent,
    canActivate: [UserGuard]
  },
  {
    path: 'sensor',
    component: SensorInfoComponent,
    canActivate: [UserGuard]
  },
  {
    path: 'admin/sensors',
    component: AdminSensorInfoComponent
  },
  {
    path: 'admin/users',
    component: AdminUserInfoComponent
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
