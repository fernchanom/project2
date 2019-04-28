import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { Storage } from '@ionic/storage';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { SettingPage }                            from '../setting/setting';


@IonicPage()
@Component({
  selector: 'page-userCreate',
  templateUrl: 'userCreate.html',
})
export class UserCreatePage {
  // test commit
  user = {
    Username: null,
    Password: null,
    Firstname: null,
    Lastname: null,
  };
  itemsRef: AngularFireList<any>;

  constructor(public navCtrl: NavController,
    private af: AngularFireDatabase,
    public navParams: NavParams,
    public storage: Storage,
    private alertCtrl: AlertController
  ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserCreatePage');
  }

  save() {

    if (!this.user.Firstname || !this.user.Lastname || !this.user.Username || !this.user.Password) {
      console.log('empty.');
      // สร้าง alert
      let alert = this.alertCtrl.create({
        title: 'Warning',
        subTitle: 'Something has empty.',
        buttons: ['OK']
      });

      // สั่งแสดง alert
      alert.present();
      return false;
    }
    console.log('user', this.user);
    this.itemsRef = this.af.list('/User');
    this.itemsRef.push(this.user);

    // สร้าง alert
    let alert = this.alertCtrl.create({
      title: 'Success',
      subTitle: 'Add User Success',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.navCtrl.push(SettingPage);
          }
        }
      ]
    });

    // สั่งแสดง alert
    alert.present();

  }







}
