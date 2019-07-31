import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SimpleFormComponent } from './simple-form/simple-form.component';
import { ComplexQueryComponent } from './complex-query/complex-query.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'simple-form',
    pathMatch: 'full'
  },
  {
    path: 'simple-form',
    component: SimpleFormComponent
  },
  {
    path: 'complex-query',
    component: ComplexQueryComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
