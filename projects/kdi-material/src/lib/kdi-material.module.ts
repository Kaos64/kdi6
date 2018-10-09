import { NgModule, ModuleWithProviders } from '@angular/core';

import {ScrollDispatchModule} from '@angular/cdk/scrolling';
import {CdkTableModule} from '@angular/cdk/table';
import {LayoutModule} from '@angular/cdk/layout';

import {MatTabsModule} from '@angular/material/tabs';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatBadgeModule } from '@angular/material/badge';
import {MatSelectModule} from '@angular/material/select';
import {MatDividerModule} from '@angular/material/divider';

import {
    MatSliderModule, MatButtonModule, MatToolbarModule, MatSidenavModule,  MatButtonToggleModule, MatMenuModule, MatDialogModule,         
    MatIconModule, MatListModule, MatCardModule, MatAutocompleteModule, MatCheckboxModule, MatChipsModule,
    MatGridListModule, MatFormFieldModule, MatInputModule, MatExpansionModule, MatTableModule,MatPaginatorModule,MatSortModule,MatProgressSpinnerModule, MatRadioModule,
    MatProgressBarModule, 
} from '@angular/material';
  
import {MatSlideToggleModule} from '@angular/material/slide-toggle';


@NgModule({
    imports: [MatSliderModule, MatButtonModule, MatToolbarModule, MatSidenavModule, MatSlideToggleModule, MatButtonToggleModule, MatMenuModule,MatDialogModule,
        MatIconModule, MatTabsModule, MatListModule, MatCardModule, MatAutocompleteModule, MatCheckboxModule, MatChipsModule,
        MatGridListModule, MatFormFieldModule, MatInputModule, MatExpansionModule, MatDatepickerModule, MatTableModule,MatPaginatorModule,MatSortModule,MatProgressSpinnerModule, MatRadioModule,
        ScrollDispatchModule, CdkTableModule,LayoutModule,
        MatDividerModule,MatProgressBarModule, MatBadgeModule,MatSelectModule,
    
    ],
    exports: [MatSliderModule, MatButtonModule, MatToolbarModule, MatSidenavModule, MatSlideToggleModule, MatButtonToggleModule, MatMenuModule, MatDialogModule,
        MatIconModule, MatTabsModule, MatListModule, MatCardModule, MatAutocompleteModule, MatCheckboxModule, MatChipsModule,
        MatGridListModule, MatFormFieldModule, MatInputModule, MatExpansionModule, MatDatepickerModule,  MatTableModule,MatPaginatorModule,MatSortModule,MatProgressSpinnerModule, MatRadioModule,
        ScrollDispatchModule, CdkTableModule,LayoutModule,
        MatDividerModule,MatProgressBarModule, MatBadgeModule,MatSelectModule,
    
    ],
    
    
})
export class KdiMaterialModule {
    static forRoot(): ModuleWithProviders{
        return {
          ngModule: KdiMaterialModule,
          providers: []
        }
    }
 }
