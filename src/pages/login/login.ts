import { RegisterPage } from './../register/register';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Http,Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import { HomePage } from '../home/home';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public data:any
  public email:string
  public password:string
  ip:any
  
  constructor(public navCtrl: NavController, public navParams: NavParams,public http:Http) {
    this.ip='http://18.220.4.248/'
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login(){
    let headers = new Headers();
    headers.append("Accept","application/json");
    headers.append("Content-Type","application/json");
    let param={email:this.email,password:this.password};

    this.http.post(this.ip+"/user/login",param,{headers:headers})
    .map(res=>res.json())
    .subscribe(
      data=>{
          this.data=data;
          
          window.localStorage.setItem("token",data.token);
          this.navCtrl.push(HomePage);
      },
      err=>{
        console.log(err);
      }
    );
  }

  registerPerson(){
    this.navCtrl.setRoot(RegisterPage);
  }
}
