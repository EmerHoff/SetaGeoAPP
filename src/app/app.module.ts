import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { AgmCoreModule } from '@agm/core';
import { MapComponent, MessageComponent } from './map/map.component';

import { AppRoutingModule } from './app-routing.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CdkTableModule } from '@angular/cdk/table';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatStepperModule,
  MatPaginatorIntl
} from '@angular/material';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { HighmapComponent } from './highmap/highmap.component';
import { MapindexComponent } from './mapindex/mapindex.component';
import { MapgastoComponent } from './mapgasto/mapgasto.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http/src/client';
import { MapService } from './map.service';
import { MapamarcasComponent } from './mapamarcas/mapamarcas.component';
import { GeradorPdfComponent } from './gerador-pdf/gerador-pdf.component';
import { FormsModule } from '@angular/forms';
//import { MapamarcasService } from './mapamarcas/mapamarcas.service';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    MapamarcasComponent,
    MessageComponent,
    HighmapComponent,
    MapindexComponent,
    MapgastoComponent,
    GeradorPdfComponent
  ],
  entryComponents: [
    MessageComponent
  ],
  imports: [
    BrowserModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBd7MUEhkazm-_uVSCyR7NL_3mm_rGI23w'
    }),
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatSnackBarModule,
    BrowserModule,
    MatTabsModule,
    MatPaginatorModule,
    BrowserAnimationsModule,
    MatNativeDateModule,
    MatTabsModule,
    MatPaginatorModule,
    MatListModule,
    FormsModule,
    HttpClientModule
  ],
  exports: [
    CdkTableModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule
  ],
  providers: [MapService],
  bootstrap: [AppComponent]

})
export class AppModule { }