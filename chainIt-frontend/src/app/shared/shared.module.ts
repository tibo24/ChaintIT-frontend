import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { LayoutModule } from '@angular/cdk/layout';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MaterialModule,
    LayoutModule
  ], exports: [
    CommonModule,
    MaterialModule,
    LayoutModule
  ]
})
export class SharedModule { }
