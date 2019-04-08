import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { Storage } from '@ionic/storage';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';


@IonicPage()
@Component({
  selector: 'page-userCreate',
  templateUrl: 'userCreate.html',
})
export class UserCreatePage {
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
    this.itemsRef = this.af.list('/User');
    this.itemsRef.push(this.user);
  }







}
