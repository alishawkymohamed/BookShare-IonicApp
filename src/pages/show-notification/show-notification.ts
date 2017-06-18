import { Component } from '@angular/core';
import { NavController, NavParams,ActionSheetController,AlertController } from 'ionic-angular';
import {BookAPI} from '../../shared/shared';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-show-notification',
  templateUrl: 'show-notification.html',
})
export class ShowNotificationPage {
  data:any;
  Action:any;
  notID:any;
  flag : boolean = false;
  errors: any = true;
  constructor(public navCtrl: NavController, public navParams: NavParams,
              private bookAPI:BookAPI,public storage:Storage,public actionSheetCtrl: ActionSheetController,public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShowNotificationPage');
  }

ionViewWillEnter(){
 this.storage.get("LoginEmail").then((LoginEmail)=>{
    this.bookAPI.ShowNotification(LoginEmail).then((res:Array<any>)=>{
      this.data=res;
      for (var index = 0; index < res.length; index++)
       {
        if(res[index].Action==0)
      {
        res[index].Action="Borrows";
      }
      else
      {
        res[index].Action="Buy";
      }
      this.notID=res[index].ID;
      this.storage.set("NotID",this.notID);
    }
    if(this.data==false)
    {
      this.flag=true;
     this.errors="There is No Notification to Show!";
    }
    })
 });
}
AcceptNot()
{
   let actionSheet = this.actionSheetCtrl.create({
      title: 'Modify your Notification',
      buttons: [
       {
          text: 'Accept',
          role:'accept',
          handler: () => {
            this.storage.get("NotID").then((NotID)=>
            {
              this.bookAPI.AcceptNotication(NotID).then(res=>{
                if(res==true)
                {
                    let alert = this.alertCtrl.create({
                      title: 'Success!',
                      subTitle: 'You have Just accepted the request!',
                      buttons: ['OK']
                       });
                    alert.present();
                    this.ionViewWillEnter();
                }
                else
                {
                 let alert = this.alertCtrl.create({
                      title: 'Error !',
                      subTitle: 'There is an Error.. We are very sorry..We will fix this soon!',
                      buttons: ['OK']
                       });
                    alert.present(); 
                }
              })
            });
            console.log('Accept clicked');
          }
        },{
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
}
}
