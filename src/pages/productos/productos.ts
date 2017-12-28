import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController,AlertController,ToastController,
  ViewController} from 'ionic-angular';

import {Http,Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import { ModalProductsPage } from '../modal-products/modal-products';

@IonicPage()
@Component({
  selector: 'page-productos',
  templateUrl: 'productos.html',
})
export class ProductosPage {

  public data:any
  ip:any
  headers:any

  constructor(public navCtrl: NavController, public navParams: NavParams,public http:Http,
    public modalCtrl:ModalController,public alertCtrl: AlertController,public toastCtrl:ToastController,
    public viewCtrl:ViewController) {
    this.data=[];
    this.ip="http://192.168.1.2/";
    this.ip='http://18.221.23.10:8080/'
    //this.ip='http://192.169.0.14/'
    this.headers= new Headers();

    this.headers.append("Accept","application/json");
    this.headers.append("Content-Type","application/json");
    this.headers.append("Authorization","Bearer " + window.localStorage.getItem("token"));

    this.getPark();
    
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductosPage');
  }

  getPark(){


    this.http.get(this.ip + "getPark/1",{headers: this.headers})
    .map(res=>res.json())
    .subscribe(
      data=>{
        this.data = data.data;
      },
      err=>{
        alert("error");
        alert(JSON.stringify(err))
        
      }
    );


  }

  delete(row){

    let confirm = this.alertCtrl.create({
      title: 'Borrar',
      message: 'Estas seguro de eliminar este Item?',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Seguro',
          handler: () => {
            this.http.delete(this.ip + "park/"+row.id,{headers: this.headers})
            .map(res=>res.json())
            .subscribe(
              data=>{
                this.data = data.data;
                if(data.status==true){
                  let toast = this.toastCtrl.create({
                    message: 'Parqueadero borrado',
                    duration: 2500
                  });
                  
                  toast.present();   
                }
                      },
              err=>{
                console.log("error");
              }
            );
        
          }
        }
      ]
    });
    confirm.present();

    
  }

  newPark(){
    let modal=this.modalCtrl.create(ModalProductsPage,{
      stakeholder_id:1
    });

    modal.present();
    modal.onDidDismiss(data=>
      this.data=data.data);
    console.log("nuevo");
  }

}
