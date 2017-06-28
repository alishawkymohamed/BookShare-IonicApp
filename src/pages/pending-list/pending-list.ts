import { Component } from '@angular/core';
import { NavController, NavParams, ActionSheetController, AlertController, LoadingController } from 'ionic-angular';
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
    private bookAPI: BookAPI, public storage: Storage, public actionSheetCtrl: ActionSheetController, public alertCtrl: AlertController, public loading: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PendingListPage');
  }
  ionViewWillEnter() {
    let loader = this.loading.create({
      content: "loading.."
    });
    loader.present().then(() => {
      this.storage.get("LoginEmail").then((LoginEmail) => {
        this.bookAPI.PendingList(LoginEmail).then((res) => {
          this.data = res;
          if (this.data) {
            loader.dismiss();
          }
          if (this.data == false) {
            console.log("false enter");
            this.flag = true;
            this.errors = "There is No Notification to Show!";
            loader.dismiss();
          }
        })
      });
    });
  }
  AcceptNot(event) {
    console.log(event.currentTarget.id);
    let id = event.currentTarget.id
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Modify your Notification',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            let loader = this.loading.create({
              content: "loading.."
            });
            loader.present().then(() => {
              this.storage.get("LoginEmail")
                .then((val) => {
                  this.bookAPI.CancelNot(id, val[1]).then(res => {
                    console.log(res);
                    if (res == false) {
                      console.log("false cancel");
                      let alert = this.alertCtrl.create({
                        title: 'Error !',
                        subTitle: 'There is an Error.. We are very sorry..We will fix this soon!',
                        buttons: ['OK']
                      });
                      alert.present();
                      loader.dismiss();
                    }
                    else if (res == true) {
                      console.log("true");
                      let alert = this.alertCtrl.create({
                        title: 'success!',
                        subTitle: 'You have cancel the request!',
                        buttons: ['OK']
                      });
                      alert.present();
                      this.flag = true;
                      this.errors = "There is No Notification to Show!";
                      loader.dismiss();
                    }
                    else {
                      console.log("data");
                      let alert = this.alertCtrl.create({
                        title: 'success!',
                        subTitle: 'You have cancel the request!',
                        buttons: ['OK']
                      });
                      alert.present();
                      this.data = res;
                      this.flag = false;
                      loader.dismiss();
                    }
                  })
                });
            });
          }
        }
      ]
    });
    actionSheet.present();
  }

}
