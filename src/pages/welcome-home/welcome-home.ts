import { NotTabsPage } from './../not-tabs/not-tabs';
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

  books: any[];
  User: any;
  Data: any;
  AData: any;
  RData: any;
  CountNot: number;
  AcceptNot: number;
  RejectNot: number;
  Flag: boolean = false;
  UserName: any;
  DataFlag: boolean;
  UserFlag: boolean;
  Userr: any;

  constructor(private navCtrl: NavController,
    private navParams: NavParams,
    private bookAPI: BookAPI, public storage: Storage, public loading: LoadingController) { }
  ionViewDidLoad() {
    let loaderr = this.loading.create({
      content: "Loading ..."
    });
    loaderr.present().then(() => {
      this.bookAPI.GetMostBorrowedBook().
        subscribe(data => {
          this.books = data;
          if (this.books) {
            this.DataFlag = false;
            loaderr.dismiss();
          }
        });
      let loader = this.loading.create({
        content: "Loading ..."
      });
      loader.present().then(() => {
        this.bookAPI.GetMostBorrowedUser().
          subscribe(data => {
            this.User = data;
            if (this.User) {
              this.UserFlag = false;
              loader.dismiss();
            }
          });
      });
    });
  }
  ionViewWillEnter() {
    let loader = this.loading.create({
      content: "Loading ..."
    });
    loader.present().then(() => {
      this.storage.get("LoginEmail").then((LoginEmail) => {
        this.bookAPI.ShowNotification(LoginEmail).then((res: Array<any>) => {
          this.Data = res;
          if (res) {
            loader.dismiss();
          }
          if (this.Flag == true) {
            this.CountNot = null;
          }
          else if (this.Flag == false && this.Data == false) {
            this.CountNot = 0;
          }
          else if (this.Flag == false && this.Data != false) {
            this.CountNot = res.length;
          }
          console.log(this.CountNot);
        })
      });
      this.storage.get("LoginEmail").then((LoginEmail) => {
        this.bookAPI.RejectedList(LoginEmail).then((res: Array<any>) => {
          this.RData = res;
          if (this.RData != false && this.Flag == false) {
            this.RejectNot = res.length;
            console.log("RejectNot=" + this.RejectNot);
          }
          else {
            this.RejectNot = 0;

          }
        })
      });
      this.storage.get("LoginEmail").then((LoginEmail) => {
        this.bookAPI.AcceptedList(LoginEmail).then((res: Array<any>) => {
          this.AData = res;
          if (this.AData != false && this.Flag == false) {
            this.AcceptNot = res.length;
            console.log("AcceptNot=" + this.AcceptNot);
          }
          else {
            this.AcceptNot = 0;
          }
        })
      });
      loader.present().then(() => {
        this.storage.get("LoginEmail").then((LoginEmail) =>
          this.bookAPI.GetUserData(LoginEmail).then((res) => {
            this.Userr = res;
            if (res) {
              loader.dismiss();
            }
          })
        );
      });
    });
  }
  Search() {
    this.navCtrl.push(SearchPage);
  }
  LogOut() {
    this.navCtrl.popToRoot();
    this.storage.remove("LoginEmail");
    this.storage.clear();
  }
  notifications() {
    this.Flag = true;
    this.CountNot = null;
    this.navCtrl.push(NotTabsPage);
  }
}
