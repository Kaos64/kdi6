import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import {ForgotPassword} from '../model';
import { AuthService } from '../kdi-auth.service';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./auth.scss']
})
export class ForgotPasswordComponent implements OnInit {
  f : FormGroup = null;

  data: ForgotPassword;

  constructor(protected srv: AuthService, protected fb: FormBuilder, protected router: Router) {
    this.data = new  ForgotPassword();
   }
 
  ngOnInit() {
    this.f = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
    });
  }

  public submit(){
    this.srv.forgotPassword(this.data).
      subscribe();
  }
} 

