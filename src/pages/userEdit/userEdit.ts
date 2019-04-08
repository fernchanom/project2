import { Component }                            from '@angular/core';
import { Storage }                              from '@ionic/storage';
import { IonicPage, NavController, NavParams }  from 'ionic-angular';
import { AlertController }                      from 'ionic-angular';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { SettingPage }                          from '../setting/setting';


@IonicPage()
@Component({
  selector: 'page-userEdit',
  templateUrl: 'userEdit.html',
})
export class UserEditPage {
  user_id = null;
  user = {Firstname: null, Lastname: null};

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
    console.log(this.user);
    this.af.list('/User').update(this.user_id, this.user);
    this.storage.set('user', this.user);
    this.navCtrl.push(SettingPage);
  }

}
