import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Http,Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@IonicPage()
@Component({
  selector: 'page-orders',
  templateUrl: 'orders.html',
})
export class OrdersPage {

  ip:any
  headers:any
  data:any
  res:any

  constructor(public navCtrl: NavController, public navParams: NavParams,public http:Http) {
    this.ip="http://192.168.1.2/";
    this.ip='http://18.221.23.10:8080/'
    //this.ip='http://192.169.0.14/'
    
    this.res={};
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrdersPage');
    this.getOrders()
  }

  getOrders(){
    this.headers= new Headers();
    this.headers.append("Accept","application/json");
    this.headers.append("Content-Type","application/json");
    this.headers.append("Authorization","Bearer " + window.localStorage.getItem("token"));
    this

    this.http.get(this.ip + "getOrders",{headers: this.headers})
    .map(res=>res.json())
    .subscribe(
      data=>{
        this.data = data.data;
      },
      err=>{
        console.log("error");
      }
    );
  }

  cancel(row){
    this.headers= new Headers();
    this.headers.append("Accept","application/json");
    this.headers.append("Content-Type","application/json");
    this.headers.append("Authorization","Bearer " + window.localStorage.getItem("token"));
    this.http.post(this.ip + "cancel",row,{headers: this.headers})
    .map(res=>res.json())
    .subscribe(
      data=>{
        this.res = data.data;
      },
      err=>{
        console.log(JSON.stringify(err));
      }
    );

  }

  confirm(row){

    this.headers= new Headers();
    

    this.headers.append("Accept","application/json");
    this.headers.append("Content-Type","application/json");
    this.headers.append("Authorization","Bearer " + window.localStorage.getItem("token"));
        this.http.post(this.ip + "confirm",row,{headers: this.headers})
        .map(res=>res.json())
        .subscribe(
          data=>{
            this.res = data.data;
          },
          err=>{
            console.log(JSON.stringify(err));
          }
        );
    
      }

}
