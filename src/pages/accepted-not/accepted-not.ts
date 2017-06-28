import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { BookAPI } from '../../shared/shared';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'page-accepted-not',
  templateUrl: 'accepted-not.html',
})
export class AcceptedNotPage {
  flag: boolean = false;
  errors: any = true;
  data: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private bookAPI: BookAPI,
    public storage: Storage,
    public loading: LoadingController) {
  }

  ionViewDidLoad() {
  }
  ionViewWillEnter() {
    let loader = this.loading.create({
      content: "loading.."
    });
    loader.present().then(() => {
      this.storage.get("LoginEmail").then((LoginEmail) => {
        this.bookAPI.AcceptedList(LoginEmail).then((res: Array<any>) => {
          this.data = res;
          if (this.data) {
            loader.dismiss();
          }
          for (var index = 0; index < res.length; index++) {
            if (res[index].Action == 0) {
              res[index].Action = "Borrow";
            }
            else {
              res[index].Action = "Buy";
            }
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

}
