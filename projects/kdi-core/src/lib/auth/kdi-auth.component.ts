import { Component, OnInit, Input } from '@angular/core';
import { KdiMainSetting } from '../core/model';

@Component({
  selector: 'kdi-auth',
  templateUrl: 'kdi-auth.component.html',
  styleUrls: ['kdi-auth.component.scss']
})
export class KdiAuthComponent implements OnInit {

  mainSetting: KdiMainSetting = {
    bShowFooter: false,
    bShowToolbar: false,
    bShowAppSidenav: false,
    bShowSummarySidenav: false,
    bShowBreadcrump: false
  }

  @Input() title: string= '';

  constructor() { }

  ngOnInit() {
  }

}
