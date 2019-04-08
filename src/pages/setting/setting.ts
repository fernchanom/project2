import { Component }                            from '@angular/core';
import { Storage }                              from '@ionic/storage';
import { IonicPage, NavController, NavParams }  from 'ionic-angular';
import { AlertController }                      from 'ionic-angular';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { UserEditPage }                         from '../userEdit/userEdit';
import { UserChangePassPage }                   from '../userChangePass/userChangePass';
import { UserCreatePage }                       from '../userCreate/userCreate';
import { LoginPage }                            from '../login/login';

/**
 * Generated class for the SettingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html',
})
export class SettingPage {
  user = {};

	userCreatePage: UserCreatePage;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage,private alertCtrl: AlertController, private af: AngularFireDatabase,) {
  }

  ionViewDidLoad() {
    // Get user detail from local storage (session)
    this.storage.get('user').then((val) => {
      console.log(val);
      this.user = val;
    });
  }

  goToUserEditPage() {
    this.navCtrl.push(UserEditPage);
  }

  goToUserChangePassPage() {
    this.navCtrl.push(UserChangePassPage);
  }

  goToUserCreatePage() {
  	this.navCtrl.push(UserCreatePage);
  }

  //ลบข้อมูลตาม key ที่เลือก
  delete() {
    let alert = this.alertCtrl.create({
      title: 'ยืนยันการลบรายชื่อ',
      message: 'คุณต้องการลบรายชื่อนี้ใช่หรือไม่?',
      buttons: [
        {
          text: 'ไม่ใช่',
          role: 'no',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'ใช่',
          handler: () => {
            this.storage.get('user_id').then((val) => {
              this.af.object('User/'+val).remove();
            });
            this.storage.set('user', null);
            this.storage.set('user_id', null);
            this.navCtrl.push(LoginPage);
          }
        }
      ]
    });
    alert.present();
  }


}
