import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase';
import { DetailpatientPage } from '../detailpatient/detailpatient';

/**
 * Generated class for the MediumPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-medium',
  templateUrl: 'medium.html',
})
export class MediumPage {
  patient = [];
  key: string = null;
  firstName: string = null;
  lastName: string = null;
  sex: string = null;
  dateOfBirth: string = null;
  age: string = null;
  bloodType: string = null;
  medicalProblems: string = null;
  riskType: string = null;
  address: string = null;
  tel: string = null;
  patient_id: string = null;
  identification_number: string = null;
  captureDataUrl: string = null;
  data = {
    firstName: null,
    lastName: null,
    sex: null,
    dateOfBirth: null,
    age: null,
    bloodType: null,
    medicalProblems: null,
    riskType: null,
    address: null,
    tel: null,
    patient_id: null,
    identification_number: null,
    urlImg: null
  };

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    const requestRef = firebase.database().ref('/Patient/');

    // ดึงข้อมูลคนไข้ที่มีความเสี่ยงปานกลาง
    requestRef.orderByChild('riskType')
      .equalTo('ปานกลาง')
      .once('value')
      .then(snapshot => snapshot.val())
      .then((data) => {
        
        // แปลงค่าจาก object to array
        this.patient = Object.keys(data).map(function(index) {
          console.log("index:", index);
          data[index].key = index
          return data[index];
        });
        console.log("patient:", this.patient);
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

  //แสดงข้อมูลคนไข้
  goToDetailpatient(key, patient) {
    // console.log("patient: ",patient);
    this.navCtrl.push(DetailpatientPage, { key: key, patient: patient }); //ไปหน้า Detailpatient พร้อมส่งค่าตัวแปร key & patient
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MediumPage');
  }

}
