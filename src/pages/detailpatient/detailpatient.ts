import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Geolocation } from '@ionic-native/geolocation';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';
import { Platform } from 'ionic-angular';

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

// import { AngularFiredatabase, FirebaseListObservable } from ‘angularfire2/database’; //show data in firebase

import { ResultPage } from '../result/result';


@IonicPage()
@Component({
  selector: 'page-detailpatient',
  templateUrl: 'detailpatient.html',
})
export class DetailpatientPage {
  //geo
  latitude:number ;
  longitude:number ;

  constructor(private af: AngularFireDatabase,public navCtrl: NavController, public navParams: NavParams,
    public geolocation: Geolocation, private launchNavigator:LaunchNavigator, private platform: Platform) {


  }

  ionViewDidLoad() {
    this.geolocation.getCurrentPosition().then(position =>{
    this.latitude = position.coords.latitude;
    this.longitude = position.coords.longitude;
  },error=>{
    console.log('error',error);
  });
}

navigateLocation(){
  let options: LaunchNavigatorOptions = {
    start:[this.latitude,this.longitude],
    app: this.launchNavigator.APP.GOOGLE_MAPS
  };
  this.launchNavigator.navigate('Robinson Sriracha, ON', options)
  .then(success =>{
    console.log(success);
  },error=>{
    console.log(error);
  })

  }


  goToResult() {
    this.navCtrl.push(ResultPage);
    }

}

