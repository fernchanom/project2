import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DetailTodayPage }                   from '../detailtoday/detailtoday';

/**
 * Generated class for the TodayPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-today',
  templateUrl: 'today.html',
})
export class TodayPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TodayPage');
  }

  search(result: any) {
		console.log('result', result);
		this.navCtrl.push(DetailTodayPage, { date: result.date}); //ไปหน้า detailtoday พร้อมส่งค่าตัวแปร date
	}

}
