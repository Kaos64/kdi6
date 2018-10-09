import { Injectable, EventEmitter, Directive, Input, OnDestroy } from '@angular/core';
import { KdiAppSetting, KdiMainSetting } from '../model';
import { Observer, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
export class KdiAppService {
    public settingChanged: Subject<KdiAppSetting> = new Subject<KdiAppSetting>();
    public scrollEvent : EventEmitter<Object> = new EventEmitter<Object>();

    private config: KdiAppSetting;
    constructor(protected defaults: KdiAppSetting) {
        this.config = this.defaults.clone();
    }


    public getAppSetting(){
        return this.config; 
    }

    public pushMainSetting(main: KdiMainSetting){
        Object.assign(this.config.main, main);
        this.settingChanged.next(this.config); 
    }

    public pushMainDefault(){
        console.log("push default");
        console.warn( this.defaults.main)
        this.pushMainSetting(this.defaults.main);
    }

    public contentScrollChange(target: any){
        if((target.scrollHeight - target.clientHeight) > 200){
            this.scrollEvent.emit({
              pos: target.scrollTop,
              width: target.offsetWidth
            });
        }
    }
}


@Directive({ selector: '[kdi-setting]' })
export class KdiSettingDirective implements OnDestroy{
    
    @Input() set kdiMainSetting (config: KdiMainSetting){
        console.error("Push values", config);
        this.config.pushMainSetting(config);
    }
    constructor(protected config: KdiAppService) { }

    ngOnDestroy(): void {
        console.error('Restort values');
        this.config.pushMainDefault();
    }
}