import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import {Http,Headers} from '@angular/http';
import 'rxjs/add/operator/map';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  public data:any
  ip:any

  constructor(public navCtrl: NavController, public navParams: NavParams,public http:Http) {
    this.data={};
    this.ip='http://18.221.23.10:8080/'
    //this.ip='http://192.169.0.14/'
    this.getProfile();
   
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

  getProfile(){
    let headers = new Headers();
    headers.append("Accept","application/json");
    headers.append("Content-Type","application/json");
    headers.append("Authorization","Bearer " + window.localStorage.getItem("token"));

    this.http.get(this.ip+"/details",{headers: headers})
    .map(res=>res.json())
    .subscribe(
      data=>{
        this.data = data.user;
      },
      err=>{
        console.log("error");
      }
    );


  }

}
