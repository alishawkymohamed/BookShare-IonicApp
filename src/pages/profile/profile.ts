import { WelcomeHomePage } from './../welcome-home/welcome-home';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { BookAPI } from '../../shared/shared';
import { Storage } from '@ionic/storage';
import { AddBookPage } from "../pages";
@Component( {
  selector: 'page-profile',
  templateUrl: 'profile.html',
} )
export class ProfilePage {
  data: any;
  Book: any;
  errors: any;
  flag: boolean = true;
  @ViewChild( 'error' ) ele: ElementRef;

  constructor( private navCtrl: NavController,
    private navParams: NavParams, private bookAPI: BookAPI, public storage: Storage ) {
  }

  goToAddBook () {
    this.storage.get( "LoginEmail" )
      .then(( LoginEmail ) => {
        this.navCtrl.push( AddBookPage, LoginEmail );
      } );
  }

  ionViewDidLoad () {
    console.log( 'ionViewDidLoad ProfilePage' );
  }

  ionViewWillEnter () {
    this.storage.get( "LoginEmail" ).then(( LoginEmail ) =>
      this.bookAPI.GetUserData( LoginEmail ).then(( res ) => {
        this.data = res;
      } )
    );

    this.storage.get( "LoginEmail" ).then(( LoginEmail ) =>
      this.bookAPI.GetUserBook( LoginEmail ).then(( res ) => {
        this.Book = res;
        if ( res == false ) {
          this.flag = false;
          this.errors = "There is no Books To Show";
        }
      } )
    );
  }

  home () {
    this.navCtrl.push( WelcomeHomePage );
  }
}
