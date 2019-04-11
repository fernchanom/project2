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
import { Geolocation } from '@ionic-native/geolocation';



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
    data = {
      firstName : null,
      lastName : null,
      sex : null,
      dateOfBirth : null,
      age : null,
      bloodType : null,
      medicalProblems : null,
      riskType : null,
      address : null,
      latitude : null,
      longitude : null,
      tel : null,
      patient_id : null,
      identification_number : null,
      urlImg : null
    };

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
    private camera: Camera,
    private geolocation: Geolocation)
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
      console.log(this.patient);
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
  }

  //กําหนดค่าให้กับ input และเก็บ key 
  select(item) {
    //console.log(item);
    this.firstName = item.firstName;
    this.lastName = item.lastName;
    this.sex = item.sex;
    this.dateOfBirth = item.dateOfBirth;
    this.age = item.age;
    this.bloodType = item.bloodType;
    this.medicalProblems = item.medicalProblems;
    this.riskType = item.riskType;
    this.address = item.address;
    this.tel = item.tel;
    this.patient_id = item.patient_id;
    this.identification_number = item.identification_number;
    this.key = item.key;

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

    this.geolocation.getCurrentPosition().then((resp) => {
     console.log("lat long:", resp.coords.latitude, " : ", resp.coords.longitude);
     this.data.latitude = resp.coords.latitude;
     this.data.longitude = resp.coords.longitude;
    }).catch((error) => {
      console.log('Error getting location', error);
    });  
  }

  //บันทึกข้อมูล
  save() {
    if (!this.captureDataUrl) {
      console.log('not img');
      this.itemsRef.push(this.data);
      this.uploadAlert();
    }else {
      console.log('img');
      this.uploadImg().then(urlImg => {
        console.log('this.urlImg1:',urlImg);
        if (urlImg) {
          this.data.urlImg = urlImg;
          // console.log('this.data:',this.data);
          this.itemsRef.push(this.data);
          this.uploadAlert();
        }
      });
    }

    this.isToogle = false;
    
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

  //ลบข้อมูลตาม key ที่เลือก
  delete(item:any) {
    this.itemsRef.remove(item.key);
    this.isToogle = false;
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
          if ((topic.firstName.toLowerCase().indexOf(serVal.toLowerCase()) > -1) || (topic.patient_id.toLowerCase().indexOf(serVal.toLowerCase()) > -1)) {
            return topic;
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
              console.log("DATA_URL:",imageRef.getDownloadURL());
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
