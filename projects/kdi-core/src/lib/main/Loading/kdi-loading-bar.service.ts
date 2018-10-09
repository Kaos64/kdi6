import { Router, Event as EventRouter, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { Injectable } from '@angular/core';
import { Subject, Observable  } from 'rxjs';
import { filter} from 'rxjs/operators'

import { KdiLoadingBarEvent, KdiLoadingBarEventType } from './model';

@Injectable({
  providedIn: 'root'
})
export class KdiLoadingBarService {

  _visible: boolean = true;
  _progress: number = 0;
  _mode: string;
  _color: string;

  set visible(value: boolean) {
    this._visible = value;
    this.emit(KdiLoadingBarEventType.VISIBLE, this._visible);
  }

  set mode(mode: string) {
    this._mode = mode;
    this.emit(KdiLoadingBarEventType.MODE, this._mode);
  }

  set progress(progress: number) {
    this._progress = progress;
    this.emit(KdiLoadingBarEventType.PROGRESS, this._progress);
  }

  get progress() {
    return this._progress;
  }

  set color(color: string) {
    this._color = color;
    this.emit(KdiLoadingBarEventType.COLOR, this._color);
  }

  public interval: number = 500; // ms (millisecond)
  private _intervalId: any = null;


  private eventSource: Subject<KdiLoadingBarEvent> = new Subject<KdiLoadingBarEvent>();
  public events: Observable<KdiLoadingBarEvent> = this.eventSource.asObservable();

  private emit(type: KdiLoadingBarEventType, value: any) {
    this.eventSource.next(new KdiLoadingBarEvent(type, value));
  }

  constructor(router: Router) {
    console.debug("KdiLoadingBarService : constructor");

    router.events
      .pipe(
        filter(evt => evt instanceof NavigationStart ||
          evt instanceof NavigationEnd ||
          evt instanceof NavigationCancel)
      ).subscribe((evt: EventRouter) => {
        this.routerLoading(evt);
      });
  }

  protected routerLoading(evt: EventRouter): void {
    if (evt instanceof NavigationStart) {
      this.start();
      evt
    }
    if (evt instanceof NavigationEnd) {
      this.complete();
    }

    // Set loading state to false in both of the below events to hide the spinner in case a request evts
    if (evt instanceof NavigationCancel ||
      evt instanceof NavigationError) {
      this.complete();
    }
  }

  start(mode: string = 'determinate', onComplete: Function = null) {
    this.reset();
    this.mode = mode;
    this.visible = true;

    if (mode === 'determinate') {
      this._intervalId = setInterval(() => {
        this.progress++;
        if (this.progress === 100) {
          this.complete(onComplete);
        }
      },
        this.interval);
    }
  }

  stop() {
    if (this._intervalId) {
      clearInterval(this._intervalId);
      this._intervalId = null;
    }

  }

  reset() {
    this.stop()
    this.progress = 0;
  }

  complete(onComplet: Function = null) {
    if (this._mode !== 'buffer') {
      this.progress = 100;
    }
    this.stop();
    setTimeout(() => {
      this.visible = false;
      setTimeout(() => {
        this.progress = 0;
        if (onComplet) {
          onComplet();
        }
      }, 250)
    }, 250);
  }

}
