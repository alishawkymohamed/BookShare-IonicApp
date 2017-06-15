import { Component, ElementRef, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { BookShareApi } from '../../shared/shared';
import { ProfilePage } from "../pages";
@Component( {
  selector: 'page-log-in',
  templateUrl: 'log-in.html',
} )
export class LogInPage {

  @ViewChild( 'error' ) ele: ElementRef;

  logInForm: FormGroup;
  data: any;
  errors: any = true;
  re: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  constructor( private navCtrl: NavController,
    private navParams: NavParams,
    private formBuilder: FormBuilder,
    private bookShareApi: BookShareApi,
  ) {


    this.logInForm = this.formBuilder.group( {
      email: ['', Validators.compose( [Validators.required, Validators.pattern( this.re )] )],
      password: ['', Validators.required]
    } );

  }

  onSubmit () {
    this.data = this.bookShareApi.checkAuth( this.logInForm.value.email, this.logInForm.value.password )
      .subscribe( res => {
        this.data = res
        if ( res == true ) {
          this.navCtrl.push( ProfilePage );
        }
        else {
          this.errors = res;
        }
      } );

    // this.bookShareApi.checkAuth( this.logInForm.value.email, this.logInForm.value.password )
    //   .then( data => {
    //     this.data = data;
    //     console.log( this.data );
    //   } );
  }
  hideError () {
    // console.log( this.ele.nativeElement );
    this.errors = true;
  }
  ionViewDidLoad () {

  }

}
