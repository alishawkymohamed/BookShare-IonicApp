import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams, ActionSheetController, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { BookAPI } from '../../shared/shared';

@Component({
  selector: 'page-borrowed',
  templateUrl: 'borrowed.html',
})
export class BorrowedPage {
  Data: any;
  flag: boolean = true;
  errors: any = true;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private bookAPI: BookAPI, public storage: Storage, public actionSheetCtrl: ActionSheetController, public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BorrowedPage');
  }
  ionViewWillEnter() {
    console.log("entered");
    this.storage.get("LoginEmail").then((LoginEmail) => {
      this.bookAPI.UserBorrowed(LoginEmail).then((res) => {
        this.Data = res;
        if (this.Data == false) {
          this.flag = false;
          this.errors = "There is No Books to Show!";
        }
      })
    });

  }

}
