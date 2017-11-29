import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController,ToastController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import {Http,Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@IonicPage()
@Component({
  selector: 'page-modal-products',
  templateUrl: 'modal-products.html',
})
export class ModalProductsPage {
  public data:any;
  public stakeholder_id:number;
  ip:any

  constructor(public navCtrl: NavController, public navParams: NavParams,private camera: Camera,
    public http:Http,public viewCtrl:ViewController,public toastCtrl:ToastController) {
    this.data={};
    this.data.stakeholder_id=this.navParams.get("stakeholder_id");
    console.log(this.stakeholder_id);   
    this.ip='http://18.220.4.248/'
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalProductsPage');
  }
  takePhoto(){

		const options: CameraOptions = {
			//quality: 100,
			destinationType: this.camera.DestinationType.DATA_URL,
			//encodingType: this.camera.EncodingType.JPEG,
			//mediaType: this.camera.MediaType.PICTURE
			targetWidth: 1000,
        	targetHeight: 1000,
        	correctOrientation: true
    }
    
    this.camera.getPicture(options).then((imageData) => {
			// imageData is either a base64 encoded string or a file URI
			// If it's base64:
      this.data.img = 'data:image/jpeg;base64,' + imageData;	

		}, (errc) => {
			console.log(JSON.stringify(errc))
		});
  }

  newProduct(){
    let headers = new Headers();
    headers.append("Accept","application/json");
    headers.append("Content-Type","application/json");
    headers.append("Authorization","Bearer " + window.localStorage.getItem("token"));

    this.http.post(this.ip+"/newPark",this.data,{headers:headers})
    .map(res=>res.json())
    .subscribe(
      data=>{
        console.log("ok")
        console.log(JSON.stringify(data));
        this.data=data;
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

  }

  close(){
    this.viewCtrl.dismiss(this.data)
  }

}
