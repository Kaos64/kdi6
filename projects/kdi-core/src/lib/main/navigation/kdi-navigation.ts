import { Injectable, EventEmitter } from '@angular/core';

import { Observer, Observable, BehaviorSubject, Subject, empty } from 'rxjs';

import { KdiBadge, KdiNavigation } from './model';

@Injectable({
  providedIn: 'root'
})
export class KdiNavigationService {

  constructor(){
    setInterval(()=>{
      this.badge1.next(`${Math.round(Math.random() * 10)}`);
      this.badge2.next(`${Math.round(Math.random() * 100)}`);
      this.badge3.next(`${Math.round(Math.random() * 60)}`);
    }, 2000);

    setTimeout(()=>{ this.pushNavigation({label: 'Pushed', type: 'separator'})}, 5000);
  }

  public navigationObserver(): Observable<KdiNavigation[]>{
      return this._navigationObserver;
  }

  public pushNavigation(nav: KdiNavigation, container?: string){
      this.navs.push(nav);
      this._navigationObserver.next(this.navs);
  }

  
  public getBadgeObserver(name: string): Observable<KdiBadge>{
    return empty();
  }

  public observeBadge(name: string): Observable<string>{

    switch(name){
      case 'badge1':
        return this.badge1;
      case 'badge2':
        return this.badge2;
        case 'badge3':
        return this.badge3;
    }

    return empty();
    
    
  }

  private navs: KdiNavigation[] = [
    {label: 'Applications', type: 'separator'},
    {icon: 'home', label: 'Dashboard', type: 'item' , url: '/lorem'},
    {icon: 'accessibility', label: 'Designers', type: 'container', state: 'collapsed', children: [
      {icon: 'phone_iphone', label: 'List', type: 'item', url: '/lorem', badge1: {
          name: 'badge1',
          color: 'tomato'
      }},
      {icon: 'phone_android', label: 'Create', type: 'item', url: '/lorem'},
    ]
    },
    {icon: '', label: 'Contacts', type: 'container', state: 'expanded', children: [
      {icon: '', label: 'List', type: 'item', url: '/dashboard/1'},
      {icon: '', label: 'Page', type: 'item', url: '/dashboard/0', badge1: {
        name: 'badge2',
        color: 'coral'
    }, badge2: {
      name: 'badge3',
      color: 'rgba(145,25,136, 1)'
  }},
    ]
    },
    {icon: 'build', label: 'Crud', type: 'item', url: '/crud'},
    {icon: 'settings', label: 'Parameters', type: 'item', url: '/parameter',badge2: {
      name: 'badge3',
      color: 'lightgreen'
  }},
  ];

  private _navigationObserver =  new BehaviorSubject<KdiNavigation[]>(this.navs);

  badge1: Subject<string> = new Subject();
  badge2: Subject<string> = new Subject();
  badge3: Subject<string> = new Subject();
  
}