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
  patient;
 
 
  constructor(private af: AngularFireDatabase,
    public navCtrl: NavController, 
    public navParams: NavParams,
    public geolocation: Geolocation, 
    private launchNavigator:LaunchNavigator, 
    private platform: Platform,
    public storage: Storage) {
  }

  ionViewWillEnter(){
  }

  ionViewDidLoad() {
  this.patient = this.navParams.get('patient'); //รับค่าตัวแปร patient ที่ส่งมาจากหน้า note
  // console.log("patientpatient",this.patient.note.address);
    this.first_name = this.patient.note.firstName;
    this.last_name = this.patient.note.lastName;
    this.date_of_birth = this.patient.note.dateOfBirth;
    this.age_ = this.patient.note.age;
    this.blood_type = this.patient.note.bloodType;
    this.medical_problems = this.patient.note.medicalProblems;
    this.risk_type = this.patient.note.riskType;
    this.address_ = this.patient.note.address;
    this.tel_number = this.patient.note.tel;
    this.patient_id_ = this.patient.note.patient_id;
    this.identification_number_ = this.patient.note.identification_number;
    this.sex_ = this.patient.note.sex;

//---------------------   google map   ------------------------//
    this.geolocation.getCurrentPosition().then(position =>{
    this.latitude = position.coords.latitude;
    this.longitude = position.coords.longitude;
//---------------------   google map   ------------------------//
  },error=>{
    console.log('error',error);
  });
}



//---------------------   google map   ------------------------//
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
//--------------------- end  google map   ------------------------//


  goToResult() {
    this.storage.set('patient_id_',this.patient_id_);

    this.navCtrl.push(ResultPage);
    }



}

