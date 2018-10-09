import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { KdiTokenProvider } from './kdi-token-provider';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivateChild, CanActivate  {

  constructor(protected token: KdiTokenProvider, protected router: Router) { }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    return this._isLogged(state.url);
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this._isLogged(state.url);
  }

  _isLogged(returnUrl: string): boolean{
    if (!this.token.isLogged()) {
      this.router.navigate(['/auth'], {queryParams: {returnUrl: returnUrl}});
      return false;
    }

    return true;

  }
}

