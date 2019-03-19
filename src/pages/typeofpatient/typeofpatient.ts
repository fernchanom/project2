import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Storage } from '@ionic/storage';


import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { HightPage } from '../hight/hight';


@IonicPage()
@Component({
  selector: 'page-typeofpatient',
  templateUrl: 'typeofpatient.html',
})
export class TypeofpatientPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TypeofpatientPage');
  }


  goToHight() {
    this.navCtrl.push(HightPage);

  }

}
