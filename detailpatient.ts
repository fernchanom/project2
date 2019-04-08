import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Geolocation } from '@ionic-native/geolocation';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';
import { Platform } from 'ionic-angular';

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { AlertController } from 'ionic-angular';
import { NotePage } from '../note/note';

// import { AngularFiredatabase, FirebaseListObservable } from ‘angularfire2/database’; //show data in firebase

import { ResultPage } from '../result/result';
import { Camera, CameraOptions } from '@ionic-native/camera';
import firebase from 'firebase';


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
  firstName:string;
  lastName:string;
  dateOfBirth:string;
  age:string;
  bloodType:string;
  medicalProblems:string;
  riskType:string;
  address:string;
  tel:string;
  patient_id:string;
  identification_number:string;
  sex:string;
  urlImg:string;

  patient:any;
  itemsRef: AngularFireList<any>;
  key:string;
  isToogle:boolean = false;
  captureDataUrl: string = null;
 
 
  constructor(private af: AngularFireDatabase,
    public navCtrl: NavController, 
    public navParams: NavParams,
    public geolocation: Geolocation, 
    private launchNavigator:LaunchNavigator, 
    private platform: Platform,
    public storage: Storage,
    public alertCtrl: AlertController,
    private camera: Camera) {
  }

  ionViewWillEnter(){
  }

  ionViewDidLoad() {
    this.patient = this.navParams.get('patient'); //รับค่าตัวแปร patient ที่ส่งมาจากหน้า note
    this.key = this.navParams.get('key'); //รับค่าตัวแปร key ที่ส่งมาจากหน้า note
    // console.log("key",this.key);
    console.log("patientpatient",this.patient.note);
    this.firstName = this.patient.note.firstName;
    this.lastName = this.patient.note.lastName;
    this.dateOfBirth = this.patient.note.dateOfBirth;
    this.age = this.patient.note.age;
    this.bloodType = this.patient.note.bloodType;
    this.medicalProblems = this.patient.note.medicalProblems;
    this.riskType = this.patient.note.riskType;
    this.address = this.patient.note.address;
    this.tel = this.patient.note.tel;
    this.patient_id = this.patient.note.patient_id;
    this.identification_number = this.patient.note.identification_number;
    this.sex = this.patient.note.sex;
    this.urlImg = this.patient.note.urlImg;

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
    this.launchNavigator.navigate(this.address+', ON', options)
    // this.launchNavigator.navigate('Robinson Sriracha, ON', options)
    .then(success =>{
      console.log(success);
    },error=>{
      console.log(error);
    })

  }
  //--------------------- end  google map   ------------------------//

  goToResult() {
    this.storage.set('patient_id_',this.patient_id);

    this.navCtrl.push(ResultPage);
  }

  editPatient() {
    this.isToogle = true;
  }

  //อัปเดตข้อมูลตาม key ที่ส่งมา
  update(note: any) {
    // console.log("note:", note);
    // console.log("key:", this.key);
    this.uploadImg().then(urlImg => {
      if (this.key && urlImg) {
        note.urlImg = urlImg;
        this.af.list('/Patient').update(this.key, { note });
        this.uploadAlert();
      }
    });
  }

  getPicture(sourceType){
    const cameraOptions: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: sourceType,

    };

    this.camera.getPicture(cameraOptions)
     .then((captureDataUrl) => {
       this.captureDataUrl = 'data:image/jpeg;base64,' + captureDataUrl;
    }, (err) => {
        console.log(err);
    });
  }

  uploadImg() {
    return new Promise<any>(resolve => {
      let storageRef = firebase.storage().ref();

      const filename = Math.floor(Date.now() / 1000);

      const imageRef = storageRef.child(`${filename}.jpg`);

      imageRef.putString(this.captureDataUrl, firebase.storage.StringFormat.DATA_URL)
        .then((snapshot)=> {
              resolve (imageRef.getDownloadURL());
          console.log("DATA_URL:",imageRef.getDownloadURL());
      });
    });    
  }

  uploadAlert() {
    let alert = this.alertCtrl.create({
      title: 'Update',
      subTitle: 'Update Patient Success',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.navCtrl.push(NotePage);
          }
        }
      ]
    });
    alert.present();
    // clear the previous photo data in the variable
    this.captureDataUrl = "";
  }  

}
