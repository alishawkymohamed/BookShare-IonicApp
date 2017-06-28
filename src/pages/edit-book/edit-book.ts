import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { BookShareApi } from '../../shared/shared';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Book } from "../../Classes/Book";
import { Storage } from '@ionic/storage';
import { CameraOptions, Camera } from "@ionic-native/camera";

@Component({
  selector: 'page-edit-book',
  templateUrl: 'edit-book.html'
})
export class EditBookPage {

  book: any;
  bookId: any;
  editBookForm: FormGroup;
  availableFlag: boolean = false;
  forSaleFlag: boolean = false;
  forBorrowFlag: boolean = false;
  addStatus: boolean = false;
  duration;
  price;
  image;

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private loadingController: LoadingController,
    private bookShareApi: BookShareApi,
    private formBuilder: FormBuilder,
    private storage: Storage,
    private camera: Camera) {

    this.book = this.navParams.data;

    this.editBookForm = this.formBuilder.group({
      title: [this.book.Title, Validators.compose([Validators.required, Validators.minLength(3)])],
      author: [this.book.Author, Validators.compose([Validators.required, Validators.minLength(3)])],
      discription: [this.book.Description, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(200)])],
      forSale: [''],
      price: [this.book.Price, Validators.compose([Validators.pattern(/[0-9]/)])],
      forBorrow: [''],
      duration: [this.book.Duration, Validators.compose([Validators.pattern(/[0-9]/)])],
      available: ['']
    });
    this.availableFlag = this.book.Available;
    this.forSaleFlag = this.book.ForSale;
    this.forBorrowFlag = this.book.ForBorrow;
    this.duration = this.book.Duration;
    this.price = this.book.Price;
    this.image = this.book.Cover;
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

  getImage() {
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }
    this.camera.getPicture(options).then((imageData) => {
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.image = base64Image;
      this.storage.set("base64Cover", imageData);
    }, (err) => {
      console.log("error");
    });
  }

  onSubmit() {

    let book = new Book();
    book.BookId = this.book.BookID
    book.Author = this.editBookForm.value.author;
    book.Available = this.availableFlag;
    book.Description = this.editBookForm.value.discription;
    book.Duration = (this.forBorrowFlag == false) ? '' : this.editBookForm.value.duration;
    book.ForBorrow = this.forBorrowFlag;
    book.ForSale = this.forSaleFlag;
    book.Price = (this.forSaleFlag == false) ? '' : this.editBookForm.value.price;
    book.Title = this.editBookForm.value.title;

    let loader = this.loadingController.create({
      content: 'Updating Your Book ..'
    });
    loader.present().then(() => {
      this.storage.get('base64Cover').then((res) => {
        book.Cover = res;
        if (res != null) {
          this.bookShareApi.editBook(book)
            .subscribe(res => {
              this.addStatus = res;
              if (this.addStatus == true || this.addStatus == false) {
                loader.dismiss();
              }
            });
        }
        else {
          this.bookShareApi.editBook(book)
            .subscribe(res => {
              this.addStatus = res;
              if (this.addStatus == true || this.addStatus == false) {
                loader.dismiss();
              }
            });
        }
      });
    });
  }
}
