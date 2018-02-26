import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MapComponent } from './map/map.component';
import { HighmapComponent } from './highmap/highmap.component';
import { MapindexComponent } from './mapindex/mapindex.component';
import { MapamarcasComponent } from './mapamarcas/mapamarcas.component';
import { MapgastoComponent } from './mapgasto/mapgasto.component';
import { RelatorioindexComponent } from './relatorioindex/relatorioindex.component';
import { GeradorPdfComponent } from './gerador-pdf/gerador-pdf.component';

const routes: Routes = [
  { path: 'map', component: MapComponent },
  { path: 'highmap', component: HighmapComponent },
  { path: 'mapindex', component: MapindexComponent },
  { path: 'relatorioindex', component: RelatorioindexComponent },
  { path: 'mapamarcas', component: MapamarcasComponent },
  { path: 'testPDF', component: GeradorPdfComponent },
  { path: 'mapgasto', component: MapgastoComponent }

];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}