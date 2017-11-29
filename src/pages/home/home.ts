import { Component,ViewChild,ElementRef  } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import {Http,Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {Geolocation} from '@ionic-native/geolocation'

import { GoRoutePage } from './../go-route/go-route';

declare var google:any

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  data:any
  @ViewChild("map") mapRef:ElementRef
  directionsService:any;
  directionsDisplay:any;
  map:any
  marker:any
  latitude:any
  longitude:any
  ip:any

  constructor(public navCtrl: NavController,public http:Http, public geolocation: Geolocation,
  public modalCtrl:ModalController) {
    this.data=[]
    this.latitude=''
    this.longitude=''

  //this.ip='http://18.220.4.248/'
  //this.ip="http://192.168.0.14/"
  this.ip='http://18.221.23.10:8080/'
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
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

    this.directionsService = new google.maps.DirectionsService;
    this.directionsDisplay = new google.maps.DirectionsRenderer;

    let myLatLng = {lat:this.latitude,lng:this.longitude}
    this.map = new google.maps.Map(this.mapRef.nativeElement,{
        center:myLatLng,
        zoom:16
    })

    this.directionsDisplay.setMap(this.map);
    
    google.maps.event.addListenerOnce(this.map, 'idle', () => {
        this.marker = new google.maps.Marker({
        position: myLatLng,
          map: this.map,
          title: 'AQUI ESTOY!',
          draggable:true
        })

        this.mapRef.nativeElement.classList.add('show-map');
        
        //this.lastLatLng(this.marker,this.map);
      });

      this.getParks();

  }

  getParks(){
    let headers = new Headers();
    headers.append("Accept","application/json");
    headers.append("Content-Type","application/json");
    headers.append("Authorization","Bearer " + window.localStorage.getItem("token"));

    this.http.get(this.ip+"getParks",{headers:headers})

    .map(res=>res.json())
    .subscribe(
      data=>{
        
        for(let row in data.data){
          let myLatLng = {lat:parseFloat(data.data[row].latitude),lng:parseFloat(data.data[row].longitude)}
          
          var directionsService = new google.maps.DirectionsService();
          var start=new google.maps.LatLng(this.latitude,this.longitude);
          
          var end=new google.maps.LatLng(parseFloat(data.data[row].latitude),parseFloat(data.data[row].longitude));
          
          //console.log(end);

          var request = {
            origin:start,
            destination:end,
            travelMode: google.maps.TravelMode.DRIVING
          };
          
          directionsService.route(request, function(result, status) {
            
            if (status == google.maps.DirectionsStatus.OK) {
              data.data[row].distance=result.routes[0].legs[0].distance.text
              data.data[row].duration=result.routes[0].legs[0].duration.text
            }
          });

          /*let x2=new google.maps.LatLng(this.latitude,this.longitude);
          let x1=new google.maps.LatLng(parseFloat(row.latitude),parseFloat(row.longitude));
          
          let distancia = google.maps.geometry.spherical.computeDistanceBetween(x1, x2);*/
          
          
          
          this.marker = new google.maps.Marker({
            position: myLatLng,
              map: this.map,
              title: 'AQUI ESTOY!',
            })

            this.mapRef.nativeElement.classList.add('show-map');
        }
        this.data = data.data;
        
      },
      err=>{
        console.log("error")
        console.log(JSON.stringify(err));
      }
    );
  }
  order(item){
    let modal=this.modalCtrl.create(GoRoutePage,{
      item:item
    });

    modal.present();
  }

}
