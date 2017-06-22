import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { BookAPI, BookShareApi } from '../../shared/shared';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Book } from "../../Classes/Book";
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-edit-book',
  templateUrl: 'edit-book.html',
})
export class EditBookPage {

  book: any;
  bookId: any;
  editBookForm: FormGroup;
  availableFlag: boolean = false;
  forSaleFlag: boolean = false;
  forBorrowFlag: boolean = false;
  addStatus: boolean = false;
  returnBook: any;

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private loadingController: LoadingController,
    private bookShareApi: BookShareApi,
    private formBuilder: FormBuilder,
    private storage: Storage) {

  }

  ionViewWillEnter() {
    this.storage.remove('book');
    this.storage.get('book').then((res) => {
    });
    this.bookId = this.navParams.data;
    let loader = this.loadingController.create({
      content: 'Loading Book Data ..'
    });
    loader.present().then(() => {
      this.bookShareApi.getBook(this.bookId)
        .subscribe(res => {
          this.book = res;
          this.storage.set('book', this.book);
          if (this.book) {
            loader.dismiss();
          }
        });
    });
    this.storage.get('book').then((res) => {
      this.returnBook = res;
      console.log(this.returnBook);
      if (this.returnBook) {
        this.editBookForm = this.formBuilder.group({
          title: [this.returnBook.Title, Validators.compose([Validators.required, Validators.minLength(3)])],
          author: [this.returnBook.Author, Validators.compose([Validators.required, Validators.minLength(3)])],
          discription: [this.returnBook.Description, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(200)])],
          forSale: [''],
          price: [this.returnBook.Price, Validators.compose([Validators.pattern(/[0-9]/)])],
          forBorrow: [''],
          duration: [this.returnBook.Duration, Validators.compose([Validators.pattern(/[0-9]/)])],
          available: ['']
        });
        this.availableFlag = this.returnBook.Available;
        this.forSaleFlag = this.returnBook.ForSale;
        this.forBorrowFlag = this.returnBook.ForBorrow;
      }
    });
  }
  ionViewWillLeave() {
    this.storage.remove('book');
  }

  ionViewWillUnload() {
    this.storage.remove('book');
  }

  ionViewDidLoad() {

  }

  changeAvailable() {
    this.availableFlag = !this.availableFlag;
  }

  changeForBorrow() {
    this.forBorrowFlag = !this.forBorrowFlag;
  }

  changeForSale() {
    this.forSaleFlag = !this.forSaleFlag;
  }

  continue() {
    this.navCtrl.pop();
  }

  onSubmit() {

    let book = new Book();
    book.BookId = this.navParams.data;
    book.Author = this.editBookForm.value.author;
    book.Available = this.availableFlag;
    book.Description = this.editBookForm.value.discription;
    book.Duration = (this.forBorrowFlag == false) ? '' : this.editBookForm.value.duration;
    book.ForBorrow = this.forBorrowFlag;
    book.ForSale = this.forSaleFlag;
    book.Price = (this.forSaleFlag == false) ? '' : this.editBookForm.value.price;
    book.Title = this.editBookForm.value.title;

    console.log(book);

    let loader = this.loadingController.create({
      content: 'Updating Your Book ..'
    });
    loader.present().then(() => {
      this.bookShareApi.editBook(book)
        .subscribe(res => {
          this.addStatus = res;
          if (this.addStatus) {
            loader.dismiss();
            this.storage.remove('book');
          }
        });
    });
  }

}
