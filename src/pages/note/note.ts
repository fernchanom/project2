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
import { LoadingController } from 'ionic-angular';



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
      cur_address : null,
      latitude : null,
      longitude : null,
      address : null,
      tel : null,
      patient_id : null,
      identification_number : null,
      urlImg : null
    };
    cur_address:boolean = false;
    //-----------search-----------//
    // searchQuery:string;
    

    isToogle:boolean = false;
    topics: string[];
    patient = [];
    searchInput:boolean = false;
    urlImg;
    loading;
  constructor(
    private af: AngularFireDatabase,
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    // private afStorage: AngularFireStorage,
    private alertCtrl: AlertController,
    private camera: Camera,
    private geolocation: Geolocation,
    public loadingCtrl: LoadingController)
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
      console.log('changes',changes)
      this.patient = changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
      console.log('this.patient',this.patient);
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
 
  }

  //บันทึกข้อมูล
  save() {

    // สร้าง loading
    this.loading = this.loadingCtrl.create({content : "Please wait..."});

    // สั่ง loading ให้แสดง
    this.loading.present();

    // เช็คว่ามีการติ๊กถูกที่ปุ่ม ใช้ตำแหน่งปัจจุบัน มั้ย
    if (this.cur_address) { 
    // ถ้ามีติ๊กถูกที่ปุ่ม ให้ดึงค่า latitude & logitude ตำแหน่งปัจจุบันมาเก็บไว้ที่ตัวแปร this.data.latitude & this.data.longitude และ set ค่าตัวแปร this.data.address = null
        this.geolocation.getCurrentPosition().then((resp) => {
          this.data.latitude = resp.coords.latitude;
          this.data.longitude = resp.coords.longitude;
          this.data.address = null;
        }).catch((error) => {
          console.log('Error getting location', error);
        }); 
    } else {
    // ถ้าไม่มีติ๊กถูกที่ปุ่ม ให้ set ค่าตัวแปร this.data.address และ set ค่า this.data.latitude & this.data.longitude = null
        this.data.latitude = null;
        this.data.longitude = null;
    }

    // เช็คว่ามีการเลือกรูปมั้ย
    if (!this.captureDataUrl) {
    // ถ้าไม่มีการเลือกรูป ให้ set ค่่าตัวแปร this.data.urlImg = null แลัวบันทึกที่ Firebase Database
      setTimeout(() =>{ // setTimeout คือการสั่งให้รอเวลา 3 วินาที
      // สั่ง setTimeout เพื่อรอให้ดึงค่า latitude & longitude ให้เสร็จก่อน
        this.data.urlImg = null;
        this.itemsRef.push(this.data);
        this.uploadAlert();
      },3000);
    }else {
    // ถ้ามีการเลือกรูป ให้ set ค่่าตัวแปร this.data.urlImg = ค่า path ที่เก็บรูปบน Firebase storage แลัวบันทึกที่ Firebase Database
      this.uploadImg().then(urlImg => {
        if (urlImg) {
          this.data.urlImg = urlImg;
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
    this.cur_address = false;
  }

  //ลบข้อมูลตาม key ที่เลือก
  delete(item:any) {
    this.itemsRef.remove(item.key);
    this.isToogle = false;
  }

  //แสดงข้อมูลคนไข้
  goToDetailpatient(key,patient) {
    this.navCtrl.push(DetailpatientPage,{key: key, patient: patient}); //ไปหน้า Detailpatient พร้อมส่งค่าตัวแปร key & patient
  }

  //-----------search-----------//   
  search(ev: any) {
    this.topics = this.patient;
    this.searchInput = true;
    let serVal = ev.target.value;
    if (serVal && serVal.trim() != '') {
        this.topics = this.patient.filter((topic) => {
          // เช็คว่าค่าที่ป้อนมา ตรงกับชื่อหรือเลขประจำตัวคนไข้มั้ย
          if ((topic.firstName.toLowerCase().indexOf(serVal.toLowerCase()) > -1) || (topic.patient_id.toLowerCase().indexOf(serVal.toLowerCase()) > -1)) {
            return topic;
          }
        })
    }
  }

  getPicture(sourceType){
    // set option ในการใช้รูป
    const cameraOptions: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: sourceType,
    };

    // เรียกใช้รูป
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

      // function imageRef.putString() ใช้ในการอัพโหลรูปไปที่ Firebase
      imageRef.putString(this.captureDataUrl, firebase.storage.StringFormat.DATA_URL)
        .then((snapshot)=> {
              resolve (imageRef.getDownloadURL()); // return ค่า path ที่เก็บรูปบน Firebase storage
      });
    });
  }

  uploadAlert() {
    // สั่งปิด loading
    this.loading.dismiss();

    // สร้าง alert
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

    // สั่งแสดง alert
    alert.present();

    // clear ค่าตัวแปร this.captureDataUrl หลังจากกดบันทึก
    this.captureDataUrl = "";
  } 

  click_cur_address () {
    this.cur_address = !this.cur_address;
  } 

}//end export class
