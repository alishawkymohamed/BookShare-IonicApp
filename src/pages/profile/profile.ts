import { WelcomeHomePage } from './../welcome-home/welcome-home';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { BookAPI } from '../../shared/shared';
import { Storage } from '@ionic/storage';
import { AddBookPage, EditBookPage } from "../pages";
@Component( {
  selector: 'page-profile',
  templateUrl: 'profile.html',
} )
export class ProfilePage {
  data: any;
  Book: any;
  errors: any;
  flag: boolean = true;
  ImageFlag: boolean = false;
  @ViewChild( 'error' ) ele: ElementRef;

  constructor( private navCtrl: NavController,
    private navParams: NavParams, private bookAPI: BookAPI, public storage: Storage, public loading: LoadingController ) {
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
    let loader = this.loading.create( {
      content: "Loading.."
    } );
    loader.present().then(() => {
      this.storage.get( "LoginEmail" ).then(( LoginEmail ) =>
        this.bookAPI.GetUserData( LoginEmail ).then(( res ) => {
          this.data = res;
          if ( res[2] == null ) {
            this.ImageFlag = false;
          }
          else {
            this.ImageFlag == true;
          }
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
      loader.dismiss();
    } );
  }

  editBook ( $event, BookID ) {
    this.navCtrl.push( EditBookPage, BookID );
  }
}
