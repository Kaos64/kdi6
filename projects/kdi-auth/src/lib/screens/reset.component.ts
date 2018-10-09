import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import {Reset} from '../model';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./auth.scss']
})
export class ResetComponent implements OnInit {
  f : FormGroup = null;

  data: Reset;

  constructor(protected fb: FormBuilder, protected router: Router) {
    this.data = new  Reset();
   }

  ngOnInit() {
    this.f = this.fb.group({
      email: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required])],
      confirm: ['', Validators.compose([Validators.required])]
    });
    
  }

  public submit(){
    
  }
}


