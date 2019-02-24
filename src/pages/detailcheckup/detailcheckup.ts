import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Platform } from 'ionic-angular';

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';


@IonicPage()
@Component({
  selector: 'page-detailcheckup',
  templateUrl: 'detailcheckup.html',
})
export class DetailcheckupPage {
  datecheckup_:string;
  sick_:string;
  nextdate_checkup_:string;

  constructor(private af: AngularFireDatabase,
    public navCtrl: NavController, 
    public navParams: NavParams,
    private platform: Platform,
    public storage: Storage) {
  }

  ionViewDidLoad() {
    this.storage.get('datecheckup').then((val) => {
      this.datecheckup_ = val
    })
    this.storage.get('sick').then((val) => {
      this.sick = val
    })
    this.storage.get('nextdate_checkup').then((val) => {
      this.nextdate_checkup_ = val
    })

    console.log('ionViewDidLoad DetailcheckupPage');
  }

}
