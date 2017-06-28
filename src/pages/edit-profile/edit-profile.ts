import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Camera, CameraOptions } from "@ionic-native/camera";
import { BookShareApi } from "../../shared/shared";
import { Storage } from '@ionic/storage';
import { User } from "../../Classes/User";
import { passwordMatcher } from "../../customValidation/passwordMatcher.1";

@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html',
})
export class EditProfilePage {

  passwordMatch = passwordMatcher;
  userData: any;
  editProfileForm: FormGroup;
  emailRegex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  passwordRegex: RegExp = /^(?=.*[0-9])(?=.*[!@@#$%^&*])[a-zA-Z0-9!@@#$%^&*]{6,20}$/;
  cities: any;
  govs: any;
  image: any;
  addStatus: any;

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private formBuilder: FormBuilder,
    private bookShareApi: BookShareApi,
    private camera: Camera,
    private storage: Storage,
    private loadingController: LoadingController) {

    this.userData = this.navParams.data;

    this.editProfileForm = this.formBuilder.group({
      name: [this.userData.Name, Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(100)])],
      email: [this.userData.Email, Validators.compose([Validators.required, Validators.pattern(this.emailRegex)])],
      passwordFG: this.formBuilder.group({
        password: [this.userData.Password, Validators.compose([Validators.required, Validators.pattern(this.passwordRegex)])],
        confirmPassword: [this.userData.Password, Validators.compose([Validators.required])]
      }, { validator: this.passwordMatch }),
      phone: [this.userData.Phone, Validators.compose([Validators.required, Validators.pattern(/[0-9]/), Validators.maxLength(11), Validators.minLength(7)])],
      governorate: [this.userData.GovId],
      city: [this.userData.CityID, Validators.compose([Validators.required])],
      address: [this.userData.Address, Validators.compose([Validators.required])]
    });
    this.GovDDL_Changed(this.userData.GovId);
  }

  GovDDL_Changed(govId) {
    let loader = this.loadingController.create({
      content: 'Please Wait ...'
    });
    loader.present().then(() => {
      this.bookShareApi.getCities(govId)
        .subscribe(res => {
          this.cities = res;
          if (this.cities) {
            loader.dismiss();
          }
        });
    });
    if (govId != this.userData.GovId) {
      this.editProfileForm.get('city').setValue(null);
      this.editProfileForm.get('city').setValidators(Validators.required);
      this.editProfileForm.get('city').updateValueAndValidity();
    }
  }

  ionViewDidLoad() {
    let loader = this.loadingController.create({
      content: 'Please Wait ...'
    });
    loader.present().then(() => {
      this.bookShareApi.getGovs()
        .subscribe(res => {
          this.govs = res;
          if (this.govs) {
            loader.dismiss();
          }
        });
    });
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
      this.storage.set("base64Image", imageData);
    }, (err) => {
      console.log("error");
    });
  }


  onSubmit() {
    let loader = this.loadingController.create({
      content: 'Please Wait ...'
    });
    loader.present().then(() => {
      this.storage.get("base64Image")
        .then(ImgRes => {
          if (this.editProfileForm.valid) {
            let obj: User = new User();
            obj.UserId = this.userData.UserID;
            obj.Address = this.editProfileForm.value.address;
            obj.Name = this.editProfileForm.value.name;
            obj.phone = this.editProfileForm.value.phone;
            obj.CityID = this.editProfileForm.value.city;
            obj.Email = this.editProfileForm.value.email;
            obj.Password = this.editProfileForm.value.passwordFG.password;
            if (ImgRes) {
              obj.image = ImgRes;
            }
            this.bookShareApi.editUser(obj)
              .subscribe(res => {
                this.addStatus = res;
                if (this.addStatus) {
                  loader.dismiss();
                  this.storage.remove("base64Image");
                }
              });
          }
        })
    });
  }

  continue() {
    this.navCtrl.pop();
  }

}
