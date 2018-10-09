import { Component, ViewChild, OnInit, OnDestroy, AfterViewInit } from '@angular/core';

import { BreakpointObserver, Breakpoints, BreakpointState  } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material';


import { PerfectScrollbarComponent } from 'ngx-perfect-scrollbar/dist/lib/perfect-scrollbar.component';
import { Position } from 'ngx-perfect-scrollbar/dist/lib/perfect-scrollbar.interfaces';

import { Observable, Subscription } from 'rxjs';

import { KdiAppService } from '../core/app/app-setting';
import {KdiAppSetting, KdiMainSetting} from '../core/model'
  
@Component({
  selector: 'kdi-main',
  templateUrl: './kdi-main.component.html',
  styleUrls: ['./kdi-main.component.scss']
})
export class KdiMainComponent implements OnInit, OnDestroy, AfterViewInit {
  
  
  @ViewChild("ps") ps : PerfectScrollbarComponent;
  kdiShowScrollTop: boolean = false;


  @ViewChild("snApp") kdiSnApp: MatSidenav; 
  @ViewChild("snSummary") kdiSnSummary: MatSidenav;

  constructor(protected settingSrv: KdiAppService, protected bo: BreakpointObserver) { 
  }
  

  ngOnInit() {
    this._initConfig();
    this._mediaBreakPoint();
  }

  ngAfterViewInit(): void {
    this._sidenavObserver();
  }

 
  scroll($event){
    let position = this.ps.directiveRef.position(true);
    this.settingSrv.contentScrollChange($event.target);
    this._showScrollTop(position.y);
  }

  private _showScrollTop(ypos: number | string): void{
    if(!this.kdiShowScrollTop && ypos > 100) {
      this.kdiShowScrollTop = true;
    }
    if(this.kdiShowScrollTop && ypos < 100) {
      this.kdiShowScrollTop = false;
    }
  }



  scrollToTop(){
    this.ps.directiveRef.scrollToTop(0,200);
  }


  protected _mediaBreakPoint(){

    // Init on load 
    if(this.bo.isMatched(Breakpoints.Small)){
      this.switchSidenavMode("over");
    }else{
      this.switchSidenavMode("side");
    }

    this._boLargeSubscription = this.bo.observe([
      '(min-width: 700px)'
    ]).subscribe(result => {
      console.warn(result);
      console.log(`Large (${result.matches})` );
      if(result.matches){
        this.switchSidenavMode("side");
      }else{
        this.switchSidenavMode("over");
      }
      if(this.kdiSnSummary)
        this.kdiSnSummary.close();
    })
   
  }

  protected switchSidenavMode(mode: string){
    if(mode == 'over'){
      this.kdiSnApp.mode = "over";
      this.kdiSnApp.disableClose = false;
      this.kdiSnApp.close();
    }else if (mode== 'side'){
      this.kdiSnApp.mode = "side";
      this.kdiSnApp.disableClose = true;
      this.kdiSnApp.open();
    }
  }
  
  protected _sidenavObserver(){
    this._snAppSub = this.kdiSnApp.openedStart.subscribe(()=>{
      this.kdiSnSummary.close();
    });

    this._snSummarySub = this.kdiSnSummary.openedStart.subscribe(()=>{
      if(this.kdiSnApp.mode != "side"){
        this.kdiSnApp.close();
      }
    });

  }

  protected _snAppSub: Subscription;
  protected _snSummarySub: Subscription;

  private _boSmallSubscription: Subscription = null;
  private _boLargeSubscription: Subscription = null;
  ngOnDestroy(): void {
    if(this._boSmallSubscription){
      this._boSmallSubscription.unsubscribe
    }
    if(this._boLargeSubscription){
      this._boLargeSubscription.unsubscribe();
    }

    if(this._snAppSub)  {
      this._snAppSub.unsubscribe();
    }

    if(this._snSummarySub){
      this._snSummarySub.unsubscribe();
    }
    this._destroyConfig();
  }


    
  /** 
   * config Section
   */
  setting: KdiAppSetting ;
  private _initConfig(){
    this.setting = this.settingSrv.getAppSetting();
    this.mainSettingChanged(this.setting);
    this.mainConfigSub = this.settingSrv.settingChanged.subscribe(
       (config: KdiAppSetting) => {
          this.mainSettingChanged(config);
    });
      
  }

  private _destroyConfig(){
    if(this.mainConfigSub){
      this.mainConfigSub.unsubscribe();
    }
  }
  
  mainConfigSub: Subscription = null; 
  protected mainSettingChanged(config: KdiAppSetting){
    console.log("Main setting changed");
    console.warn(config);
    if(config.main.bShowAppSidenav == false){
      this.kdiSnApp.close();
    }else if(this.kdiSnApp.mode == 'side') {
      this.kdiSnApp.open();
    }
    Object.assign(this.setting.main, config);
  }
  // End Config init;
}
