import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { BookShareApi } from '../../shared/shared';

@Component( {
  selector: 'page-register',
  templateUrl: 'register.html',
} )
export class RegisterPage {

  signUpForm: FormGroup;
  emailRegex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  passwordRegex: RegExp = /^(?=.*[0-9])(?=.*[!@@#$%^&*])[a-zA-Z0-9!@@#$%^&*]{6,20}$/;
  constructor( private navCtrl: NavController,
    private navParams: NavParams,
    private formBuilder: FormBuilder,
    private bookShareApi: BookShareApi ) {

    this.signUpForm = formBuilder.group( {
      name: ['', Validators.compose( [Validators.required, Validators.minLength( 2 ), Validators.maxLength( 100 )] )],
      email: ['', Validators.compose( [Validators.required, Validators.pattern( this.re ), Validators.maxLength( 200 )] )],
      password: ['', Validators.compose( [Validators.required,Validators.pattern(this.passwordRegex)] )]
    } );
  }

  ionViewDidLoad () {
    console.log( 'ionViewDidLoad RegisterPage' );
  }

}
