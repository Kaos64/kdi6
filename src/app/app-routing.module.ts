import { NgModule, ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { KdiAuthModule } from 'projects/kdi-core/src/public_api';
import { MainComponent } from './screens/main.component';
import { PaperComponent } from './screens/paper/paper.component';
import { LoremComponent } from './screens/lorem/lorem.component';

const routes: Routes = [
  { path: '', component: MainComponent,  data: {breadcrump: {icon: 'home', title: 'Lorem Ipsum'} }, children : [
    {path: 'paper', component: PaperComponent },
    {path: 'lorem', component: LoremComponent }

  ]},
  { path: 'auth', loadChildren: () => KdiAuthModule},
];

export const AppRoutingModule: ModuleWithProviders = RouterModule.forRoot(routes);
