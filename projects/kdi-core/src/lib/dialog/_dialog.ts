import { Injectable, Component, OnInit, Inject, ContentChild, QueryList, ViewChild, Type, ViewContainerRef, Directive, ComponentFactoryResolver } from '@angular/core';

@Directive({ selector: '[component-host]' })
export class ComponentHostDirective {
    constructor(public viewContainerReg: ViewContainerRef) { }
}

export class KdiDialogComponent{
    constructor(public component: Type<any>, public data: any){
    }
}

