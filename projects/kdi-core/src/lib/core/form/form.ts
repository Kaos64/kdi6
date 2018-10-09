import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, ViewChild, forwardRef} from '@angular/core';
import {NgForm } from '@angular/forms';

import { Observable, Subscription,  } from 'rxjs'
import {tap} from 'rxjs/operators'

import { KdiDialogService } from '../../dialog';


export abstract class BaseForm {
    @Output() formChange: EventEmitter<any> = new EventEmitter();
    
    abstract edit();
    abstract submit();
    abstract cancel();
    
   }
  
  export abstract class KdiAbstractForm<T> extends BaseForm implements OnInit, OnDestroy {
    @Output() elementDeleted: EventEmitter<T> = new EventEmitter<T>();
    
    public _data: T = null;
    public formData: T ;
    public formEditing: boolean = false;
    
    public formSubscrition: Subscription = null;


    constructor(protected dlg: KdiDialogService){
      super();
    }

    public edit() {
      this._updateData(true);
    }
    
    public cancel(): any {
      this._updateData(false);
    }
    
    public submit(): Observable<T> {
      return this._editAction().pipe(
          tap((data) => {
            Object.assign(this._data, data);
            this._updateData(false);
      }));
    }

    
    ngOnInit(){
    }
    
    ngOnDestroy(): void {
      if(this.formSubscrition){
        this.formSubscrition.unsubscribe();
      }
    }
    
    protected abstract  _editAction(): Observable<T>;  
    
    protected _updateData(state: boolean = true){
      let obj = {} as T;
      this.formData = Object.assign(obj, this._data);
      this.formEditing  = state;
    }
  }
  