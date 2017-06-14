import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup } from "@angular/forms";

@Component( {
  selector: 'page-log-in',
  templateUrl: 'log-in.html',
} )
export class LogInPage {
  logInForm: FormGroup;
  pattern = "[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}";
  // .pattern ( '^[a-zA-Z0-9._+-]+@[a-zA-Z0-9.-]+.[a-zA-Z0-9-.]+$' )]
  constructor( private navCtrl: NavController,
    private navParams: NavParams,
    public formBuilder: FormBuilder ) {

    this.logInForm = this.formBuilder.group( {
      email: ['', Validators.compose( [Validators.required, Validators.pattern( this.pattern )] )],
      password: ['', Validators.required]
    } );

  }

  onSubmit () {
    console.log( this.logInForm.value );
  }

  ionViewDidLoad () {

  }

}
