import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { DetailpatientPage } from '../detailpatient/detailpatient';




// @IonicPage()
@Component({
  selector: 'page-near',
  templateUrl: 'near.html',
})
export class NearPage {

	itemsRef: AngularFireList<any>;
	items: Observable<any[]>;
	topics: string[];
	searchInput:boolean = false;
	patient = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private af: AngularFireDatabase,) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NearPage');
    this.showData();
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter NearPage');
    this.showData();
  }

  //แสดงข้อมูลทั้งหมดจากฐานข้อมูล
  showData() {
    this.itemsRef = this.af.list('/Patient/');
    // Use snapshotChanges().map() to store the key
    this.items = this.itemsRef.snapshotChanges().map(changes => {
      this.patient = changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
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
        if ((topic.address.toLowerCase().indexOf(serVal.toLowerCase()) > -1) || (topic.patient_id.toLowerCase().indexOf(serVal.toLowerCase()) > -1)) {
          return topic;
        }
      })
    }
    console.log('search: ', this.topics);
  }

  //ลบข้อมูลตาม key ที่เลือก
  delete(item:any) {
    this.itemsRef.remove(item.key);
  }

}
