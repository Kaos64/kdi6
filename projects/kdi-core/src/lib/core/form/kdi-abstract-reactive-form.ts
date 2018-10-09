import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, ViewChild, forwardRef, OnChanges, AfterViewInit} from '@angular/core';
import {FormGroup, FormBuilder } from '@angular/forms';

import { Observable, Subscription} from 'rxjs';
import {tap, catchError, map} from 'rxjs/operators'


import { BaseForm } from './form';
import { IDialogContent } from '../../dialog';



 export abstract class KdiAbstractReactiveForm<T> extends BaseForm implements OnInit, OnChanges, OnDestroy, IDialogContent{

    @Output() elementDeleted: EventEmitter<T> = new EventEmitter<T>();
    
    public form: FormGroup = null;

    @Input() public data: T = null;
    
    public formEditing : boolean = false;
    
    public formSubscrition: Subscription = null;

    public errmsg: string = '';

    

    constructor(protected fb: FormBuilder){
      super();
    }

    public edit() {
      this.ngOnChanges();
      this.startEditing();
    }
    
    public cancel(): any {
      this.ngOnChanges();
      this.stopEditing();
    }
    
    public submit(): Observable<T> {
      this.errmsg = '';
      return this._editAction(this.form.value)
       .pipe(
        tap((data: T) => {
            Object.assign(this.data, data);
            this.ngOnChanges();
            this.stopEditing();
        }),
        catchError((err) => {this.errmsg = err; return Observable.throw(err)}));
    }

    
    ngOnInit(){
        
        this.data = this._initData();
        this.form = this._createForm();
        this._setFormState();
        this.ngOnChanges();
        this.form.statusChanges.subscribe(data => {
          //console.warn(this.form);
            this.formChange.emit(
                {formValid: this.form.valid && this.form.dirty,
                 formChange: this.form.dirty || this.form.touched});
        })
    }

    ngOnChanges(): void {
        console.log("Changes call");
        if(this.form){

          let formData  = this.form.value;
          console.warn(formData);
          for (let key in formData){
            formData[key] = this.data[key];
          }
          console.log("Before reset");
          console.warn(formData);
          this.form.reset(formData);
        }
        
      }
    
    ngOnDestroy(): void {
      if(this.formSubscrition){
        this.formSubscrition.unsubscribe();
      }
    }

    private _setFormState(){
      if(this.form){
        for(let elt in this.form.controls){
         if(this.formEditing){
           this.form.controls[elt].enable();
         }else{
           this.form.controls[elt].disable();
         }
        }
      }
      
    }


    setDlgConfig(data: any):void{
      this.data = data;
      this.edit();
    }
    actionState(): Observable<boolean>{
      return this.formChange.pipe(
        map(val => val.formChange && val.formValid)
      )         
    }
    doAction():Observable<any> {
      return this.submit();
    }
   
    
    protected abstract  _editAction(data: T): Observable<T>;  
    
    protected abstract _initData(): T;
    protected abstract _createForm(): FormGroup;
    
    
    protected stopEditing(){
        this.formEditing = false;
        this._setFormState();
    }

    protected startEditing(){
        this.formEditing = true;
        this._setFormState();
    }
  }
  