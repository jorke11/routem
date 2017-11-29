import { LoginPage } from './../login/login';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';
import {Http,Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  form:any
  ip:any
  res:any
  constructor(public navCtrl: NavController, public navParams: NavParams, public http:Http,public toastCtrl:ToastController) {
    this.form={};
    this.ip="http://18.220.4.248/"  
    this.ip='http://18.221.23.10:8080/'
    this.form={};
    this.form.role_id='';
    this.form.name='';
    this.form.last_name='';
    this.form.password='';
    this.form.confirmation='';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  registerStakeholder(){
    let headers = new Headers();
    let error='';
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(!re.test(this.form.email)) {
      error="email no valido!";
    }

    if(this.form.password!=this.form.confirmation){
      error+=(error=='')?'':', '
      error+="Clave y confirmacion no coinciden!"
    }

    if(this.form.role_id==''){
      error+=(error=='')?'':', '
      error+="Tipo es necesario"
    }

    if(this.form.password==''){
      error+=(error=='')?'':', '
      error+="Password es necesario"
    }

    if(this.form.name==''){
      error+=(error=='')?'':', '
      error+="El nombre es necesario"
    }

    if(this.form.last_name==''){
      error+=(error=='')?'':', '
      error+="El apellido es necesario"
    }

    if(error!=''){
      let toast = this.toastCtrl.create({
        message: error,
        duration: 2500,
        position:"top"
      });
      
      toast.present();      
      return false;
    }

    headers.append("Accept","application/json");
    headers.append("Content-Type","application/json");
    
    this.http.post(this.ip+"/newStakeholder",this.form,{headers:headers})
    .map(res=>res.json())
    .subscribe(
      data=>{
        this.res=data;
        if(data.status==true){
          let toast = this.toastCtrl.create({
            message: data.msg,
            duration: 2500
          });
          this.navCtrl.setRoot(LoginPage)
          toast.present();      
        }

      },
      err=>{
        console.log("error")
        console.log(JSON.stringify(err));
      }
    );
  }  

}
