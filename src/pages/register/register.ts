import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  form:any
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.form={};
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  registerStakeholder(){
    console.log(this.form)
  }  

}
