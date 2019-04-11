import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetailTodayPage } from './detailtoday';

@NgModule({
  declarations: [
    DetailTodayPage,
  ],
  imports: [
    IonicPageModule.forChild(DetailTodayPage),
  ],
})
export class DetailTodayPageModule {}
