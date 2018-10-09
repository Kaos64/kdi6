import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { FlexLayoutModule } from '@angular/flex-layout';
import { Ng2Webstorage } from 'ngx-webstorage';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { KdiUiModule } from 'dist/kdi-ui/kdi-ui';
import { KdiCoreModule, KdiMaterialModule } from 'dist/kdi-core';
import { AppRoutingModule } from './app-routing.module';
import { MainComponent } from './screens/main.component';
import { PaperComponent } from './screens/paper/paper.component';
import { LoremComponent } from './screens/lorem/lorem.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    PaperComponent,
    LoremComponent 
  ],
  imports: [ 
    BrowserAnimationsModule, 
    BrowserModule,
    RouterModule,
    HttpClientModule,
        
    FlexLayoutModule,

    Ng2Webstorage,
    
    KdiMaterialModule,
    KdiCoreModule,

    AppRoutingModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
  