import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComplexQueryComponent } from './complex-query/complex-query.component';
import { SimpleFormComponent } from './simple-form/simple-form.component';
import { ApplyCancelDirective } from './apply-cancel.directive';

@NgModule({
  declarations: [
    AppComponent,
    ComplexQueryComponent,
    SimpleFormComponent,
    ApplyCancelDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularMultiSelectModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
