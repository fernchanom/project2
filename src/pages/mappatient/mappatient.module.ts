import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MappatientPage } from './mappatient';

@NgModule({
  declarations: [
    MappatientPage,
  ],
  imports: [
    IonicPageModule.forChild(MappatientPage),
  ],
})
export class MappatientPageModule {}
