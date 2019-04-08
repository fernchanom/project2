import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Item } from 'ionic-angular';

import { DetailpatientPage } from '../detailpatient/detailpatient';
import { Storage } from '@ionic/storage';


import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
// import { AngularFireStorage } from 'angularfire2/storage';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { AlertController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import firebase from 'firebase';



@Component({
  selector: 'page-note',
  templateUrl: 'note.html'
 })

 export class NotePage {
    itemsRef: AngularFireList<any>;
    items: Observable<any[]>;
    key:string = null;
    firstName:string = null;
    lastName:string = null;
    sex:string = null;
    dateOfBirth:string = null;
    age:string = null;
    bloodType:string = null;
    medicalProblems:string = null;
    riskType:string = null;
    address:string = null;
    tel:string = null;
    patient_id:string = null;
    identification_number:string = null;
    captureDataUrl: string = null;

    //-----------search-----------//
    // searchQuery:string;
    

    isToogle:boolean = false;
    topics: string[];
    patient = [];
    searchInput:boolean = false;
    urlImg;

  constructor(
    private af: AngularFireDatabase,
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    // private afStorage: AngularFireStorage,
    private alertCtrl: AlertController,
    private camera: Camera)
    {
      //  this.initializeItems();    
    }
  ionViewWillEnter() {
    this.showData();
  }

  //แสดงข้อมูลทั้งหมดจากฐานข้อมูล
  showData() {
    this.itemsRef = this.af.list('/Patient/');
    // Use snapshotChanges().map() to store the key
    this.items = this.itemsRef.snapshotChanges().map(changes => {
      console.log(changes)
      this.patient = changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
  }

  //กําหนดค่าให้กับ input และเก็บ key 
  select(item) {
    //console.log(item);
    this.firstName = item.note.firstName;
    this.lastName = item.note.lastName;
    this.sex = item.note.sex;
    this.dateOfBirth = item.note.dateOfBirth;
    this.age = item.note.age;
    this.bloodType = item.note.bloodType;
    this.medicalProblems = item.note.medicalProblems;
    this.riskType = item.note.riskType;
    this.address = item.note.address;
    this.tel = item.note.tel;
    this.patient_id = item.note.patient_id;
    this.identification_number = item.note.identification_number;
    this.key = item.key;

  }

  //บันทึกข้อมูล
  save(note: any) {
    this.uploadImg().then(urlImg => {
      // console.log('this.urlImg1:',urlImg);
      if (urlImg) {
        note.urlImg = urlImg;
        // console.log('note:',note);
        this.itemsRef.push({note});
        this.isToogle = false;
        this.uploadAlert();

        // clear input
        this.firstName = null;
        this.lastName = null;
        this.sex = null;
        this.dateOfBirth = null;
        this.age = null;
        this.bloodType = null;
        this.medicalProblems = null;
        this.riskType = null;
        this.address = null;
        this.tel = null;
        this.patient_id = null;
        this.identification_number = null;
        this.key = null;
      }
    });
  }

  //ลบข้อมูลตาม key ที่เลือก
  delete(item:any) {
    this.itemsRef.remove(item.key);
    this.isToogle = false;
  }

 /*deleteAll() { //ลบทั้งหมด
 this.items.remove();
 this.isToogle = false;
 }*/

  //เป็น method ที่มีไว้ซ่อนหรือแสดงฟอร์ม
  openForm() {
    this.isToogle = !this.isToogle;

    // clear input
    this.firstName = null;
    this.lastName = null;
    this.sex = null;
    this.dateOfBirth = null;
    this.age = null;
    this.bloodType = null;
    this.medicalProblems = null;
    this.riskType = null;
    this.address = null;
    this.tel = null;
    this.patient_id = null;
    this.identification_number = null;
    this.key = null;
  }

  //แสดงข้อมูลคนไข้
  goToDetailpatient(key,patient) {
    // console.log("patient: ",patient);
    this.navCtrl.push(DetailpatientPage,{key: key, patient: patient}); //ไปหน้า Detailpatient พร้อมส่งค่าตัวแปร key & patient
  }

  //-----------search-----------//   
  search(ev: any) {
    // this.generateTopics();
    this.topics = this.patient;
    this.searchInput = true;
    let serVal = ev.target.value;
    if (serVal && serVal.trim() != '') {
        this.topics = this.patient.filter((topic) => {
          // console.log(topic);
          if ((topic.note.firstName.toLowerCase().indexOf(serVal.toLowerCase()) > -1) || (topic.note.patient_id.toLowerCase().indexOf(serVal.toLowerCase()) > -1)) {
            return topic.note;
          }
        })
    }
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

      // สร้างชื่อรูปเป็นวันที่
      const filename = Math.floor(Date.now() / 1000);

      // อ้างอิงรูปไปเก็บที่ firebase folder images
      const imageRef = storageRef.child(`images/${filename}.jpg`);

      // function imageRef.putString() ใช้ในการอัพโหลรูปไปที่ firebase
      imageRef.putString(this.captureDataUrl, firebase.storage.StringFormat.DATA_URL)
        .then((snapshot)=> {
              resolve (imageRef.getDownloadURL()); // return ค่า url images
              // console.log("DATA_URL:",imageRef.getDownloadURL());
      });
    });

    
  }

  uploadAlert() {
    let alert = this.alertCtrl.create({
      title: 'Success',
      subTitle: 'Add Patient Success',
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

}//end export class
