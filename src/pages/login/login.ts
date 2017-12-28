import { RegisterPage } from './../register/register';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';
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
  
  constructor(public navCtrl: NavController, public navParams: NavParams,public http:Http,public toastCtrl:ToastController) {
    //this.ip='http://18.220.4.248/'
    this.ip='http://18.221.23.10:8080/'
    
    //this.ip="http://192.168.0.14/"
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
        if(data.status==true){
          this.data=data;
          window.localStorage.setItem("token",data.token);
          window.localStorage.setItem("role_id",data.role_id);
          this.navCtrl.push(HomePage);
        }else{
         
          let toast = this.toastCtrl.create({
            message: "Usuario o/y clave incorrectos",
            duration: 2500
          });
          toast.present();  
        }
      },
      err=>{
        console.log("erroir")
        console.log(err);
      }
    );
  }

  registerPerson(){
    this.navCtrl.setRoot(RegisterPage);
  }
}
