import { NgModule } from '@angular/core';
import {MatInputModule, MatButtonModule, MatSidenavModule, MatIconModule, MatGridListModule,
   MatCardModule, MatMenuModule, MatDatepickerModule, MatNativeDateModule, MatListModule, MatToolbarModule, MatProgressSpinnerModule, 
   MatSnackBarModule, 
   MatTableModule} from '@angular/material';

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
    MatSnackBarModule,
    MatTableModule
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
    MatSnackBarModule,
    MatTableModule 
  ], providers: [  
    MatDatepickerModule,  
  ]
})
export class MaterialModule { }
