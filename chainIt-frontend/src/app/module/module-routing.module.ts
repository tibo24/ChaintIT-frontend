import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModuleComponent } from './module/module.component';

const moduleRoutes: Routes = [
  { path: '', component: ModuleComponent }
];


@NgModule({
  imports: [RouterModule.forChild(moduleRoutes)],
  exports: [RouterModule]
})
export class ModuleRoutingModule { }