import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { AgmCoreModule } from '@agm/core';
import { MapComponent, MessageComponent} from './map/map.component';

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
} from '@angular/material';
import { HighmapComponent } from './highmap/highmap.component';
import { MapindexComponent } from './mapindex/mapindex.component';
import { MapgastoComponent } from './mapgasto/mapgasto.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http/src/client';
import { MapService } from './map.service';
//import { MapGastoService } from './mapgasto/mapgasto.service';
import { MapamarcasComponent } from './mapamarcas/mapamarcas.component';
import { MapamarcasService } from './mapamarcas/mapamarcas.service';
import { GeradorPdfComponent } from './gerador-pdf/gerador-pdf.component';
//import { MapamarcasService } from './mapamarcas/mapamarcas.service';
import { SnackbarmessageComponent } from './snackbarmessage/snackbarmessage.component';
import { RelatorioindexComponent } from './relatorioindex/relatorioindex.component';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    MessageComponent,
    HighmapComponent,
    MapindexComponent,
    MapgastoComponent,
    MapamarcasComponent,
    SnackbarmessageComponent,
    RelatorioindexComponent,
    GeradorPdfComponent
  ],
  entryComponents: [
    MessageComponent,
    SnackbarmessageComponent
  ],
  imports: [
    BrowserModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBd7MUEhkazm-_uVSCyR7NL_3mm_rGI23w'
    }),
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSnackBarModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatNativeDateModule,
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
  providers: [MapService, RelatorioindexComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
