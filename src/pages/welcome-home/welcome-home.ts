import { ShowNotificationPage } from './../show-notification/show-notification';
import { HomePage } from './../home/home';
import { SearchPage } from './../search/search';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { BookAPI } from '../../shared/shared';
import { Storage } from '@ionic/storage';

@Component( {
  selector: 'page-welcome-home',
  templateUrl: 'welcome-home.html',
} )
export class WelcomeHomePage {
  books = [];
  User = [];
  UserName: any;
  constructor( private navCtrl: NavController,
    private navParams: NavParams,
    private bookAPI: BookAPI, public storage: Storage ) { }
  ionViewDidLoad () {
    console.log( "Load" );
    this.bookAPI.GetMostBorrowedBook().
      subscribe( data => {
        this.books = data;
        console.log( this.books );
      } );
    this.bookAPI.GetMostBorrowedUser().
      subscribe( data => {
        this.User = data;
        console.log( this.User );
      } );

  }
  ionViewWillEnter () {
    console.log( "enter" );
    this.storage.get( "LoginEmail" ).then(( LoginEmail ) =>
      this.bookAPI.GetUserData( LoginEmail ).then(( res ) => {
        this.UserName = res[0].Name;
      } )
    );
  }
  Search () {
    this.navCtrl.push( SearchPage );
  }
  LogOut () {
    this.navCtrl.popToRoot();
    this.storage.remove( "LoginEmail" );
  }
  notifications () {
    this.navCtrl.push( ShowNotificationPage );
  }
}
