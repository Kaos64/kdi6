import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import {Register} from '../model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./auth.scss']
})
export class RegisterComponent implements OnInit {
  f : FormGroup = null;

  data: Register;

  constructor(protected fb: FormBuilder, protected router: Router) {
    this.data = new  Register();
   }

  ngOnInit() {
    this.f = this.fb.group({
      email: ['', Validators.compose([Validators.required])],
      username: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required])],
      confirm: ['', Validators.compose([Validators.required])]

    });
    
  }

  public submit(){
    
  }

}
