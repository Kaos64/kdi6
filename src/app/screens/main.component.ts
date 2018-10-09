import { Component, OnInit } from '@angular/core';
import { KdiMainSetting } from 'dist/kdi-core/kdi-core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  mainSetting: KdiMainSetting = {
    bShowFooter: true,
    bShowToolbar: true,
    bShowAppSidenav: true,
    bShowSummarySidenav: true,
    bShowBreadcrump: true
  }
  
  constructor() { }

  ngOnInit() {
  }

}
