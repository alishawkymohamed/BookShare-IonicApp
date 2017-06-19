import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { BookAPI, BookShareApi } from '../../shared/shared';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Book } from "../../Classes/Book";

@Component( {
  selector: 'page-edit-book',
  templateUrl: 'edit-book.html',
} )
export class EditBookPage {

  book: any;
  bookId: any;
  editBookForm: FormGroup;
  availableFlag: boolean = false;
  forSaleFlag: boolean = false;
  forBorrowFlag: boolean = false;
  addStatus: boolean = false;

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private loadingController: LoadingController,
    private bookShareApi: BookShareApi,
    private formBuilder: FormBuilder ) {

    this.editBookForm = this.formBuilder.group( {
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
    this.bookId = this.navParams.data;
    let loader = this.loadingController.create( {
      content: 'Loading Book Data ..',
      dismissOnPageChange: true
    } );
    loader.present().then(() => {
      this.bookShareApi.getBook( this.bookId )
        .subscribe( res => {
          this.book = res;
          console.log( this.book );
        } );
    } );
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

  continue () {
    this.navCtrl.pop();
  }

  onSubmit () {

    let book = new Book();
    book.BookId = this.navParams.data;
    book.Author = this.editBookForm.value.title;
    book.Available = this.availableFlag;
    book.Description = this.editBookForm.value.discription;
    book.Duration = ( this.forBorrowFlag == false ) ? false : this.editBookForm.value.duration;
    book.ForBorrow = this.forBorrowFlag;
    book.ForSale = this.forSaleFlag;
    book.Price = ( this.forSaleFlag == false ) ? false : this.editBookForm.value.price;
    book.Title = this.editBookForm.value.title;

    console.log( book );

    let loader = this.loadingController.create( {
      content: 'Updating Your Book ..',
      dismissOnPageChange: true
    } );
    loader.present().then(() => {
      this.bookShareApi.editBook( book )
        .subscribe( res => {
          this.addStatus = res;
          loader.dismiss();
        } );
    } );
  }

}
