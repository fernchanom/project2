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
  datecheckup_: string;
  sick_: string;
  nextdate_checkup_: string;
  // send_id:string;

  constructor(private af: AngularFireDatabase,
    public navCtrl: NavController,
    public navParams: NavParams,
    private platform: Platform,
    public storage: Storage) {}

  ionViewDidLoad() {
    this.storage.get('datecheckup').then((val) => {
      this.datecheckup_ = val
    })
    this.storage.get('sick').then((val) => {
      this.sick_ = val
    })
    this.storage.get('nextdate_checkup').then((val) => {
      this.nextdate_checkup_ = val
    })

    console.log('datecheckup :', this.datecheckup_);
    console.log('sick :', this.sick_);
    console.log('nextdate_checkup :', this.nextdate_checkup_);
    // this.storage.get('patient_id_').then((val) => {
    //   this.send_id = val
    // })

    console.log('ionViewDidLoad DetailcheckupPage');
  }

}
