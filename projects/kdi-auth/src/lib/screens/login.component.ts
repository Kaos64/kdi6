import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import {Login} from '../model';
import { AuthService } from '../kdi-auth.service';
import { KdiTokenProvider } from '../kdi-token-provider';
import { Auth } from '../model';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./auth.scss']
})
export class LoginComponent implements OnInit {
  f : FormGroup = null;

  data: Login; 

  constructor(protected srv: AuthService, protected token: KdiTokenProvider, protected fb: FormBuilder, protected router: Router, protected route: ActivatedRoute) {
    this.data = new  Login();
   }

  ngOnInit() {
    this.f = this.fb.group({
      username: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required])],
      remember: ['']
    });
  }

  public submit(){
    this.srv.login(this.data).subscribe(
      (auth: Auth)=>{
        this.token.setAuth(auth); 
        let params = this.route.snapshot.queryParams;
        console.log(`After login [${params.returnUrl}]`);
        if(params.returnUrl){
          this.router.navigate([params.returnUrl]);
        }else{
          this.router.navigate(['']);
        }
      }
    )
  }
}
