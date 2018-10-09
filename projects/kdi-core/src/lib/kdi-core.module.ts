import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';  

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

import { KdiMaterialModule } from './kdi-material.module';

import { KdiDialogContainer, MessageBoxComponent } from './dialog';
import { ComponentHostDirective } from './dialog/_dialog';
import { KdiMainComponent } from './main/kdi-main.component';
import { KdiLoadingBarComponent } from './main/Loading/kdi-loading-bar.component';
import { KdiNavigationComponent, KdiNavigationItemComponent } from './main/navigation/kdi-navigation.component';
import { RouterModule } from '@angular/router';
import { KdiLoadingOverlayComponent } from './main/Loading/kdi-loading-overlay.service';
import { KdiSettingDirective } from './core/app/app-setting';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    PerfectScrollbarModule,

    KdiMaterialModule
    
  ],
  declarations: [KdiMainComponent, KdiLoadingBarComponent, KdiLoadingOverlayComponent, KdiNavigationComponent, KdiNavigationItemComponent, KdiDialogContainer, MessageBoxComponent, ComponentHostDirective, KdiSettingDirective],
  exports: [KdiMainComponent, KdiMaterialModule, KdiSettingDirective]
})
export class KdiCoreModule { }
