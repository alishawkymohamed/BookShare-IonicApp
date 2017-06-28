import { AcceptedNotPage } from './../accepted-not/accepted-not';
import { RejectedListPage } from './../rejected-list/rejected-list';
import { PendingListPage } from './../pending-list/pending-list';
import { ShowNotificationPage } from './../show-notification/show-notification';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { BorrowedPage } from "../pages";

@Component({
  selector: 'page-not-tabs',
  templateUrl: 'not-tabs.html',
})
export class NotTabsPage {
  RecievedRoot = ShowNotificationPage;
  BorrowedRoot = BorrowedPage;
  PendingRoot = PendingListPage;
  RejectedRoot = RejectedListPage;
  AcceptedRoot = AcceptedNotPage;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
  }

}
