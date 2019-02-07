import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
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
  //note page
  first_name:string;
  last_name:string;
  date_of_birth:string;
  age_:string;
  blood_type:string;
  medical_problems:string;
  risk_type:string;
  address_:string;
  tel_number:string;
  patient_id_:string;
  identification_number_:string;
  sex_:string;
 
  constructor(private af: AngularFireDatabase,public navCtrl: NavController, public navParams: NavParams,
    public geolocation: Geolocation, private launchNavigator:LaunchNavigator, private platform: Platform,
    public storage: Storage) {
  }

  ionViewWillEnter(){
  }

  ionViewDidLoad() {
  this.storage.get('firstName').then((val) => {
    this.first_name = val
  })
  this.storage.get('lastName').then((val) => {
    this.last_name = val
  })
  this.storage.get('dateOfBirth').then((val) => {
    this.date_of_birth = val
  })
  this.storage.get('age').then((val) => {
    this.age_ = val
  })
  this.storage.get('bloodType').then((val) => {
    this.blood_type = val
  })
  this.storage.get('medicalProblems').then((val) => {
    this.medical_problems = val
  })
  this.storage.get('riskType').then((val) => {
    this.risk_type = val
  })
  this.storage.get('address').then((val) => {
    this.address_ = val
  })
  this.storage.get('tel').then((val) => {
    this.tel_number = val
  })
  this.storage.get('patient_id').then((val) => {
    this.patient_id_ = val
  })
  this.storage.get('identification_number').then((val) => {
    this.identification_number_ = val
  })
  this.storage.get('sex').then((val) => {
    this.sex_ = val
  });


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

