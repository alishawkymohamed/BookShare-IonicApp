import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import {BookAPI} from '../../shared/shared'

@Component({
  selector: 'page-welcome-home',
  templateUrl: 'welcome-home.html',
})
export class WelcomeHomePage {
  books=[];
  constructor(private navCtrl: NavController,
              private navParams: NavParams,
              private bookAPI:BookAPI) {}
  ionViewDidLoad() {
      this.bookAPI.GetMostBorrowedBook().subscribe(data=>{
        this.books = data.books;
        console.log(this.books);
      })
  }

}
