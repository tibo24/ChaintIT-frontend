import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainDashboardComponent } from './user/main-dashboard/main-dashboard.component'
import { LoginComponent } from './login/login.component'
import { SensorInfoComponent } from './admin/sensor-info/sensor-info.component';
import { UserInfoComponent } from './admin/user-info/user-info.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: 'main-dashboard',
    component: MainDashboardComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'admin/sensors',
    component: SensorInfoComponent
  },
  {
    path: 'admin/users',
    component: UserInfoComponent
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
