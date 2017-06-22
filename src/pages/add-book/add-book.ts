import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { BookShareApi } from "../../shared/shared";
import { Book } from "../../Classes/Book";
import { Storage } from '@ionic/storage';
import { CameraOptions, Camera } from "@ionic-native/camera";

@Component({
  selector: 'page-add-book',
  templateUrl: 'add-book.html',
})
export class AddBookPage {

  userEmail: string;
  addBookForm: FormGroup;
  availableFlag: boolean = false;
  forSaleFlag: boolean = false;
  forBorrowFlag: boolean = false;
  addStatus: boolean = false;
  image: any;
  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private formBuilder: FormBuilder,
    private bookShareApi: BookShareApi,
    private storage: Storage,
    private loadingController: LoadingController,
    private camera: Camera) {

    this.addBookForm = this.formBuilder.group({
      title: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      author: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      discription: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(200)])],
      forSale: [''],
      price: ['', Validators.compose([Validators.pattern(/[0-9]/)])],
      forBorrow: [''],
      duration: ['', Validators.compose([Validators.pattern(/[0-9]/)])],
      available: ['']
    });
  }

  ionViewDidLoad() {
    this.userEmail = this.navParams.data;
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
    let loader = this.loadingController.create({
      content: 'Please Wait ...'
    });
    loader.present().then(() => {
      if (this.addBookForm.valid) {
        let book = new Book();
        book.Author = this.addBookForm.value.title;
        book.Available = this.availableFlag;
        book.Description = this.addBookForm.value.discription;
        book.Duration = this.addBookForm.value.duration;
        book.ForBorrow = this.forBorrowFlag;
        book.ForSale = this.forSaleFlag;
        book.Price = this.addBookForm.value.price;
        book.Title = this.addBookForm.value.title;

        this.storage.get("base64Cover").then((res) => {
          book.image = res;

          this.storage.get("LoginEmail")
            .then((LoginEmail) => {
              book.email = LoginEmail;
              this.bookShareApi.addBook(book)
                .subscribe(res => {
                  this.addStatus = res;
                  if (res == true) {
                    this.addStatus = true;
                  }
                  else if (res == false) {
                    this.addStatus = false;
                  }
                  if (this.addStatus) {
                    loader.dismiss();
                    this.storage.remove("base64Cover");
                  }
                });
            });
        });
      }
    })

  }

  continue() {
    this.navCtrl.pop();
  }
}
