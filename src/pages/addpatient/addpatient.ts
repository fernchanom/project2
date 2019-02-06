import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

//database
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';



/**
 * Generated class for the AddpatientPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-addpatient',
  templateUrl: 'addpatient.html',
})

export class AddpatientPage {
 
  newPatient = { title: '', message: '' }
 
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
  }
 
  ionViewDidLoad() {
    console.log('ionViewDidLoad AddpatientPage');
  }
 
  save(){
    this.viewCtrl.dismiss({ isCancel: false, data: this.newPatient });
  }
 
  cancel(){
    this.viewCtrl.dismiss({ isCancel: true });
  }
 
}

