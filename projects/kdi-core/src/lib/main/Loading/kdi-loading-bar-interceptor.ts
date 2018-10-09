import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpResponse, HttpErrorResponse,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';

import { Observable, throwError} from 'rxjs';
import {tap, finalize, catchError} from 'rxjs/operators';

import { KdiLoadingBarService } from './kdi-loading-bar.service';
import { KdiLoadingOverlayService } from './kdi-loading-overlay.service';


@Injectable({
  providedIn: 'root'
})
export class KdiLoadingBarInterceptor implements HttpInterceptor {

  constructor(protected srv: KdiLoadingBarService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.srv.start("indeterminate");
    console.log("LoadingBar interceptor");
    return next.handle(request).pipe(
      tap((event: HttpEvent<HttpResponse<any>>) => {
        if(event instanceof HttpResponse){
            this.srv.complete();
        }}),
        catchError((error: HttpErrorResponse) => {
          this.srv.complete();      
          return Observable.throw(error);
      } )
    );
  }
}



@Injectable({
  providedIn: 'root'
})
export class RestFullUpdateInterceptor implements HttpInterceptor {

  constructor(protected srv: KdiLoadingOverlayService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log("Do nothing interceptor");
    console.log(`Méthod ${request.method}`);
    const method: string[] = ['PUT', 'POST', 'DELETE'];
    let remote = null;
    if(method.includes(request.method)){
      remote = this.srv.open();
    }
    
    return next.handle(request).pipe(finalize(()=> {
      if(remote){
        setTimeout(()=>remote.close(), 1000);
      }
    }));
  }      
}