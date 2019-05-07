import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { DetailpatientPage } from '../detailpatient/detailpatient';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';
import firebase from 'firebase';

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
  locations = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private af: AngularFireDatabase,
    private ngZone: NgZone,
    private geolocation : Geolocation) {
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


      console.log('elemant: ', this.mapElement.nativeElement);
      this.map = new google.maps.Map(this.mapElement.nativeElement, this.mapOptions);

      console.log('location', this.locations);

      var infowindow = new google.maps.InfoWindow();

      var marker, i;
      var locations = this.locations;

      for (i = 0; i < locations.length; i++) {
        marker = new google.maps.Marker({
          position: new google.maps.LatLng(locations[i][1], locations[i][2]),
          map: this.map
        });

        // google.maps.event.addListener(marker, 'click', (function(marker, i) {
        google.maps.event.addListener(marker, 'click', ((marker, i) => {
          return function() {
            console.log('click map', locations);
            infowindow.setContent(locations[i][0]);
            infowindow.open(this.map, marker);
            // this.navCtrl.push(DetailpatientPage); //ไปหน้า Detailpatient พร้อมส่งค่าตัวแปร key & patient
          }
        })(marker, i));
      }

    }, (err) => {
      alert('err '+err);
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NearPage');
    this.showData();
    this.loadMap();

  }

  ionViewWillEnter() {
  }

  //แสดงข้อมูลทั้งหมดจากฐานข้อมูล
  showData() {

    const itemsRef: firebase.database.Reference = firebase.database().ref("/Patient");
    itemsRef.on('value', personSnapshot => {
      this.patient = personSnapshot.val();
    });

    Object.keys(this.patient).forEach(key => {
      this.locations.push([this.patient[key].firstName + ' ' + this.patient[key].lastName, this.patient[key].latitude, this.patient[key].longitude]);
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
