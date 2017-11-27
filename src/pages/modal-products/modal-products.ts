import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';

@IonicPage()
@Component({
  selector: 'page-modal-products',
  templateUrl: 'modal-products.html',
})
export class ModalProductsPage {
  public data:any;
  public stakeholder_id:number;
  public base64Image:string;
  public photo:string;

  constructor(public navCtrl: NavController, public navParams: NavParams,private camera: Camera) {
    this.data={};
    this.stakeholder_id=this.navParams.get("stakeholder_id");
    console.log(this.stakeholder_id);
    this.photo=''
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
      this.base64Image = 'data:image/jpeg;base64,' + imageData;
      
			//this.photos.push(this.base64Image);
			

		}, (err) => {
			
		});
  }

  newProduct(){
    console.log(this.data)
  }

  close(){

  }

}
