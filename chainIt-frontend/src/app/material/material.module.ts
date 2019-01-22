import { NgModule } from '@angular/core';
import {MatInputModule, MatButtonModule, MatSidenavModule, MatIconModule, MatGridListModule,
   MatCardModule, MatMenuModule, MatDatepickerModule, MatNativeDateModule, MatListModule, MatToolbarModule} from '@angular/material';

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
    MatToolbarModule
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
    MatToolbarModule
  ], providers: [  
    MatDatepickerModule,  
  ]
})
export class MaterialModule { }
