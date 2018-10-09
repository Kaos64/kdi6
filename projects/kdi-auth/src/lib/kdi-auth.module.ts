import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClientModule} from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {FlexLayoutModule} from '@angular/flex-layout';
import {PerfectScrollbarModule} from 'ngx-perfect-scrollbar'

import {KdiCoreModule, KdiMaterialModule} from 'dist/kdi-core/kdi-core';


import { KdiAuthComponent } from './kdi-auth.component';
import { KdiAuthRoutingModule } from './auth-routing.module';
import { LoginComponent, LogoutComponent, ResetComponent, RegisterComponent,  ForgotPasswordComponent } from './screens';



@NgModule({
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    HttpClientModule,
    FlexLayoutModule,
    PerfectScrollbarModule,

    KdiCoreModule, KdiMaterialModule,

    KdiAuthRoutingModule
  ],
  declarations: [KdiAuthComponent, LoginComponent, LogoutComponent, ResetComponent, RegisterComponent, ForgotPasswordComponent],
  exports: [KdiAuthComponent]
})
export class KdiAuthModule { }
