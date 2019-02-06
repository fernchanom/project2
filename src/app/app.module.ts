import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { LaunchNavigator } from '@ionic-native/launch-navigator';

import { MyApp } from './app.component';
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
import { DetailpatientPage } from '../pages/detailpatient/detailpatient';
import { GeolocationPage } from '../pages/geolocation/geolocation';
import { ResultPage } from '../pages/result/result';

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
    //AddpatientPage,
    PatientPage,
    SearchpatientPage,
    TypeofpatientPage,
    TodayPage,
    NextdayPage,
    SignoutPage,
    NotePage,
    //MapPage,
    MappatientPage,
    DetailpatientPage,
    GeolocationPage,
    ResultPage,



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
   // AddpatientPage,
    PatientPage,
    SearchpatientPage,
    TypeofpatientPage,
    TodayPage,
    NextdayPage,
    SignoutPage,
    NotePage,
    //MapPage,
    MappatientPage,
    DetailpatientPage,
    GeolocationPage,
    ResultPage,
    


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
