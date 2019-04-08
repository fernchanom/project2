import { NgModule }        from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserChangePassPage }    from './userChangePass';

@NgModule({
  declarations: [
    UserChangePassPage,
  ],
  imports: [
    IonicPageModule.forChild(UserChangePassPage),
  ],
})
export class UserCreatePageModule {}
