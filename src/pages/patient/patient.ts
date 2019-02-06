import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController } from 'ionic-angular';


/**
 * Generated class for the PatientPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-patient',
  templateUrl: 'patient.html',
})

export class PatientPage {
 
  patients = [];
 
  constructor(public navCtrl: NavController, private modalCtrl: ModalController) {
  }

  openaddpatient(){
    let modal = this.modalCtrl.create('AddpatientPage');
    modal.present();
 
    modal.onDidDismiss(data => {
      if(!data.isCancel) {
        this.patients.push(data.data);
      } 
    });
  }
 
}
