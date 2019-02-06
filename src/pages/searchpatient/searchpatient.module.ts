import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchpatientPage } from './searchpatient';

@NgModule({
  declarations: [
    SearchpatientPage,
  ],
  imports: [
    IonicPageModule.forChild(SearchpatientPage),
  ],
})
export class SearchpatientPageModule {}
