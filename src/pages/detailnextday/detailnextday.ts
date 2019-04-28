import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase';
import { DetailpatientPage } from '../detailpatient/detailpatient';

/**
 * Generated class for the DetailNextdayPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detailnextday',
  templateUrl: 'detailnextday.html',
})
export class DetailNextdayPage {
	date = null;
  patient_keys = [];
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
  	this.date = this.navParams.get('date');


    // query ข้อมูล Medicalcheckup จาก nextdate_checkup
    const MedicalRef = firebase.database().ref('/Medicalcheckup/');
    MedicalRef
      .orderByChild('nextdate_checkup')
      .equalTo(this.date)
      .once('value')
      .then(snapshot => snapshot.val())
      .then((data) => {
        if (data) {
          const patientIDs = Object.keys(data).map(function(index) {
            console.log('data[index]', data[index]);
            return data[index].patient_key;
          });

            // query ข้อมูล Patient ที่มี PatientID ตรงกัน
            const requestRef = firebase.database().ref('/Patient/');
            requestRef
              .once('value')
              .then(snapshot => snapshot.val())
              .then((data) => {
                this.patient = Object.keys(data).map(function(index) {
                  // console.log("index:", index);
                  console.log('data: ', patientIDs);
                  if (patientIDs.find(arr=>arr==index)) {
                    data[index].key = index
                    return data[index];
                  }
                }).filter(arr=>arr);
                console.log("patient:", this.patient);
              });
        } else {
          this.patient = [];
        }

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
  }

}
