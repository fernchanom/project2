import { Component }                           from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DetailNextdayPage }                   from '../detailnextday/detailnextday';

/**
 * Generated class for the NextdayPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
	selector: 'page-nextday',
	templateUrl: 'nextday.html',
})
export class NextdayPage {

	constructor(public navCtrl: NavController, public navParams: NavParams) {}

	ionViewDidLoad() {
		console.log('ionViewDidLoad NextdayPage');
	}

	search(result: any) {
		console.log('result', result);
		this.navCtrl.push(DetailNextdayPage, { date: result.date}); //ไปหน้า detailnextday พร้อมส่งค่าตัวแปร date
	}


}
