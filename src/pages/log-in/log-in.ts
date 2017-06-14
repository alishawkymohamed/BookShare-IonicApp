import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { BookShareApi } from '../../shared/shared';
@Component( {
  selector: 'page-log-in',
  templateUrl: 'log-in.html',
} )
export class LogInPage {
  logInForm: FormGroup;
  data: any;
  constructor( private navCtrl: NavController,
    private navParams: NavParams,
    private formBuilder: FormBuilder,
    private bookShareApi: BookShareApi ) {

    this.logInForm = this.formBuilder.group( {
      email: ['', Validators.compose( [Validators.required] )],
      password: ['', Validators.required]
    } );

  }

  onSubmit () {
    console.log( this.logInForm.value );
    this.data = this.bookShareApi.checkAuth( this.logInForm.value.email, this.logInForm.value.password );
    console.log( this.data );
  }

  ionViewDidLoad () {

  }

}
