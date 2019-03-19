import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LowPage } from './low';

@NgModule({
  declarations: [
    LowPage,
  ],
  imports: [
    IonicPageModule.forChild(LowPage),
  ],
})
export class LowPageModule {}
