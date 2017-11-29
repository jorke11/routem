import { Component, ViewChild, ElementRef  } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController,ToastController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import {Http,Headers} from '@angular/http';
import 'rxjs/add/operator/map';

import {Geolocation,Geoposition} from '@ionic-native/geolocation'

declare var google:any
var lat:any
var lng:any
var address:any

@IonicPage()
@Component({
  selector: 'page-modal-products',
  templateUrl: 'modal-products.html',
})
export class ModalProductsPage {

  @ViewChild("map") mapRef:ElementRef
  map:any
  public data:any;
  public stakeholder_id:number;
  public marker:any
  latitude:any
  longitude:any
  geocoder:any
  infowindow:any
  ip:any

  constructor(public navCtrl: NavController, public navParams: NavParams,private camera: Camera,
    public http:Http,public viewCtrl:ViewController,public toastCtrl:ToastController,
    public geolocation: Geolocation) {
    this.data={};
    
    this.data.stakeholder_id=this.navParams.get("stakeholder_id");
    this.geocoder = new google.maps.Geocoder;
    this.infowindow = new google.maps.InfoWindow;
    this.ip="http://192.168.1.2/";
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalProductsPage');
    this.getPosition()
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

  getPosition(){
    
        this.geolocation.getCurrentPosition().then((resp) => {
          this.loadMap(resp)
         }).catch((error) => {
           console.log('Error getting location', error);
         });
    
    
  }


  loadMap(position:Position){
    this.latitude = position.coords.latitude
    this.longitude = position.coords.longitude
    
    let myLatLng = {lat:this.latitude,lng:this.longitude}
    
    this.map = new google.maps.Map(this.mapRef.nativeElement,{
        center:myLatLng,
        zoom:16
    })

    let directionsService = new google.maps.DirectionsService;
    let directionsDisplay = new google.maps.DirectionsRenderer;

      directionsDisplay.setMap(this.map);

    google.maps.event.addListenerOnce(this.map, 'idle', () => {
      this.marker = new google.maps.Marker({
          position:myLatLng,
          map: this.map,
          title: 'AQUI ESTOY!',
          draggable:true
        })

      this.mapRef.nativeElement.classList.add('show-map');
      this.lastLatLng(this.marker,this.map);

    });

  }

  lastLatLng(marker,map){
    
    lat = marker.position.lat();
    lng = marker.position.lng();

    this.geocodeLatLng({lat:lat,lng: lng},map);

    google.maps.event.addListener(marker, 'dragend', () =>{      
      lat = marker.position.lat();
      lng = marker.position.lng();
      let latlng={lat:lat,lng: lng}
      
      this.geocodeLatLng(latlng,map);
    });
  }

  geocodeLatLng(latlng:any,map) {
    
    this.geocoder.geocode({'location': latlng}, function(results, status) {
      if (status === 'OK') {
        if (results[1]) {
  //          map.setZoom(11);
         // var marker = new google.maps.Marker({
           // position: latlng,
            //map: map
          //});
          //this.newLocation.lat = latlng.lat;
          address = results[1].formatted_address;
          
            //this.infowindow.setContent(results[1].formatted_address);
          //this.infowindow.open(this.map, marker);
        } else {
          console.log('No results found');
        }
      } else {
        console.log('Geocoder failed due to: ' + status);
      }
    });

    this.data.address=address
    
  }


  newProduct(){
    let headers = new Headers();
    headers.append("Accept","application/json");
    headers.append("Content-Type","application/json");
    headers.append("Authorization","Bearer " + window.localStorage.getItem("token"));

    this.data.latitude=lat
    this.data.longitude=lng

    this.http.post(this.ip+"newPark",this.data,{headers:headers})
    .map(res=>res.json())
    .subscribe(
      data=>{
        if(data.status==true){
          let toast = this.toastCtrl.create({
            message: 'Parqueadero creado',
            duration: 2500
          });
          
          toast.present();      
          this.viewCtrl.dismiss(data)
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
