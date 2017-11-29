import { OrdersPage } from './../orders/orders';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ToastController } from 'ionic-angular';

import {Http,Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {Geolocation} from '@ionic-native/geolocation'

declare var google:any
var address:any
@IonicPage()
@Component({
  selector: 'page-go-route',
  templateUrl: 'go-route.html',
})
export class GoRoutePage {
  
  data:any
  @ViewChild("map") mapRef:ElementRef
  map:any
  marker:any
  latitude:any
  longitude:any
  ip:any

  geocoder:any
  infowindow:any

constructor(public navCtrl: NavController, public navParams: NavParams,public geolocation: Geolocation,
  public viewController:ViewController,public http:Http,public toastCtrl:ToastController) {
    this.data = this.navParams.get("item")
    //this.ip='http://18.220.4.248/'
    this.ip='http://18.221.23.10:8080/'
    //this.ip="http://192.168.0.14/"
    
    this.geocoder = new google.maps.Geocoder;
    this.infowindow = new google.maps.InfoWindow;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GoRoutePage');
    this.getPosition()
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
      /*this.marker = new google.maps.Marker({
      position: myLatLng,
        map: this.map,
        title: 'AQUI ESTOY!',
      })*/

      let end = {lat:parseFloat(this.data.latitude),lng:parseFloat(this.data.longitude)}
      
      this.marker = new google.maps.Marker({
        position:end,
          map: this.map,
          title: 'AQUI ESTOY!',
        })

      this.mapRef.nativeElement.classList.add('show-map');
      
      var init = new google.maps.LatLng(this.latitude, this.longitude);
      var endroute = new google.maps.LatLng(this.data.latitude, this.data.longitude);

      
      directionsService.route({
        origin: init,
        destination: endroute,
        travelMode: 'DRIVING'
      }, function(response, status) {
        if (status === 'OK') {
          directionsDisplay.setDirections(response);
        } else {
          window.alert('Directions request failed due to ' + status);
        }
      });



      //this.lastLatLng(this.marker,this.map);
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
    
  }


  close(){
    this.viewController.dismiss()
  }

  reserve(){

    let headers = new Headers();
    headers.append("Accept","application/json");
    headers.append("Content-Type","application/json");
    headers.append("Authorization","Bearer " + window.localStorage.getItem("token"));
    console.log(this.data)
    this.http.post(this.ip+"reservePark",this.data,{headers:headers})
    .map(res=>res.json())
    .subscribe(
      data=>{
        this.data=data;
        if(data.status==true){
          let toast = this.toastCtrl.create({
            message: data.msg,
            duration: 2500
          });
          
          toast.present();      
          this.viewController.dismiss()
          this.navCtrl.setRoot(OrdersPage);
        }

      },
      err=>{
        console.log("error")
        console.log(JSON.stringify(err));
      }
    );

  }
    

}
