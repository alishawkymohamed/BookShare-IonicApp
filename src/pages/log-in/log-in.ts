import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup } from "@angular/forms";

@Component( {
  selector: 'page-log-in',
  templateUrl: 'log-in.html',
} )
export class LogInPage {
  logInForm: FormGroup;

  constructor( private navCtrl: NavController,
    private navParams: NavParams,
    public formBuilder: FormBuilder ) {

    this.logInForm = this.formBuilder.group( {
      email: ['', Validators.compose( [Validators.required] )],
      password: ['', Validators.required]
    } );

  }

  onSubmit () {
    console.log( this.logInForm.value );
  }

  ionViewDidLoad () {

  }

}
