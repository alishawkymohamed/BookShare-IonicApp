import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { BookShareApi } from "../../shared/shared";

@Component( {
  selector: 'page-add-book',
  templateUrl: 'add-book.html',
} )
export class AddBookPage {

  userEmail: string;
  addBookForm: FormGroup
  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private formBuilder: FormBuilder,
    private bookShareApi: BookShareApi ) {

    this.addBookForm = this.formBuilder.group( {
      title: ['', Validators.compose( [Validators.required, Validators.minLength( 3 )] )],
      author: ['', Validators.compose( [Validators.required, Validators.minLength( 3 )] )],
      discription: ['', Validators.compose( [Validators.minLength( 3 ), Validators.maxLength( 200 )] )],
      forSale: [''],
      price: ['', Validators.compose( [Validators.pattern( /[0-9]/ )] )],
      forBorrow: [''],
      duration: ['', Validators.compose( [Validators.pattern( /[0-9]/ )] )],
      available: ['']
    } );
  }

  ionViewDidLoad () {
    this.userEmail = this.navParams.data;
    console.log( this.userEmail );
  }


  onSubmit () {
    console.log( this.addBookForm.value );
  }
}
