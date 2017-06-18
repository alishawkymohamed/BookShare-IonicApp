import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {BookAPI} from '../../shared/shared';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
})
export class DetailsPage {
  buy:any;
  borrow:any;
  data:any;
  name:any;
  flag:any;
  AuthorFlag:any;
  AvailableFlag:any;
  PriceFlag:any;
  DescriptionFlag:any;
  DurationFlag:any;
  ForBorrowFlag:any;
  ForSaleFlag:any;
  OwnerFlag:any;
  LoginID:any;
 
  constructor(public navCtrl: NavController, public navParams: NavParams
  ,public bookApi:BookAPI, public storage:Storage ,public alertCtrl:AlertController) {
  }

  ionViewDidLoad() {
  
    console.log('ionViewDidLoad DetailsPage');
  }
  Buy()
  {
    Promise.all([this.storage.get("LoginEmail"),this.storage.get('ID')]).
    then((val)=>{
      this.bookApi.BuyBorrow(val[0],val[1],0).then((res)=>{
      this.buy=res;
      if(res==true)
      {
        let alert = this.alertCtrl.create({
        title: 'New Request!',
      subTitle: 'Your Request Has been sent successfully!',
      buttons: ['OK']
    });
    alert.present();
       this.ForSaleFlag=false;
      }
      else
      {
            if(res==false)
         {
          let alert = this.alertCtrl.create({
        title: 'Error!',
        subTitle: 'There is An error..We are very sorry we will fix it soon..!',
        buttons: ['OK']
          });
          alert.present();
         }
         else
         {
           let alert = this.alertCtrl.create({
        title: 'Error!',
      subTitle: 'You Can\'t Send Two Request.!',
      buttons: ['OK']
    });
    alert.present(); 
         }
       
      }
      });
    });
  }
  Borrow()
  {
     Promise.all([this.storage.get("LoginEmail"),this.storage.get('ID')]).
    then((val)=>{
      console.log(val[0],val[1]);
      this.bookApi.BuyBorrow(val[0],val[1],1).then((res)=>{
      this.buy=res;
      if(res==true)
      {
         let alert = this.alertCtrl.create({
      title: 'New Request!',
      subTitle: 'Your Request Has been sent successfully!',
      buttons: ['OK']
    });
    alert.present();
        this.ForBorrowFlag=false;
       
      }
      else
      {
         if(res==false)
         {
          let alert = this.alertCtrl.create({
        title: 'Error!',
      subTitle: 'There is An error..We are very sorry we will fix it soon..!',
      buttons: ['OK']
    });
    alert.present();
         }
         else
         {
           let alert = this.alertCtrl.create({
        title: 'Error!',
      subTitle: 'You Can\'t Send Two Request.!',
      buttons: ['OK']
    });
    alert.present(); 
         }
      }
      });
    });
  }
  ionViewWillEnter(){
    Promise.all([this.storage.get('ID'),this.storage.get('SearchBy')])
    .then((val)=>{
      console.log(val[0],val[1]);
      this.bookApi.Details(val[0],val[1])
      .then((res)=>{
         this.data = res;
         this.AuthorFlag=res[0].Author;
         this.AvailableFlag=res[0].Available;
         this.DescriptionFlag=res[0].Description;
         this.DurationFlag=res[0].Duration;
         this.ForBorrowFlag=res[0].ForBorrow;
         this.ForSaleFlag=res[0].ForSale;
         this.OwnerFlag=res[0].Owner;
         this.storage.get("LoginEmail").then((LoginEmail)=>console.log(LoginEmail));
         console.log(this.AuthorFlag,this.AvailableFlag,this.DescriptionFlag,
         this.DurationFlag,this.ForBorrowFlag,this.ForSaleFlag,this.OwnerFlag);
      });
    });
    
  }
}
