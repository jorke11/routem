import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ModalProductsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal-products',
  templateUrl: 'modal-products.html',
})
export class ModalProductsPage {
  public data:any;
  public stakeholder_id:number;


  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.data={};
    this.stakeholder_id=this.navParams.get("stakeholder_id");
    console.log(this.stakeholder_id);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalProductsPage');
  }

  newProduct(){
    console.log(this.data)
  }

  close(){

  }

}
