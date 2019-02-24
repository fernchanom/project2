import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { DetailcheckupPage } from '../detailcheckup/detailcheckup';

import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-result',
  templateUrl: 'result.html',
})
export class ResultPage {
  itemsRef: AngularFireList<any>;
  items: Observable<any[]>;
  key:string;
  datecheckup:string;
  sick:string;
  nextdate_checkup:string;


  isToogle:boolean = false;

 constructor(private af: AngularFireDatabase,
              public navCtrl: NavController,
              public navParams: NavParams,
              public storage: Storage) {
                
              }
  ionViewWillEnter() {
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
  //console.log(item);
  this.datecheckup = item.result.datecheckup;
  this.sick = item.result.sick;
  this.nextdate_checkup = item.result.nextdate_checkup;

  this.key = item.key;
}

//บันทึกข้อมูล
save(result: any) {
  //console.log(blog);
  this.itemsRef.push({result});
  this.isToogle = false;
}

//อัปเดตข้อมูลตาม key ที่ส่งมา
update(result: any) {
  if (this.key) {
    this.itemsRef.update(this.key, {result});
    this.isToogle = false;
  }
}


 //ลบข้อมูลตาม key ที่เลือก
 delete(item:any) {
  this.itemsRef.remove(item.key);
  this.isToogle = false;
}

 //เป็น method ที่มีไว้ซ่อนหรือแสดงฟอร์ม
 openFormResult() {
  this.isToogle = !this.isToogle;
}

goToDetailcheckup() {
  this.navCtrl.push(DetailcheckupPage);
  }

//แสดงข้อมูลคนไข้
goToDetailpatient() {
  // firstName = firstName;
  this.storage.set('datecheckup', this.datecheckup);
  this.storage.set('sick', this.sick);
  this.storage.set('nextdate_checkup', this.nextdate_checkup);
  
  this.navCtrl.push(DetailpatientPage);
  }

}
