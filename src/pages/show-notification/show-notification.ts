import { Component } from '@angular/core';
import { NavController, NavParams, ActionSheetController, AlertController, LoadingController } from 'ionic-angular';
import { BookAPI } from '../../shared/shared';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-show-notification',
  templateUrl: 'show-notification.html',
})
export class ShowNotificationPage {
  data: any;
  Action: any;
  notID: any;
  flag: boolean = false;
  errors: any = true;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private bookAPI: BookAPI, public storage: Storage,
    public actionSheetCtrl: ActionSheetController, public alertCtrl: AlertController, public loading: LoadingController) {
  }

  ionViewDidLoad() {
  }

  ionViewWillEnter() {
    let loader = this.loading.create({
      content: "Loading.."
    });
    loader.present().then(() => {
      this.storage.get("LoginEmail").then((LoginEmail) => {
        this.bookAPI.ShowNotification(LoginEmail).then((res: Array<any>) => {
          this.data = res;
          if (this.data) {
            loader.dismiss();
          }
          for (var index = 0; index < res.length; index++) {
            if (res[index].Action == 0) {
              res[index].Action = "Borrows";
            }
            else {
              res[index].Action = "Buy";
            }
            this.notID = res[index].ID;
            this.storage.set("NotID", this.notID);
          }
          if (this.data == false) {
            this.flag = true;
            this.errors = "There is No Notification to Show!";
            loader.dismiss();
          }
        })
      });
    });
  }
  AcceptNot() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Modify your Notification',
      buttons: [
        {
          text: 'Accept',
          role: 'accept',
          handler: () => {
            let loader = this.loading.create({
              content: "Loading.."
            });
            loader.present().then(() => {
              Promise.all([this.storage.get("NotID"), this.storage.get('LoginEmail')])
                .then((val) => {
                  this.bookAPI.AcceptNotication(val[0], val[1]).then(res => {
                    if (res == true) {
                      let alert = this.alertCtrl.create({
                        title: 'Success!',
                        subTitle: 'You have Just accepted the request!',
                        buttons: ['OK']
                      });
                      alert.present();
                      this.flag = true;
                      this.errors = "There is No Notification to Show!";
                      loader.dismiss();
                    }
                    else if (res == false) {
                      let alert = this.alertCtrl.create({
                        title: 'Error !',
                        subTitle: 'There is an Error.. We are very sorry..We will fix this soon!',
                        buttons: ['OK']
                      });
                      alert.present();
                      loader.dismiss();
                    }
                    else {
                      let alert = this.alertCtrl.create({
                        title: 'success!',
                        subTitle: 'You have accpeted the request!',
                        buttons: ['OK']
                      });
                      alert.present();
                      this.data = res;
                      this.flag = false;
                      loader.dismiss();
                    }
                  })
                });
              loader.dismiss();
            });
          }
        }, {
          text: 'Reject',
          role: 'cancel',
          handler: () => {
            let loader = this.loading.create({
              content: "Loading.."
            });
            loader.present().then(() => {
              Promise.all([this.storage.get("NotID"), this.storage.get('LoginEmail')])
                .then((val) => {
                  this.bookAPI.RejectNotification(val[0], val[1]).then(res => {
                    if (res == true) {
                      let alert = this.alertCtrl.create({
                        title: 'Success!',
                        subTitle: 'You have Just rejected the request!',
                        buttons: ['OK']
                      });
                      alert.present();
                      this.flag = true;
                      this.errors = "There is No Notification to Show!";
                      loader.dismiss();
                    }
                    else if (res == false) {
                      let alert = this.alertCtrl.create({
                        title: 'Error !',
                        subTitle: 'There is an Error.. We are very sorry..We will fix this soon!',
                        buttons: ['OK']
                      });
                      alert.present();
                      loader.dismiss();
                    }
                    else {
                      let alert = this.alertCtrl.create({
                        title: 'success!',
                        subTitle: 'You have rejected the request!',
                        buttons: ['OK']
                      });
                      alert.present();
                      this.data = res;
                      this.flag = false;
                      loader.dismiss();
                    }
                  })
                });
              loader.dismiss();
            });
          }
        }
      ]
    });
    actionSheet.present();
  }
}
