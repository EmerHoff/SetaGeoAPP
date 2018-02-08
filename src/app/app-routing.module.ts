import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MapComponent } from './map/map.component';
import { HighmapComponent } from './highmap/highmap.component';

const routes: Routes = [
  { path: 'map', component: MapComponent },
  { path: 'highmap', component: HighmapComponent }
];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}