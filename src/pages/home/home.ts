import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LogInPage, RegisterPage } from "../pages";

@Component( {
  selector: 'page-home',
  templateUrl: 'home.html'
} )
export class HomePage {

  constructor( public navCtrl: NavController ) {

  }
  logIn () {
    this.navCtrl.push( LogInPage );
  }
  goToSignUp () {
    this.navCtrl.push( RegisterPage );
  }
}
