import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { DetailpatientPage } from '../detailpatient/detailpatient';

import { NgZone, ElementRef, ViewChild } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Geolocation ,GeolocationOptions ,Geoposition ,PositionError } from '@ionic-native/geolocation';


declare var google;

// @IonicPage()
@Component({
  selector: 'page-nearby',
  templateUrl: 'nearby.html',
})
export class NearbyPage {
  @ViewChild('map') mapElement: ElementRef;

  map:any;
  latLng:any;
  markers:any;
  mapOptions:any;
  isKM:any=500;
  isType:any="";

  itemsRef: AngularFireList<any>;
  items: Observable<any[]>;
  topics: string[];
  searchInput:boolean = false;
  patient = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private af: AngularFireDatabase,
    private ngZone: NgZone,
    private geolocation : Geolocation) {
    this.loadMap();
  }

  loadMap(){

    this.geolocation.getCurrentPosition().then((position) => {

      this.latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

      console.log('latLng',this.latLng);

      this.mapOptions = {
        center: this.latLng,
        zoom: 14,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }

      this.map = new google.maps.Map(this.mapElement.nativeElement, this.mapOptions);

    }, (err) => {
      alert('err '+err);
    });

  }


 /*--------------------Find Nearby Place------------------------*/

  nearbyPlace(){
    this.loadMap();
    this.markers = [];
    let service = new google.maps.places.PlacesService(this.map);
    service.nearbySearch({
              location: this.latLng,
              radius: this.isKM,
              types: [this.isType]
            }, (results, status) => {
                this.callback(results, status);
            });
  }

  callback(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        this.createMarker(results[i]);
      }
    }
  }

  createMarker(place){
    var placeLoc = place;
    console.log('placeLoc',placeLoc);
    this.markers = new google.maps.Marker({
        map: this.map,
        position: place.geometry.location
    });

    let infowindow = new google.maps.InfoWindow();

    google.maps.event.addListener(this.markers, 'click', () => {
      this.ngZone.run(() => {
        infowindow.setContent(place.name);
        infowindow.open(this.map, this.markers);
      });
    });
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
        console.log('serVal::',serVal);
      this.topics = this.patient.filter((topic) => {
        console.log('topic::',topic.address);
        if (!topic.address) {
          return;
        }
        if ((topic.address.toLowerCase().indexOf(serVal.toLowerCase()) > -1)) {
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
