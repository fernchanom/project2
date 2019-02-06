import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';
import { Platform } from 'ionic-angular';



@IonicPage()
@Component({
  selector: 'page-geolocation',
  templateUrl: 'geolocation.html',
})
export class GeolocationPage {
  latitude:number ;
  longitude:number ;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public geolocation: Geolocation, private launchNavigator:LaunchNavigator, private platform: Platform) {
  }

  ionViewDidLoad() {
      this.geolocation.getCurrentPosition().then(position =>{
      this.latitude = position.coords.latitude;
      this.longitude = position.coords.longitude;
    },error=>{
      console.log('error',error);
    });
  }

  navigateLocation(){
    let options: LaunchNavigatorOptions = {
      start:[this.latitude,this.longitude],
      app: this.launchNavigator.APP.GOOGLE_MAPS
    };
    this.launchNavigator.navigate('Robinson Sriracha, ON', options)
    .then(success =>{
      console.log(success);
    },error=>{
      console.log(error);
    })
  
  }
}









