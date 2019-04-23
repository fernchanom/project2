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
import { LoadingController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-detailpatient',
  templateUrl: 'detailpatient.html',
})
export class DetailpatientPage {
  //geo
  latitude:number ;
  longitude:number ;
  data = {
    firstName : null,
    lastName : null,
    sex : null,
    dateOfBirth : null,
    age : null,
    bloodType : null,
    medicalProblems : null,
    riskType : null,
    latitude : null,
    longitude : null,
    address : null,
    tel : null,
    patient_id : null,
    identification_number : null,
    urlImg : null
  };

  patient:any;
  itemsRef: AngularFireList<any>;
  key:string;
  isToogle:boolean = false;
  captureDataUrl: string = null;
  destination:any = null;
  loading:any;
  checked:any = false;
  cur_address:boolean = false;


  constructor(private af: AngularFireDatabase,
    public navCtrl: NavController,
    public navParams: NavParams,
    public geolocation: Geolocation,
    private launchNavigator:LaunchNavigator,
    private platform: Platform,
    public storage: Storage,
    public alertCtrl: AlertController,
    private camera: Camera,
    public loadingCtrl: LoadingController) {
  }

  ionViewWillEnter(){
  }

  ionViewDidLoad() {
    this.patient = this.navParams.get('patient'); //รับค่าตัวแปร patient ที่ส่งมาจากหน้า note
    this.key = this.navParams.get('key'); //รับค่าตัวแปร key ที่ส่งมาจากหน้า note
    console.log("key",this.key);
    console.log("patientpatient",this.patient.firstName);

    // เช็ค่า latitude & longitude ของคนไข้ ถ้ามีเก็บให้ค่า this.checked = true เพื่อให้ checkbox ติ๊กถูกไว้ และไม่แสดง textbox ของที่อยู่ 
    if (this.patient.latitude && this.patient.longitude) {
      this.checked = true;
      this.cur_address = true;
    }

    // set ค่าให้ตัวแปร this.data
    this.data = {
      firstName             : this.patient.firstName,
      lastName              : this.patient.lastName,
      sex                   : this.patient.sex,
      dateOfBirth           : this.patient.dateOfBirth,
      age                   : this.patient.age,
      bloodType             : this.patient.bloodType,
      medicalProblems       : this.patient.medicalProblems,
      riskType              : this.patient.riskType,
      latitude              : this.patient.latitude,
      longitude             : this.patient.longitude,
      address               : this.patient.address,
      tel                   : this.patient.tel,
      patient_id            : this.patient.patient_id,
      identification_number : this.patient.identification_number,
      urlImg                : this.patient.urlImg
    };

    //---------------------   google map   ------------------------//
    this.geolocation.getCurrentPosition().then(position =>{
      this.latitude = position.coords.latitude;
      this.longitude = position.coords.longitude;
    //---------------------   google map   ------------------------//
    },error=>{
      console.log('error',error);
    });
  }



  //---------------------   navigate   ------------------------//
  navigateLocation(){
    let options: LaunchNavigatorOptions = {
      start:[this.latitude,this.longitude],
      app: this.launchNavigator.APP.GOOGLE_MAPS
    };

    if (this.patient.latitude && this.patient.longitude) {
    // ถ้ามีค่า latitude & longitude ให้เอาค่า latitude & longitude ไปใช้นำทาง
      this.destination = [this.patient.latitude, this.patient.longitude];
    } else {
    // ถ้าไม่มีค่า latitude & longitude ให้เอาค่า adddress ไปใช้นำทาง
      this.destination = this.patient.address;
    }
      
    this.launchNavigator.navigate(this.destination, options)
    .then(success =>{
      console.log(success);
    },error=>{
      console.log(error);
    })

  }
  //--------------------- end  navigate   ------------------------//

  async goToResult() {
    await this.storage.set('patient_id_',this.key).then(val => {
      console.log('session: ', val);
      this.navCtrl.push(ResultPage);
    });
  }

  editPatient() {
    this.isToogle = true;
  }

  //อัปเดตข้อมูลตาม key ที่ส่งมา
  update() {

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

    // สร้าง loading
    this.loading = this.loadingCtrl.create({content : "Please wait..."});

    // สั่ง loading ให้แสดง
    this.loading.present();

    // เช็คว่ามีการเลือกรูปมั้ย
    if (!this.captureDataUrl) {
    // ถ้าไม่มีการเลือกรูป ให้ update ค่าที่ Firebase Database
        setTimeout(() =>{ // setTimeout คือการสั่งให้รอเวลา 3 วินาที
          this.af.list('/Patient').update(this.key, this.data);
          this.uploadAlert();
        },3000);
    }else{
    // ถ้ามีการเลือกรูป ให้ set ค่่าตัวแปร this.data.urlImg = ค่า path ที่เก็บรูปบน Firebase storage แล้วบันทึกค่าที่ Firebase Database
      this.uploadImg().then(urlImg => {
        if (this.key && urlImg) {
          this.data.urlImg = urlImg;
          this.af.list('/Patient').update(this.key, this.data);
          this.uploadAlert();
        }
      });
    }
  }

  getPicture(sourceType){
    // set option ในการใช้รูป
    const cameraOptions: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: sourceType
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
      const imageRef = storageRef.child(`${filename}.jpg`);

      // function imageRef.putString() ใช้ในการอัพโหลรูปไปที่ Firebase
      imageRef.putString(this.captureDataUrl, firebase.storage.StringFormat.DATA_URL)
        .then((snapshot)=> {
              resolve (imageRef.getDownloadURL());
      });
    });
  }

  uploadAlert() {
    // สั่งปิด loading
    this.loading.dismiss();

    // สร้าง alert
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

    // สั่งแสดง alert
    alert.present();

    // clear ค่าตัวแปร this.captureDataUrl หลังจากกดอัพเดท
    this.captureDataUrl = "";
  }

  click_cur_address () {
    this.cur_address = !this.cur_address;
  } 

}

