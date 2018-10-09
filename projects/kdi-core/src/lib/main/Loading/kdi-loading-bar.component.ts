import { Component, OnInit, OnDestroy, Input, ChangeDetectorRef, ElementRef, AfterViewInit, ChangeDetectionStrategy } from '@angular/core';

import { Subscription } from 'rxjs';

import { KdiLoadingBarEvent, KdiLoadingBarEventType } from './model';
import { KdiLoadingBarService } from './kdi-loading-bar.service';


@Component({
  selector: 'kdi-loading-bar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './kdi-loading-bar.component.html',
  styleUrls: ['./kdi-loading-bar.component.scss']
})
export class KdiLoadingBarComponent implements OnInit, AfterViewInit, OnDestroy {

  theTransition : string = "opacity 0.5s ease-in-out";

  @Input() mode: string = 'determinate';
  @Input() color: string = 'accent';

  _progress: string = '50';
  @Input() set progress(progress: string){
    this._progress = progress;
  }

  get progress(){
    return this._progress;
  } 
  bufferValue: number = 100;
  
  show: string = '0'; 

  private eventSub: Subscription = null;

  constructor(protected srv: KdiLoadingBarService, private _changeDetectorRef: ChangeDetectorRef) { }
  
  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.eventSub = this.srv.events.subscribe((event: KdiLoadingBarEvent) => {
      switch(event.type){
        case KdiLoadingBarEventType.PROGRESS:
          this.progress = event.value;
        break;
        case KdiLoadingBarEventType.COLOR: 
          this.color = event.value;
        break;
        case KdiLoadingBarEventType.MODE: 
          this.mode = event.value;
        break;
        case  KdiLoadingBarEventType.VISIBLE:
          this.show = event.value ? '1' : '0';
          break;
      }
      this._changeDetectorRef.detectChanges();
    })
  }
  
  ngOnDestroy(): void {

    if(this.eventSub){
      this.eventSub.unsubscribe();
    }
  }


}
 