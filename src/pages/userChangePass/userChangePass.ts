import { Component }                            from '@angular/core';
import { Storage }                              from '@ionic/storage';
import { IonicPage, NavController, NavParams }  from 'ionic-angular';
import { AlertController }                      from 'ionic-angular';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { SettingPage }                          from '../setting/setting';


@IonicPage()
@Component({
  selector: 'page-userChangePass',
  templateUrl: 'userChangePass.html',
})
export class UserChangePassPage {
  user_id = null;
  user = {Password: null};
  password = {oldPass: null, newPass:null, confirmPass:null};
  itemsRef: AngularFireList<any>;

  constructor(public navCtrl: NavController,
    private af: AngularFireDatabase,
    public navParams: NavParams,
    public storage: Storage,
    private alertCtrl: AlertController
  ) {}



  ionViewDidLoad() {
    this.storage.get('user').then((val) => {
      this.user = val;
    });

    this.storage.get('user_id').then((val) => {
      this.user_id = val;
    });
  }

  save() {
    console.log(this.password, this.user);
    // Password wrong
    if (this.password.oldPass != this.user.Password) {
      let alert = this.alertCtrl.create({
        title: 'ข้อมูลไม่ถูกต้อง',
        subTitle: 'รหัสผ่าน ของท่านไม่ถูกต้อง',
        buttons: ['ตกลง']
      });
      alert.present();
      return false;
    }

    // New password not match
    if (this.password.newPass != this.password.confirmPass) {
      let alert = this.alertCtrl.create({
        title: 'ข้อมูลไม่ถูกต้อง',
        subTitle: 'รหัสผ่านใหม่ ของท่านไม่ตรงกัน',
        buttons: ['ตกลง']
      });
      alert.present();
      return false;
    }

    this.user.Password = this.password.newPass;
    this.af.list('/User').update(this.user_id, this.user);
    this.storage.set('user', this.user);
    this.navCtrl.push(SettingPage);
  }
}
