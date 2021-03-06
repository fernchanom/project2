import { Component, ViewChild } from '@angular/core';
import { Nav, Platform }        from 'ionic-angular';
import { StatusBar }            from '@ionic-native/status-bar';
import { SplashScreen }         from '@ionic-native/splash-screen';
import { Storage }              from '@ionic/storage';
//import { Component }          from '@angular/core';


////////// เพิ่มใน รายการ sidebar
import { HomePage }             from '../pages/home/home';
//import { ListPage }           from '../pages/list/list';
import { SearchpatientPage }    from '../pages/searchpatient/searchpatient';
import { TypeofpatientPage }    from '../pages/typeofpatient/typeofpatient';
import { TodayPage }            from '../pages/today/today';
import { NextdayPage }          from '../pages/nextday/nextday';
import { SignoutPage }          from '../pages/signout/signout';
import { NotePage }             from '../pages/note/note';
//import { MapPage }            from '../pages/map/map';
import { PatientPage }          from '../pages/patient/patient';
import { GeolocationPage }      from '../pages/geolocation/geolocation';
import { LoginPage }            from '../pages/login/login';
import { DetailcheckupPage }    from '../pages/detailcheckup/detailcheckup';
import { HightPage }            from '../pages/hight/hight';
import { SettingPage }          from '../pages/setting/setting';
import { UserCreatePage }       from '../pages/userCreate/userCreate';
import { NearPage }             from '../pages/near/near';
import { NearbyPage }             from '../pages/nearby/nearby';






@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;

  pages: Array<{title: string, component: any, icon: string}>;

  constructor(public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public storage: Storage) {
    this.initializeApp();


    // ตรวจสอบการ login
    this.storage.get('user_id').then((val) => {

      console.log('val',val);
      if(val) { // login แล้ว
        this.rootPage = NotePage;
      }else{ // ยังไม่ได้ login
        console.log('no login');
        // this.nav.setRoot(LoginPage);
        this.rootPage = LoginPage;
      }
    });


    // used for an example of ngFor and navigation
    this.pages = [
     // { title: 'หน้าแรก', component: HomePage, icon: 'home'},
     // { title: 'List', component: ListPage },
      // { title: 'เข้าสู่ระบบ', component: LoginPage, icon: 'log-in'},
      { title: 'คนไข้', component: NotePage, icon: 'man'},
      //{ title: 'คนไข้2', component: PatientPage, icon: 'man'},
      //{ title: 'ค้นหาคนไข้', component: SearchpatientPage, icon: 'search'},
      { title: 'ประเภทคนไข้', component: TypeofpatientPage, icon: 'people'},
      { title: 'ผลการตรวจประจำวัน', component: TodayPage, icon: 'paper'},
      { title: 'การตรวจครั้งถัดไป', component: NextdayPage, icon: 'clipboard'},
     { title: 'คนไข้ใกล้เคียง', component: NearPage, icon: 'navigate'},
     { title: 'คนไข้ใกล้เคียง2', component: NearbyPage, icon: 'navigate'},
     // { title: 'แผนที่', component: MapPage, icon: 'navigate'},
//      { title: 'แผนที่2', component: GeolocationPage, icon: 'navigate'},
      { title: 'ตั้งค่าบัญชีผู้ใช้', component: SettingPage, icon: 'settings'},
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

    // // Set page ที่ไม่ต้องการให้มีเมนูด้านซ้าย
    // this.nav.setRoot(LoginPage);
  }





}
