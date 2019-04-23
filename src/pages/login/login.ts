import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

import { Storage } from '@ionic/storage';

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import firebase from 'firebase';
import { NotePage } from '../note/note';
import { AlertController } from 'ionic-angular';

import {  MenuController } from 'ionic-angular';


/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  itemsRef: AngularFireList < any > ;
  items: Observable < any[] > ;
  username: String;
  password: String;

  constructor(private af: AngularFireDatabase, public navCtrl: NavController, public navParams: NavParams, public storage: Storage, private alertCtrl: AlertController, public menuCtrl: MenuController, private viewCtrl: ViewController) {
  }

  public myPerson = [];

  ionViewDidLoad() {
    const personRef: firebase.database.Reference = firebase.database().ref("/User");
    personRef.on('value', personSnapshot => {
      this.myPerson = personSnapshot.val();
    });

    // this.af.list(`/User`).valueChanges().subscribe(d => {
    //   this.myPerson = d;
    //   console.log('test2: ', this.myPerson);
    // });
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
    this.viewCtrl.showBackButton(false);
    console.log('menu');
  }

  showData() {
    this.itemsRef = this.af.list('/User');
    // Use snapshotChanges().map() to store the key

    this.items = this.itemsRef.snapshotChanges().map(changes => {
      console.log(changes)
      console.log("Log", this.items);
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
    console.log("changes", this.items);
  }

  validateLogin() {
    let userPass = false;

    // Authenticate
    if (this.username == null && this.password == null) {
      let alert = this.alertCtrl.create({
        title: 'ข้อมูลไม่ถูกต้อง',
        subTitle: 'ชื่อผู้ใช้ หรือ รหัสผ่าน ของท่านไม่ถูกต้อง กรุณาเข้าสู่ระบบอีกครั้ง',
        buttons: ['ตกลง']
      });
      alert.present();
      return false;
    }

    // Loop for check user in database
    Object.keys(this.myPerson).forEach(key=> {
      console.log('this.myPerson[key] : ', this.myPerson[key], key);
      if (this.myPerson[key].Username == this.username && this.myPerson[key].Password == this.password) {
        this.storage.set('user_id', key);
        this.storage.set('user', this.myPerson[key]);
        this.navCtrl.push(NotePage);
        userPass=true;
        this.menuCtrl.enable(true);
      }
    });

    // no user map database
    if (!userPass) {
      let alert = this.alertCtrl.create({
        title: 'ข้อมูลไม่ถูกต้อง',
        subTitle: 'ชื่อผู้ใช้ หรือ รหัสผ่าน ของท่านไม่ถูกต้อง กรุณาเข้าสู่ระบบอีกครั้ง',
        buttons: ['ตกลง']
      });
      alert.present();
    }
  }


}
//Zameawza0821807459
