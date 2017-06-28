import { DetailsPage } from './../details/details';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { BookAPI } from '../../shared/shared';

@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {
  flag: boolean = false;
  EFlag: boolean = false;
  searchTxt: string;
  searchby: string;
  data: any;
  errors: any = true;
  @ViewChild('error') ele: ElementRef;
  constructor(public navCtrl: NavController,
    public navParams: NavParams
    , public bookApi: BookAPI, public storage: Storage, public loading: LoadingController) {
  }

  Search() {
    this.flag = false;
    this.data = null;
    let loader = this.loading.create({
      content: "Loading.."
    });
    loader.present().then(() => {
      this.storage.get("LoginEmail").then((LoginEmail) => {
        this.bookApi.Search(this.searchTxt, this.searchby, LoginEmail)
          .subscribe((res) => {
            this.data = res;
            console.log(this.searchby);
            console.log(this.data);
            if (this.data == false) {
              this.errors = "There is No Book Except Yours if you own book named this and you can get it from your profile!";
              this.EFlag = true;
            }
          })
      });
      loader.dismiss();
    });
  }
  Details(event) {
    this.storage.set('ID', event.currentTarget.id);
    this.storage.set('SearchBy', this.searchby);
    console.log(event.currentTarget.id);
    this.navCtrl.push(DetailsPage);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }
  ionViewWillEnter() {
    this.searchby = null;
    this.searchTxt = null;
    this.flag = true;
    this.EFlag = false;
  }
}
