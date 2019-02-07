import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { DetailpatientPage } from '../detailpatient/detailpatient';
import { Storage } from '@ionic/storage';


import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';




@Component({
  selector: 'page-note',
  templateUrl: 'note.html'
 })

 export class NotePage {
    itemsRef: AngularFireList<any>;
    items: Observable<any[]>;
    key:string;
    firstName:string;
    lastName:string;
    sex:string;
    dateOfBirth:string;
    age:string;
    bloodType:string;
    medicalProblems:string;
    riskType:string;
    address:string;
    tel:string;
    patient_id:string;
    identification_number:string;

    isToogle:boolean = false;

  constructor(
    private af: AngularFireDatabase,
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage)
    {
           
              
    }
  ionViewWillEnter() {
    this.showData();
  }



 //แสดงข้อมูลทั้งหมดจากฐานข้อมูล
  showData() {
    this.itemsRef = this.af.list('/');
    // Use snapshotChanges().map() to store the key
    this.items = this.itemsRef.snapshotChanges().map(changes => {
      console.log(changes)
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
    //console.log(blog);
    this.itemsRef.push({note});
    this.isToogle = false;
}


//อัปเดตข้อมูลตาม key ที่ส่งมา
update(note: any) {
  if (this.key) {
    this.itemsRef.update(this.key, {note});
    this.isToogle = false;
  }
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
}



  //แสดงข้อมูลคนไข้
  goToDetailpatient() {
    // firstName = firstName;
    this.storage.set('firstName', this.firstName);
    this.storage.set('lastName', this.lastName);
    this.storage.set('dateOfBirth', this.dateOfBirth);
    this.storage.set('age', this.age);
    this.storage.set('bloodType', this.bloodType);
    this.storage.set('medicalProblems', this.medicalProblems);
    this.storage.set('riskType', this.riskType);
    this.storage.set('address', this.address);
    this.storage.set('tel', this.tel);
    this.storage.set('patient_id', this.patient_id);
    this.storage.set('identification_number', this.identification_number);
    //radio
    this.storage.set('sex', this.sex);
  //   storage.get('name').then((val) => {
  //   console.log('Your age is', val);
  // });


    this.navCtrl.push(DetailpatientPage,{
      companyName: 'aaaaaaaaaaa',
      companyWebsite: 'bbbbbbbbbbb'
      }
      );
    }


}//end export class
