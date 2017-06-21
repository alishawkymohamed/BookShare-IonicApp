import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { BookShareApi } from '../../shared/shared';
import { passwordMatcher } from "../../customValidation/passwordMatcher";
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Storage } from '@ionic/storage';
import { User } from "../../Classes/User";

@Component( {
    selector: 'page-register',
    templateUrl: 'register.html',
} )
export class RegisterPage {

    signUpForm: FormGroup;
    emailRegex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    passwordRegex: RegExp = /^(?=.*[0-9])(?=.*[!@@#$%^&*])[a-zA-Z0-9!@@#$%^&*]{6,20}$/;
    passwordMatch = passwordMatcher;
    govs: any[];
    cities: any[];
    image: any;
    addStatus = false;
    emailExist: boolean = false;
    emails: any[];

    constructor( private navCtrl: NavController,
        private navParams: NavParams,
        private formBuilder: FormBuilder,
        private bookShareApi: BookShareApi,
        private camera: Camera,
        private storage: Storage,
        private loadingController: LoadingController
    ) {
        this.signUpForm = this.formBuilder.group( {
            name: ['', Validators.compose( [Validators.required, Validators.minLength( 2 ), Validators.maxLength( 100 )] )],
            email: ['', Validators.compose( [Validators.required, Validators.pattern( this.emailRegex )] )],
            passwordFG: this.formBuilder.group( {
                password: ['', Validators.compose( [Validators.required, Validators.pattern( this.passwordRegex )] )],
                confirmPassword: ['', Validators.compose( [Validators.required] )]
            }, { validator: this.passwordMatch } ),
            phone: ['', Validators.compose( [Validators.required, Validators.pattern( /[0-9]/ ), Validators.maxLength( 11 ), Validators.minLength( 7 )] )],
            governorate: [''],
            city: ['', Validators.compose( [Validators.required] )],
            address: ['']
        } );
    }

    getImage () {
        const options: CameraOptions = {
            quality: 50,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
        }
        this.camera.getPicture( options ).then(( imageData ) => {
            let base64Image = 'data:image/jpeg;base64,' + imageData;
            this.image = base64Image;
            this.storage.set( "base64Image", imageData );
        }, ( err ) => {
            console.log( "error" );
        } );
    }

    ionViewDidLoad () {
        let loader = this.loadingController.create( {
            content: 'Please Wait ...',
            dismissOnPageChange: true
        } );
        loader.present().then(() => {
            this.bookShareApi.getGovs()
                .subscribe( res => {
                    this.govs = res;
                } );
            this.bookShareApi.getEmails()
                .subscribe( res => {
                    this.storage.set( 'emails', res );
                } );
            loader.dismiss();
        } );
    }

    GovDDL_Changed ( govId ) {
        let loader = this.loadingController.create( {
            content: 'Please Wait ...',
            dismissOnPageChange: true
        } );
        loader.present().then(() => {
            this.bookShareApi.getCities( govId )
                .subscribe( res => {
                    this.cities = res;
                } );
            loader.dismiss();
        } );
    }

    onSubmit () {
        let loader = this.loadingController.create( {
            content: 'Please Wait ...',
            dismissOnPageChange: true
        } );
        loader.present().then(() => {
            this.storage.get( "base64Image" )
                .then( res => {
                    if ( this.signUpForm.valid ) {
                        let obj: User = new User();
                        obj.Address = this.signUpForm.value.address;
                        obj.Name = this.signUpForm.value.name;
                        obj.phone = this.signUpForm.value.phone;
                        obj.CityID = this.signUpForm.value.city;
                        obj.Email = this.signUpForm.value.email;
                        obj.Password = this.signUpForm.value.passwordFG.password;
                        obj.image = res;
                        this.bookShareApi.addUser( obj )
                            .subscribe( res => {
                                this.addStatus = res;
                            } );
                    }
                } )

            loader.dismiss();
        } );
        // this.bookShareApi.checkMail( this.signUpForm.value.email )
        //     .subscribe( res => {
        //         let x = res;
        //         console.log( x );
        //     } )
    }
    continue () {
        this.navCtrl.popToRoot();
    }

    checkEmail ( email: string ) {
        console.log( email );
        this.storage.get( 'emails' ).then( res => {
            this.emails = res;
            if ( this.emails.indexOf( email.toUpperCase() ) != -1 ) {
                this.emailExist = true;
            }
            else {
                this.emailExist = false;
            }
        } );
    }
}