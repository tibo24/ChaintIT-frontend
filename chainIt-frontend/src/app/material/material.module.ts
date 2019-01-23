import { NgModule } from '@angular/core';
import {MatInputModule, MatButtonModule, MatSidenavModule, MatIconModule, MatGridListModule,
   MatCardModule, MatMenuModule, MatDatepickerModule, MatNativeDateModule, MatListModule, MatToolbarModule, MatProgressSpinnerModule, 
   MatSnackBarModule } from '@angular/material';

@NgModule({
  declarations: [],
  imports: [
    MatInputModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatListModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    MatSnackBarModule 
  ], exports: [
    MatInputModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatListModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    MatSnackBarModule 
  ], providers: [  
    MatDatepickerModule,  
  ]
})
export class MaterialModule { }
