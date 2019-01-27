import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NavbarComponent } from './navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MainDashboardComponent } from './user/main-dashboard/main-dashboard.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { LoginComponent } from './login/login.component';
import { AdminSensorInfoComponent } from './admin/sensor-info/admin-sensor-info.component';
import { AdminUserInfoComponent } from './admin/user-info/admin-user-info.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MaterialModule } from './material/material.module';
import { SensorInfoComponent } from './user/sensor/sensor-info/sensor-info.component';
import { NewUserDialogComponent } from './admin/new-user-dialog/new-user-dialog.component';
import { NewSensorDialogComponent } from './admin/new-sensor-dialog/new-sensor-dialog.component';
import { DeleteUserDialogComponent } from './admin/delete-user-dialog/delete-user-dialog.component';
import { DeleteSensorDialogComponent } from './admin/delete-sensor-dialog/delete-sensor-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MainDashboardComponent,
    LoginComponent,
    AdminSensorInfoComponent,
    AdminUserInfoComponent,
    SensorInfoComponent,
    PageNotFoundComponent,
    NewUserDialogComponent,
    NewSensorDialogComponent,
    DeleteUserDialogComponent,
    DeleteSensorDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    NgxChartsModule,
    LayoutModule,
    MaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    NewUserDialogComponent,
    NewSensorDialogComponent,
    DeleteUserDialogComponent,
    DeleteSensorDialogComponent,
  ]
})
export class AppModule { }
