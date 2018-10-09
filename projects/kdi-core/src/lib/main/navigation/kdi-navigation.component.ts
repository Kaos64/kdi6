import { Component, OnInit, Injectable, Input, Renderer2, ElementRef, Output, EventEmitter } from '@angular/core';
import {trigger, state,  animate, transition, style} from '@angular/animations';

import { Observer, Observable, Subject, empty } from 'rxjs';
import { KdiNavigationService } from './kdi-navigation';
import { KdiNavigation } from './model';


@Component({
  selector: 'kdi-navigation',
  templateUrl: './kdi-navigation.component.html',
  styleUrls: ['./kdi-navigation.component.scss'],
  animations: [
    trigger('bodyExpansion', [
      state('collapsed', style({height: '0px', opacity: 0, visibility: 'hidden'})),
      state('expanded', style({height: '*', opacity: 1, visibility: 'visible'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4,0.0,0.2,1)')),
    ]),
  ],
})
export class KdiNavigationComponent implements OnInit {

  constructor(protected srv: KdiNavigationService, protected elt: ElementRef,protected  render: Renderer2) { }

  public navs:KdiNavigation[] = null;
  

  ngOnInit() {
     this.srv.navigationObserver().subscribe((navs: KdiNavigation[]) => this.navs = navs);
  }

  _getContainerState(index: number): string{
    if(!this.navs[index].state){
      this.navs[index].state =  'collapsed';
    }
    return this.navs[index].state;
  }

  toggleState(index){
    let item = this.navs[index];
    if(item.state == 'collapsed'){
      item.state = 'expanded';
    }else{
      item.state = 'collapsed';
    }
  }
} 

@Component({
  selector: 'kdi-navigation-item',
  templateUrl: './kdi-navigation-item.component.html',
  styleUrls: ['./kdi-navigation.component.scss'],
  animations: [
    trigger(
      'toggleState', [
        state('collasped', style({
          transform: 'rotate(0deg)'
        })),
        state('expanded', style({
          transform: 'rotate(90deg)'
        })),
        transition('collapsed => expanded', [
          animate('250ms', style({transform: 'rotate(90deg)'}))]),
        transition('expanded => collapsed', [
          animate('250ms', style({transform: 'rotate(0deg)'}))])
      ]
    )
  ],
})
export class KdiNavigationItemComponent implements OnInit{
  @Input() item: KdiNavigation;
  @Output() toggle: EventEmitter<any> = new EventEmitter<any>();
  
  constructor(protected srv: KdiNavigationService){}


  ngOnInit(): void {
    if(this.item.badge1){
      this.srv.observeBadge(this.item.badge1.name)
      .subscribe((content:string) => {
        this.item.badge1.content = content;
      });
    }
    
    if(this.item.badge2){
      this.srv.observeBadge(this.item.badge2.name)
      .subscribe((content:string) => {
        this.item.badge2.content = content;
      });
    }
  }

  itemClick(evt){
    switch(this.item.type){
      case 'item': 
        console.log(`Item click ${this.item.label}`);
      break; 
    }
  }

  showStateIndicator(state: string): boolean{
    return (this.item.type == 'container' && this.item.state == state);
  }
}
 



