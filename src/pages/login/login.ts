import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Storage } from '@ionic/storage';

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import firebase from 'firebase';
import { NotePage } from '../note/note';


/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  itemsRef: AngularFireList<any>;
  items: Observable<any[]>;
  username: String;
  password: String;

  constructor(
    private af: AngularFireDatabase,
    public navCtrl: NavController, 
    public navParams: NavParams,
    public storage: Storage){
  }


  public myPerson = {Username : String, Password : String};
  

  ionViewDidLoad() {
    
    const personRef: firebase.database.Reference = firebase.database().ref("/User");
    personRef.on('value', personSnapshot => {
     
      this.myPerson = personSnapshot.val();
      console.log(this.myPerson[1])
      console.log(this.myPerson[1].Username)
      //this.validateLogin()
    });
  }

  showData() {
    this.itemsRef = this.af.list('/User');
    // Use snapshotChanges().map() to store the key
    
    this.items = this.itemsRef.snapshotChanges().map(changes => {
      console.log(changes)
      console.log("Log",this.items);
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
    console.log("changes", this.items);
  }

    validateLogin(){

      Object.keys(this.myPerson).forEach(key=> {
        console.log("####", this.myPerson[key].Username);
        if (this.username != "" && this.password != "") {
          if (this.username == this.myPerson[key].Username && this.password == this.myPerson[key].Password) {
            console.log("username :", this.username)
            console.log("usernameData :", this.myPerson[key].Username)
            console.log("Login Success");
            this.navCtrl.push(NotePage)
          }
          else {
            console.log("username :", this.username)
            console.log("usernameData :", this.myPerson[key].Username)
            console.log("Login fail")  ;  
          }  
        }
  
      });
  }
  

}
