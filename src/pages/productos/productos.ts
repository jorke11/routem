import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController } from 'ionic-angular';

import {Http,Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import { ModalProductsPage } from '../modal-products/modal-products';

/**
 * Generated class for the ProductosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-productos',
  templateUrl: 'productos.html',
})
export class ProductosPage {

  public data:any

  constructor(public navCtrl: NavController, public navParams: NavParams,public http:Http,public modalCtrl:ModalController) {
    this.data=[];
    this.getPark();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductosPage');
  }

  getPark(){
    let headers = new Headers();
    headers.append("Accept","application/json");
    headers.append("Content-Type","application/json");
    headers.append("Authorization","Bearer " + window.localStorage.getItem("token"));

    this.http.get("http://localhost/getPark/1",{headers: headers})
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

  newPark(){
    let modal=this.modalCtrl.create(ModalProductsPage,{
      stakeholder_id:1
    });

    modal.present();
    modal.onDidDismiss(data=>console.log(data));
    console.log("nuevo");
  }

}
