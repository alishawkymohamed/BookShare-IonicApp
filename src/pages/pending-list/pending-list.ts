import { WelcomeHomePage } from './../welcome-home/welcome-home';
import { Component } from '@angular/core';
import { NavController, NavParams, ActionSheetController, AlertController } from 'ionic-angular';
import { BookAPI } from '../../shared/shared';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-pending-list',
  templateUrl: 'pending-list.html',
})
export class PendingListPage {
  data: any;
  Action: any;
  flag: boolean = false;
  errors: any = true;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private bookAPI: BookAPI, public storage: Storage, public actionSheetCtrl: ActionSheetController, public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PendingListPage');
  }
  ionViewWillEnter() {
    this.storage.get("LoginEmail").then((LoginEmail) => {
      this.bookAPI.PendingList(LoginEmail).then((res: Array<any>) => {
        this.data = res;
        for (var index = 0; index < res.length; index++) {
          this.storage.set("PendingId", res[index].Notid);
          if (res[index].Action == 0) {
            res[index].Action = "Borrows";
          }
          else {
            res[index].Action = "Buy";
          }
        }
        if (this.data == false) {
          console.log("false");
          this.flag = true;
          this.errors = "There is No Notification to Show!";
        }
      })
    });
  }
  AcceptNot() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Modify your Notification',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            Promise.all([this.storage.get("PendingId"), this.storage.get("LoginEmail")])
              .then((val) => {
                this.bookAPI.CancelNot(val[0], val[1]).then(res => {
                  if (res == false) {
                    let alert = this.alertCtrl.create({
                      title: 'Error !',
                      subTitle: 'There is an Error.. We are very sorry..We will fix this soon!',
                      buttons: ['OK']
                    });
                    alert.present();
                  }
                  else {
                    let alert = this.alertCtrl.create({
                      title: 'success!',
                      subTitle: 'You have cancel the request!',
                      buttons: ['OK']
                    });
                    alert.present();
                    this.ionViewWillEnter();
                  }
                })
              });
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

}
