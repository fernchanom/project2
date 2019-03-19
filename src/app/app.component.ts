import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
//import { Component } from '@angular/core';


////////// เพิ่มใน รายการ sidebar
import { HomePage } from '../pages/home/home';
//import { ListPage } from '../pages/list/list';
//import { AddpatientPage } from '../pages/addpatient/addpatient';
import { SearchpatientPage } from '../pages/searchpatient/searchpatient';
import { TypeofpatientPage } from '../pages/typeofpatient/typeofpatient';
import { TodayPage } from '../pages/today/today';
import { NextdayPage } from '../pages/nextday/nextday';
import { SignoutPage } from '../pages/signout/signout';
import { NotePage } from '../pages/note/note';
//import { MapPage } from '../pages/map/map';
import { MappatientPage } from '../pages/mappatient/mappatient';
import { PatientPage } from '../pages/patient/patient';
import { GeolocationPage } from '../pages/geolocation/geolocation';
import { LoginPage } from '../pages/login/login';
import { DetailcheckupPage } from '../pages/detailcheckup/detailcheckup';
import { HightPage } from '../pages/hight/hight';






@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = NotePage;

  pages: Array<{title: string, component: any, icon: string}>;

  constructor(public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen,) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
     // { title: 'หน้าแรก', component: HomePage, icon: 'home'},
     // { title: 'List', component: ListPage },
     // { title: 'เพิ่มคนไข้', component: AddpatientPage, icon: 'person-add'},
      { title: 'เข้าสู่ระบบ', component: LoginPage, icon: 'log-in'},
      { title: 'คนไข้', component: NotePage, icon: 'man'}, 
      //{ title: 'คนไข้2', component: PatientPage, icon: 'man'},
      //{ title: 'ค้นหาคนไข้', component: SearchpatientPage, icon: 'search'},
      { title: 'ประเภทคนไข้', component: TypeofpatientPage, icon: 'people'},
      { title: 'ผลการตรวจประจำวัน', component: TodayPage, icon: 'paper'},
      { title: 'การตรวจครั้งถัดไป', component: NextdayPage, icon: 'clipboard'},
      
//      { title: 'แผนที่', component: MapPage, icon: 'navigate'},
      { title: 'แผนที่', component: MappatientPage, icon: 'navigate'},
      { title: 'แผนที่2', component: GeolocationPage, icon: 'navigate'},
      { title: 'ออกจากระบบ', component: SignoutPage, icon: 'log-out'},



    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

 



}
