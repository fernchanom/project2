import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
declare var google;

/**
 * Generated class for the MappatientPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mappatient',
  templateUrl: 'mappatient.html',
})
export class MappatientPage {
  Destination: any = '';
  MyLocation: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MappatientPage');
  }


  calculateAndDisplayRoute() {
    let that = this;
    let directionsService = new google.maps.DirectionsService;
    let directionsDisplay = new google.maps.DirectionsRenderer;
    const map = new google.maps.Map(document.getElementById('map'), {
      zoom: 7,
      center: {lat: 41.85, lng: -87.65}
    });
    directionsDisplay.setMap(map);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };           
        map.setCenter(pos);
        that.MyLocation = new google.maps.LatLng(pos);
        

      }, function() {

      });
    } else {
      // Browser doesn't support Geolocation

    }

directionsService.route({
  origin: this.MyLocation,
  destination: this.Destination,
  travelMode: 'DRIVING'
}, function(response, status) {
  if (status === 'OK') {
    directionsDisplay.setDirections(response);
  } else {
    window.alert('Directions request failed due to ' + status);
  }
});
}

}

