import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import {Http,Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  form:any
  ip:any

  constructor(public navCtrl: NavController, public navParams: NavParams, public http:Http,public toastCtrl:ToastController) {
    this.form={};
    this.ip="http://18.220.4.248/"
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  registerStakeholder(){
    let headers = new Headers();
    headers.append("Accept","application/json");
    headers.append("Content-Type","application/json");
    headers.append("Authorization","Bearer " + window.localStorage.getItem("token"));

    this.http.post(this.ip+"/newPark",this.form,{headers:headers})
    .map(res=>res.json())
    .subscribe(
      data=>{
       
        console.log(JSON.stringify(data));
        this.form=data;
        if(data.status==true){
          let toast = this.toastCtrl.create({
            message: 'Parqueadero creado',
            duration: 2500
          });
          
          toast.present();      
        }

      },
      err=>{
        console.log("error")
        console.log(JSON.stringify(err));
      }
    );
    console.log(this.form)
  }  

}
