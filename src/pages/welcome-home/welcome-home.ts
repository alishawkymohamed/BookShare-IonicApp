import { ShowNotificationPage } from './../show-notification/show-notification';
import { HomePage } from './../home/home';
import { SearchPage } from './../search/search';
import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { BookAPI } from '../../shared/shared';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-welcome-home',
  templateUrl: 'welcome-home.html',
})
export class WelcomeHomePage {
  books: any;
  User: any;
  CountNot: number;
  Flag: boolean = false;
  UserName: any;
  DataFlag: boolean;
  UserFlag: boolean;
  constructor(private navCtrl: NavController,
    private navParams: NavParams,
    private bookAPI: BookAPI, public storage: Storage, public loading: LoadingController) { }
  ionViewDidLoad() {
    let loader = this.loading.create({
      content: "Loading.."
    });
    loader.present().then(() => {
      this.bookAPI.GetMostBorrowedBook().
        subscribe(data => {
          this.books = data;
          if (this.books.length == 0) {
            this.DataFlag = true;
          }
        });
      this.bookAPI.GetMostBorrowedUser().
        subscribe(data => {
          this.User = data;
          if (this.User.length == 0) {
            this.UserFlag = true;
          }
        });
      loader.dismiss();
    });

  }
  ionViewWillEnter() {
    let loader = this.loading.create({
      content: "Loading.."
    });


    loader.present().then(() => {
      this.storage.get("LoginEmail").then((LoginEmail) => {
        this.bookAPI.ShowNotification(LoginEmail).then((res: Array<any>) => {
          if (this.Flag == true) {
            this.CountNot = null;
          }
          else {
            this.CountNot = res.length;
          }
        })
      });
      this.storage.get("LoginEmail").then((LoginEmail) =>
        this.bookAPI.GetUserData(LoginEmail).then((res) => {
          this.UserName = res[0].Name;
        })
      );
      loader.dismiss();
    });
  }
  Search() {
    this.navCtrl.push(SearchPage);
  }
  LogOut() {
    this.navCtrl.popToRoot();
    this.storage.remove("LoginEmail");
  }
  notifications() {
    this.Flag = true;
    this.CountNot = null;
    this.navCtrl.push(ShowNotificationPage);
  }
}
