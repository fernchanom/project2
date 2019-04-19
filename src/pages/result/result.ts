import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
// import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { DetailcheckupPage } from '../detailcheckup/detailcheckup';

import firebase from 'firebase';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs';
// import { AngularFireAction } from '@angular/fire/database';

// @IonicPage()
@Component({
  selector: 'page-result',
  templateUrl: 'result.html',
})
export class ResultPage {
  itemsRef: AngularFireList < any > ;
  items: Observable < any[] > ;
  key: string;
  datecheckup: string;
  sick: string;
  nextdate_checkup: string;
  patient_id_: string;
  Medical = [];

  isToogle: boolean = false;

  constructor(private af: AngularFireDatabase, public navCtrl: NavController, public navParams: NavParams, public storage: Storage) {}

  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad');
  //   this.storage.get('patient_id_').then(val => {
  //     this.patient_id_ = val;
  //     console.log('patient_id_: ', val);
  //   });
  //   this.showData();
  // }

  ionViewWillEnter() {
    console.log('ionViewWillEnter');
    this.storage.get('patient_id_').then(val => {
      this.patient_id_ = val;
      console.log('patient_id_: ', val);
    });
    this.showData();
  }

  //แสดงข้อมูลทั้งหมดจากฐานข้อมูล
  showData() {
    this.itemsRef = this.af.list('/Medicalcheckup');

    // Use snapshotChanges().map() to store the key
    this.items = this.itemsRef.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });

  }

  //กําหนดค่าให้กับ input และเก็บ key
  select(item) {
    console.log('Item:', item);
    this.datecheckup      = item.datecheckup;
    this.sick             = item.sick;
    this.nextdate_checkup = item.nextdate_checkup;
    this.patient_id_      = item.patient_id_;
    this.key              = item.key;
  }

  //บันทึกข้อมูล
  async save(result: any) {
    await this.storage.get('patient_id_').then(val => {
      result.patient_key = val;
    });
    console.log('result', result);
    this.itemsRef.push(result);
    this.isToogle = false;
  }

  //อัปเดตข้อมูลตาม key ที่ส่งมา
  async update(result: any) {
    if (this.key) {
      await this.storage.get('patient_id_').then(val => {
        result.patient_key = val;
      });
      this.itemsRef.update(this.key, result);
      this.isToogle = false;
    }
  }


  //ลบข้อมูลตาม key ที่เลือก
  delete(item: any) {
    this.itemsRef.remove(item.key);
    this.isToogle = false;
    this.showData();
  }

  //เป็น method ที่มีไว้ซ่อนหรือแสดงฟอร์ม
  openFormResult() {
    this.datecheckup      = null;
    this.sick             = null;
    this.nextdate_checkup = null;
    this.isToogle = !this.isToogle;
  }


  //แสดงผลการตรวจคนไข้
  async goToDetailcheckup() {
    // firstName = firstName;
    await this.storage.set('datecheckup', this.datecheckup);
    await this.storage.set('sick', this.sick);
    await this.storage.set('nextdate_checkup', this.nextdate_checkup);

    this.navCtrl.push(DetailcheckupPage);
  }

} //end export class
