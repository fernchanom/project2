import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Storage } from '@ionic/storage';


import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { HightPage } from '../hight/hight';
import { MediumPage } from '../medium/medium';
import { LowPage } from '../low/low';


@IonicPage()
@Component({
  selector: 'page-typeofpatient',
  templateUrl: 'typeofpatient.html',
})
export class TypeofpatientPage {
  items;
  Patient;
  note;
  firstName;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public afd : AngularFireDatabase) {
      // this.goToHight();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TypeofpatientPage');
  }


  goToHight() {
    this.navCtrl.push(HightPage);
    // this.afd.list('Patient/').valueChanges().subscribe{
    //   data => {
    //     console.log(data)
    //     this.items = data
    //   }
    // }  

  }


  goToMedium() {
    this.navCtrl.push(MediumPage);
  }
  goToLow() {
    this.navCtrl.push(LowPage);
  }


}
