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

  }
  ionViewWillEnter () {
    let loader = this.loading.create( {
      content: "Loading Profile Data ..."
    } );
    loader.present().then(() => {
      this.storage.get( "LoginEmail" ).then(( LoginEmail ) =>
        this.bookAPI.GetUserData( LoginEmail ).then(( res ) => {
          this.data = res;
          console.log( this.data );
        } )
      );
      this.storage.get( "LoginEmail" ).then(( LoginEmail ) =>
        this.bookAPI.GetUserBook( LoginEmail ).then(( res ) => {
          this.Book = res;
        } )
      );
      setTimeout( function () {
        loader.dismiss();
      }, 2000 );
    } );
  }

  editBook ( $event, BookID ) {
    this.navCtrl.push( EditBookPage, BookID );
  }
}
