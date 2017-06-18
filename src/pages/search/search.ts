import { DetailsPage } from './../details/details';
import { Component, ViewChild, ElementRef, Input } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { BookAPI } from '../../shared/shared';

@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {
  flag: boolean = false;
  Flag: boolean = true;
  ImageFlag: boolean = false;
  searchTxt: string;
  searchby: string;
  data: any;
  errors: any = true;
  @ViewChild('error') ele: ElementRef;
  constructor(public navCtrl: NavController,
    public navParams: NavParams
    , public bookApi: BookAPI, public storage: Storage) {
  }

  Search() {
    this.flag = false;
    this.Flag = true;
    console.log(this.searchTxt, this.searchby);
    this.storage.get("LoginEmail").then((LoginEmail) => {
      this.bookApi.Search(this.searchTxt, this.searchby, LoginEmail)
        .subscribe((res: Array<any>) => {
          this.data = res;
          for (var index = 0; index < res.length; index++) {
            if (res[index].Cover != null)
            {
              this.ImageFlag = true;
            }
            else {
              this.ImageFlag = false;
            }
          }

          if (this.data == false) {
            this.errors = "There is No Book Except Yours if you own book named this and you can get it from your profile!";
            this.flag = true;
          }
        })
    });
  }
  Details(event) {
    console.log(event.currentTarget.id, this.searchby);
    this.storage.set('ID', event.currentTarget.id);
    this.storage.set('SearchBy', this.searchby);
    this.navCtrl.push(DetailsPage);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }
  ionViewWillEnter() {
    console.log('ionViewWillEnter SearchPage');
    this.searchby = null;
    this.searchTxt = null;
    this.Flag = false;

  }
}
