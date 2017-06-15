import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component( {
  selector: 'page-register',
  templateUrl: 'register.html',
} )

export class RegisterPage {

  constructor( private navCtrl: NavController,
    private navParams: NavParams ) {
  }

  ionViewDidLoad () {
    console.log( 'ionViewDidLoad RegisterPage' );
  }

}
