import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { Storage } from '@ionic/storage';


@IonicPage()
@Component({
  selector: 'page-signout',
  templateUrl: 'signout.html',
})
export class SignoutPage {

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignoutPage');
  }


  presentConfirm() {
    let alert = this.alertCtrl.create({
      title: 'ยืนยันการออกจากระบบ',
      message: 'คุณต้องการออกจากระบบใช่หรือไม่?',
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
