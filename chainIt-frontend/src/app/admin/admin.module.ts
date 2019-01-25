import { NgModule } from '@angular/core';
import { AdminComponent } from './admin/admin.component';
import { SharedModule } from '../shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminUserInfoComponent } from './admin/admin-user-info/admin-user-info.component'
import { NewUserDialogComponent } from './admin/new-user-dialog/new-user-dialog.component';
import { DeleteUserDialogComponent } from './admin/delete-user-dialog/delete-user-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatPaginatorModule } from '@angular/material';

@NgModule({
  declarations: [AdminComponent, AdminUserInfoComponent, NewUserDialogComponent, DeleteUserDialogComponent],
  imports: [
    SharedModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatPaginatorModule,
  ],
  entryComponents: [NewUserDialogComponent, DeleteUserDialogComponent]
})
export class AdminModule { }
