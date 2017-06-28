import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { BookAPI, BookShareApi } from '../../shared/shared';
import { Storage } from '@ionic/storage';
import { AddBookPage, EditBookPage, EditProfilePage } from "../pages";
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  data: any;
  Book: any;
  user: any;
  ImageFlag: boolean = false;
  @ViewChild('error') ele: ElementRef;

  constructor(private navCtrl: NavController,
    private navParams: NavParams,
    private bookAPI: BookAPI,
    public storage: Storage,
    public loading: LoadingController,
    private bookShareApi: BookShareApi) {
  }

  goToAddBook() {
    this.storage.get("LoginEmail")
      .then((LoginEmail) => {
        this.navCtrl.push(AddBookPage, LoginEmail);
      });
  }

  ionViewDidLoad() {

  }
  ionViewWillEnter() {
    let loader = this.loading.create({
      content: "Loading Profile Data ..."
    });
    loader.present().then(() => {
      this.storage.get("LoginEmail").then((LoginEmail) =>
        this.bookAPI.GetUserData(LoginEmail).then((res) => {
          this.data = res;
        })
      );
      this.storage.get("LoginEmail").then((LoginEmail) =>
        this.bookAPI.GetUserBook(LoginEmail).then((res) => {
          this.Book = res;
          if (this.Book) {
            loader.dismiss();
          }
          else if (this.Book == false) {
            loader.dismiss();
          }
        })
      );
    });
  }

  editBook($event, BookID) {
    let loader = this.loading.create({
      content: 'Loading Book Data ...'
    });
    loader.present().then(() => {
      this.bookShareApi.getBook(BookID)
        .subscribe(res => {
          loader.dismiss();
          this.navCtrl.push(EditBookPage, res);
        });
    });
  }

  deleteBook($event, BookID) {
    let loader = this.loading.create({
      content: 'Deleting Book  ...'
    });
    loader.present()
      .then(() => {
        this.bookShareApi.deleteBook(BookID)
          .subscribe(res => {
            if (res) {
              this.ionViewWillEnter();
              loader.dismiss();
            }
          });
      });
  }

  editProfile() {
    let loader = this.loading.create({
      content: 'Loading User Data'
    });
    loader.present().then(() => {
      this.storage.get('LoginEmail')
        .then((email) => {
          let emailz = email;
          if (emailz) {
            this.bookAPI.GetUserData(email)
              .then((res) => {
                this.data = res;
                if (this.data) {
                  this.bookShareApi.getUser(this.data.UserID)
                    .subscribe(user => {
                      this.user = user;
                      if (this.user) {
                        this.navCtrl.push(EditProfilePage, this.user);
                        loader.dismiss();
                      }
                    });
                }
              });
          }
        });
    });
  }
}
