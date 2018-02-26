import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MapComponent } from './map/map.component';
import { HighmapComponent } from './highmap/highmap.component';
import { MapindexComponent } from './mapindex/mapindex.component';
import { MapamarcasComponent } from './mapamarcas/mapamarcas.component';
import { MapgastoComponent } from './mapgasto/mapgasto.component';
import { GeradorPdfComponent } from './gerador-pdf/gerador-pdf.component';

const routes: Routes = [
  { path: 'map', component: MapComponent },
  { path: 'highmap', component: HighmapComponent },
  { path: 'mapindex', component: MapindexComponent },
  { path: 'mapamarcas', component: MapamarcasComponent },
  { path: 'mapgasto', component: MapgastoComponent },
  { path: 'geradorpdf', component: GeradorPdfComponent }
];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}