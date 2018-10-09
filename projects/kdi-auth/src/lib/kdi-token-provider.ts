import { Injectable } from '@angular/core';

import {LocalStorageService} from 'ngx-webstorage';

import {Auth, User} from './model';
import { throws } from 'assert';

const AUTH_KEY: string = 'auth';

@Injectable({
  providedIn: 'root'
})
export class KdiTokenProvider { 
  constructor(protected storage: LocalStorageService) { }

  /**
   * Store login informations 
   * @param auth Login to store
   */
  public setAuth(auth: Auth){
    this.storage.store(AUTH_KEY, auth);
  }

  /*
   * Logout user 
   */
  public logout(){
    this.storage.clear(AUTH_KEY);
  }

  /**
   * @return true: If user is logged, false also
   */
  public isLogged(): boolean{
    return this.getToken() ? true : false;
  }

  public getToken(): string{
    let auth : Auth = this._auth();
    return auth && auth.token ? auth.token : null;
  }

  public getUser(): User{
    return this._auth().user;
  }

  /**
   * Check if connected user roles has good.
   * 
   * @param allow List of roles that can do this
   * @param disallow List of roles that can't do this
   * @returns true if user can do false also
   */
  public canDo(allow: string[]= [], disallow: string[] = []): boolean{
    // si les deux sont vide => authoriser par défaut
    if(allow.length == 0 && disallow.length == 0){
      console.log("No Roles set");
      return true;
    }
        
    let isAllow = this._checkRoles(allow);
    let isDisallow = this._checkRoles(disallow);
    
    if( isAllow == true &&  isDisallow == true ){
        throw new Error(`canDo : Ambigus roles configuration allow[${JSON.stringify(allow) }] disallow[${JSON.stringify(disallow) }] `)// allow and disallow => throw exception
    } 

    if (isDisallow == false ){
      console.log(`canDo => Disallow : It's not fordiben : allow[${JSON.stringify(allow) }] disallow[${JSON.stringify(disallow) }]  `);
    } // it's not forbiden
    if (isDisallow == true ) {// you can't do{
      console.log(`canDo => Disallow : You can't do : allow[${JSON.stringify(allow) }] disallow[${JSON.stringify(disallow) }]  `);
    }

    if (isAllow == true) {// you can do
      console.log(`canDo => Allow : You can do : allow[${JSON.stringify(allow) }] disallow[${JSON.stringify(disallow) }]  `);
    }
    
    if (isAllow == false ){
      console.log(`canDo => Allow : You can't do : allow[${JSON.stringify(allow) }] disallow[${JSON.stringify(disallow) }]  `);
    } // it's not allow


    // it's forbiden 
    if(isDisallow || isAllow == false) {
      return false;
    }

    // you can do
    return true;
  }

  
  /**
   * Return true if roles contain roles use by connected user;
   * @param allow if true check if roles is Allow, if false check if roles is disallow
   */
  private _checkRoles(roles: string[] | null):boolean{
    let userRoles = this.getRoles();
    console.error(userRoles);
    if(roles ){
      for(let i: number = 0 ; i < roles.length; i++){
        if(userRoles.includes(roles[i])){
          console.log(`Role checked : ${roles[i]}`);
          return true;
        }
      }
    }
    return false;
  }

  private getRoles(): string[]{
    return this.getUser()!.roles;

  }

  protected _auth(){
    let auth: Auth = this.storage.retrieve(AUTH_KEY);
    return auth;
  }

}
