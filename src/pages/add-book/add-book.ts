import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { BookShareApi } from "../../shared/shared";
import { Book } from "../../Classes/Book";
import { Storage } from '@ionic/storage';

@Component( {
  selector: 'page-add-book',
  templateUrl: 'add-book.html',
} )
export class AddBookPage {

  userEmail: string;
  addBookForm: FormGroup;
  availableFlag: boolean = false;
  forSaleFlag: boolean = false;
  forBorrowFlag: boolean = false;
  addStatus: boolean = false;

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private formBuilder: FormBuilder,
    private bookShareApi: BookShareApi,
    private storage: Storage ) {

    this.addBookForm = this.formBuilder.group( {
      title: ['', Validators.compose( [Validators.required, Validators.minLength( 3 )] )],
      author: ['', Validators.compose( [Validators.required, Validators.minLength( 3 )] )],
      discription: ['', Validators.compose( [Validators.required, Validators.minLength( 3 ), Validators.maxLength( 200 )] )],
      forSale: [''],
      price: ['', Validators.compose( [Validators.pattern( /[0-9]/ )] )],
      forBorrow: [''],
      duration: ['', Validators.compose( [Validators.pattern( /[0-9]/ )] )],
      available: ['']
    } );
  }

  ionViewDidLoad () {
    this.userEmail = this.navParams.data;
  }

  changeAvailable () {
    this.availableFlag = !this.availableFlag;
  }

  changeForBorrow () {
    this.forBorrowFlag = !this.forBorrowFlag;
  }

  changeForSale () {
    this.forSaleFlag = !this.forSaleFlag;
  }
  onSubmit () {

    let book = new Book();
    book.Author = this.addBookForm.value.title;
    book.Available = this.availableFlag;
    book.Description = this.addBookForm.value.discription;
    book.Duration = this.addBookForm.value.duration;
    book.ForBorrow = this.forBorrowFlag;
    book.ForSale = this.forSaleFlag;
    book.Price = this.addBookForm.value.price;
    book.Title = this.addBookForm.value.title;
    this.storage.get( "LoginEmail" )
      .then(( LoginEmail ) => {
        book.email = LoginEmail;
        this.bookShareApi.addBook( book )
          .subscribe( res => {
            this.addStatus = res;
            if ( res == true ) {
              this.addStatus = true;
            }
            else if ( res == false ) {
              this.addStatus = false;
            }
          } );
      } );


  }
  continue () {
    this.navCtrl.pop();
  }
}
