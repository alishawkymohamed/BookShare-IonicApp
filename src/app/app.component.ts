import { RejectedListPage } from './../pages/rejected-list/rejected-list';
import { BorrowedPage } from './../pages/borrowed/borrowed';
import { PendingListPage } from './../pages/pending-list/pending-list';
import { WelcomeHomePage } from './../pages/welcome-home/welcome-home';
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';
import { HomePage } from '../pages/home/home';
import { ProfilePage } from "../pages/pages";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{ title: string, component: any }>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public storage: Storage) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: WelcomeHomePage },
      { title: 'Pofile', component: ProfilePage },
      { title: 'Pending List', component: PendingListPage }
    ];

  }
  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  goToProfile() {
    this.nav.push(ProfilePage);
  }
  // goToPending() {
  //  this.nav.push(PendingListPage);
  // }
  // goToBorrowed() {
  //   this.nav.push(BorrowedPage);
  //  }
  //  goToRejected() {
  //   this.nav.push(RejectedListPage);

  // }
}
