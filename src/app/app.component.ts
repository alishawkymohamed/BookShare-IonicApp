import { PendingListPage } from './../pages/pending-list/pending-list';
import { WelcomeHomePage } from './../pages/welcome-home/welcome-home';
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform ,NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';
import { HomePage } from '../pages/home/home';
import { LogInPage, ProfilePage } from "../pages/pages";

@Component( {
  templateUrl: 'app.html'
} )
export class MyApp {
  @ViewChild( Nav ) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{ title: string, component: any }>;

  constructor( public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,public storage:Storage ) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: WelcomeHomePage },
      { title: 'Pofile', component: ProfilePage },
      {title:'Pending List',component:PendingListPage}
    ];

  }
  initializeApp () {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    } );
  }

  openPage ( page ) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot( page.component );
  }
}
