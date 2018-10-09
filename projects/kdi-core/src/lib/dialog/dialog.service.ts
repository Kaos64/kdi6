import { Injectable, Component, OnInit, Inject, ContentChild, QueryList, ViewChild, Type, ViewContainerRef, Directive, ComponentFactoryResolver } from '@angular/core';

import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogConfig } from '@angular/material';

import { KdiDialogComponent, ComponentHostDirective } from './_dialog'

import {Observable, from, empty} from 'rxjs';


export interface IDialogContent{
  setDlgConfig(data: any);
  actionState(): Observable<boolean>;
  doAction():Observable<any>;
  //process(command: string): Observable<any>;
}

export class KdiDialogconfig{
  title: string;
  bShowCancel: boolean;
  bShowOk: boolean;
  bShowAction: boolean;
  labelAction: string;
}

const KDI_DIALOG_CONFIG_DEFAULT: KdiDialogconfig = {
  title: 'Dialog title',
  bShowCancel: true,
  bShowOk: false,
  bShowAction: true,
  labelAction: "Save"
}


@Component({
  templateUrl: 'kdi-dialog-container.html',
  styleUrls: ['./kdi-dialog.scss']
})
export class KdiDialogContainer implements OnInit {
  dialog_config : KdiDialogconfig;

  actionState: boolean = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, 
              private componentFactoryResolver: ComponentFactoryResolver,
              private dialogRef: MatDialogRef<KdiDialogContainer>,) { }
  @ViewChild(ComponentHostDirective) cmpHost : ComponentHostDirective;

  componentRef: IDialogContent;

  ngOnInit() {
      this.dialog_config = { ...KDI_DIALOG_CONFIG_DEFAULT, ...this.data.dialog_config}
      let template : KdiDialogComponent= this.data.template;
      let componentFactory = this.componentFactoryResolver.resolveComponentFactory(template.component);

      let viewRef = this.cmpHost.viewContainerReg;
      viewRef.clear();
      this.componentRef =(viewRef.createComponent(componentFactory)).instance;
      
      this.componentRef.actionState().subscribe((state)=>{
          this.actionState = state;
      })
      this.componentRef.setDlgConfig(template.data);
   }

   action(){
       this.componentRef.doAction()
          .subscribe((data: any) => { 
              
              console.error(data); 
              
              return this.dialogRef.close(data)},
              (err) => { console.warn("Err")});
   }
}


export enum MessageBoxType {
  confirm = "notifications",
  alert = "error",
  warning= "warning",
}




@Component({
  selector: 'kdi-message-box',
  template: `<h1>{{data.message}}</h1>`
})
export class MessageBoxComponent implements OnInit, IDialogContent {
  data = null;
  setDlgConfig(data: any) {
      this.data = data;
  }

  actionState(): Observable<boolean> {
      return empty();
  }
  doAction(): Observable<any> {
      return empty();
  }
  constructor() { }

  ngOnInit() { }
}


@Injectable({
  providedIn: 'root'
})
export class KdiDialogService {

    constructor(protected dlg :MatDialog) { }

    openDialogComponent(comp: Type<any>, data: any, kdiConfig?: Object, matConfig?: MatDialogConfig): Observable<any>{
        let template = new KdiDialogComponent(comp, data);
        let ref = this.dlg.open(KdiDialogContainer,{
            data:{ template: template,
                    dialog_config: kdiConfig},
            width: '500px'
        });

        return ref.afterClosed();
    }

    messageBoxConfig = {
        panelClass: 'panelClass',
        width: '400px'
    }

    public confirm(message: string, title?: string): Observable<boolean> {
        let config = {
            title: title ? title : 'Confirm ?',
            bShowCancel: true,
            bShowOk: true,
            bShowAction: false
        }
        return this.openDialogComponent(MessageBoxComponent, {message: message, type: MessageBoxType.confirm}, config, this.messageBoxConfig);
    }

    public alert(message: string, title?: string): Observable<boolean> {
        let config = {
            title: title ? title : 'Alert ',
            bShowCancel: false,
            bShowOk: true,
            bShowAction: false
        }
        return this.openDialogComponent(MessageBoxComponent, {message: message, type: MessageBoxType.confirm}, config, this.messageBoxConfig);
    }
    
}