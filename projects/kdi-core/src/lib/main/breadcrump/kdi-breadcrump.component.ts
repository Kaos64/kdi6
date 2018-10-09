import { Component, OnInit } from '@angular/core';
import { Router, Event as EventRouter, NavigationEnd, ActivatedRoute, ActivatedRouteSnapshot, UrlSegment, Params } from '@angular/router';

import {filter } from 'rxjs/operators'

@Component({
  selector: 'kdi-breadcrump',
  templateUrl: './kdi-breadcrump.component.html',
  styleUrls: ['Kdi-breadcrump.scss']
})
export class KdiBreadcrumpComponent implements OnInit {

  breadcrumps: KdiBreadCrump[] = [];
  title: string = null;

  constructor(protected route: ActivatedRoute, protected router: Router) {

    this.router.events.pipe(
      filter(evt => 
        evt instanceof NavigationEnd )
    ).subscribe((evt: EventRouter) => {
      console.error("Event breadcrump", evt);
      this.title = this.extractTitle(this.route.snapshot);
      this.breadcrumps = this.extractBreadcrump(this.route.snapshot);
    });
   }

  ngOnInit() {
  }

  protected extractTitle(rt: ActivatedRouteSnapshot): string{
    let bc: KdiBreadCrump = rt.data['breadcrump'];
    return bc && bc.title ? bc.title : '';
  }

  protected extractBreadcrump(rt: ActivatedRouteSnapshot): KdiBreadCrump[]{
    console.log("extractBreadCrump");
    console.warn(rt);
    let bc: KdiBreadCrump = rt.data['breadcrump'];
    console.warn(bc);
    let ret: KdiBreadCrump[] = [];
    if(rt.parent){
      ret = this.extractBreadcrump(rt.parent);
    }
    if(bc && bc.skip !== true){
      bc.route = rt;
      //console.log (`Url [${bc.route}]`);
      ret.push(bc);
    }

    return ret;
  }
  resolveUrl(bc:KdiBreadCrump): string[]{
    let nav: string[] = ['/'];
    for(let i = 0 ; i < bc.route.url.length; i++){
      nav.push(bc.route.url[i].path)
    }
    return nav;
  }

  resolveData(bc: KdiBreadCrump): string{
    return "Resolved data";
  }

}




export class KdiBreadCrump {
  skip?: boolean;
  icon?: string;
  label?: string;
  title?: string;
  resolve?: {
    name: string;
    value: string;
  }
  route?: ActivatedRouteSnapshot;
}
