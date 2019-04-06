import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Item } from 'ionic-angular';

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

    //-----------search-----------//
    // searchQuery:string;
    

    isToogle:boolean = false;
    patient = [];
    searchInput:boolean = false;

  constructor(
    private af: AngularFireDatabase,
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage)
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
    this.navCtrl.push(DetailpatientPage);
    }

    
    //-----------search-----------//
    topics: string[];
 
  // generateTopics() {
  //   this.topics = this.patient;
  //   // this.topics = [
  //     // 'AAA',
  //     // '111',
  //     // 'กกก',
  //     //item.note.firstName
  //   // ];
  // }
   
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


    //-----------search-----------//
    // initializeItems() {
    //   this.items = [
        
    //   ];
    // }

    // getItems(ev: any) {
    //   this.initializeItems();

    //   let val = ev.target.value;

    //   if(val && val.trim() != '') {
    //     this.items = this.items.filter((item) => {
    //       return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
    //     })
    //   }
    // }


}//end export class
