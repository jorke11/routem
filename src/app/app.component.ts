import { OrdersPage } from './../pages/orders/orders';
import { RegisterPage } from './../pages/register/register';
import { Component,ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { ProductosPage } from '../pages/productos/productos';
import { ProfilePage } from '../pages/profile/profile';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

   @ViewChild('NAV') nav: Nav;
    public rootPage:any;

  public pages: Array<{ titulo:string,component:any,icon:string}>;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
     if (localStorage.getItem("token") === null) {
      this.rootPage = LoginPage;
    }else{
      this.rootPage = HomePage;
    }
  
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

    this.pages=[
      {titulo:"Inicio",component: HomePage , icon: "home"},
      {titulo:"Perfil",component: ProfilePage , icon: "person"},
      
      {titulo:"Ordenes",component: OrdersPage , icon: "cart"}
    ];

    if(localStorage.getItem("role_id")=='2'){
      this.pages.push({titulo:"Parquaderos",component: ProductosPage , icon: "star"});
    }
    
  }

  goToPage(page){
    this.nav.setRoot(page);
 }

 closeSession(){
  localStorage.removeItem("token");
  localStorage.removeItem("role_id");
  this.nav.setRoot(LoginPage);
 }
}

