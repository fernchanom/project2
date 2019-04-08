import { BrowserModule }                            from '@angular/platform-browser';
import { ErrorHandler, NgModule }                   from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { Geolocation }                              from '@ionic-native/geolocation';
import { LaunchNavigator }                          from '@ionic-native/launch-navigator';

//import { ListPage }                               from '../pages/list/list';
//import { MapPage }                                from '../pages/map/map';
import { MyApp }                                    from './app.component';
import { HomePage }                                 from '../pages/home/home';
import { SearchpatientPage }                        from '../pages/searchpatient/searchpatient';
import { TypeofpatientPage }                        from '../pages/typeofpatient/typeofpatient';
import { TodayPage }                                from '../pages/today/today';
import { NextdayPage }                              from '../pages/nextday/nextday';
import { SignoutPage }                              from '../pages/signout/signout';
import { NotePage }                                 from '../pages/note/note';
import { PatientPage }                              from '../pages/patient/patient';
import { DetailpatientPage }                        from '../pages/detailpatient/detailpatient';
import { GeolocationPage }                          from '../pages/geolocation/geolocation';
import { ResultPage }                               from '../pages/result/result';
import { LoginPage }                                from '../pages/login/login';
import { DetailcheckupPage }                        from '../pages/detailcheckup/detailcheckup';
import { HightPage }                                from '../pages/hight/hight';
import { MediumPage }                               from '../pages/medium/medium';
import { LowPage }                                  from '../pages/low/low';
import { SettingPage }                              from '../pages/setting/setting';
import { UserEditPage }                             from '../pages/userEdit/userEdit';
import { UserChangePassPage }                       from '../pages/userChangePass/userChangePass';
import { UserCreatePage }                           from '../pages/userCreate/userCreate';




import { IonicStorageModule } from '@ionic/storage';

//database
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';

export const config = {
  apiKey: "AIzaSyAtvRVsuZkqOXVMzHQY9-rV2zndW1_IlC0",
  authDomain: "project-3dc75.firebaseapp.com",
  databaseURL: "https://project-3dc75.firebaseio.com",
  projectId: "project-3dc75",
  storageBucket: "project-3dc75.appspot.com",
  messagingSenderId: "976541836092"
};



import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    //ListPage,
    PatientPage,
    SearchpatientPage,
    TypeofpatientPage,
    TodayPage,
    NextdayPage,
    SignoutPage,
    NotePage,
    //MapPage,
    DetailpatientPage,
    GeolocationPage,
    ResultPage,
    LoginPage,
    DetailcheckupPage,
    HightPage,
    MediumPage,
    LowPage,
    SettingPage,
    UserEditPage,
    UserChangePassPage,
    UserCreatePage,



  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(config),
    AngularFireDatabaseModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
   // ListPage,
    PatientPage,
    SearchpatientPage,
    TypeofpatientPage,
    TodayPage,
    NextdayPage,
    SignoutPage,
    NotePage,
    //MapPage,
    DetailpatientPage,
    GeolocationPage,
    ResultPage,
    LoginPage,
    DetailcheckupPage,
    HightPage,
    MediumPage,
    LowPage,
    SettingPage,
    UserEditPage,
    UserChangePassPage,
    UserCreatePage,





  ],
  providers: [
    StatusBar,
    SplashScreen,
    AngularFireDatabase,
    Geolocation,
    LaunchNavigator,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
