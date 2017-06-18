import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, NavController } from 'ionic-angular';
import { MyApp } from './app.component';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { PendingListPage,LogInPage, HomePage, ProfilePage, RegisterPage, AddBookPage, DetailsPage, SearchPage, ShowNotificationPage, WelcomeHomePage } from "../pages/pages";
import { HttpModule } from "@angular/http";
import { ReactiveFormsModule } from "@angular/forms";
import { BookShareApi, BookAPI } from '../shared/shared';
import { Camera } from '@ionic-native/camera';
import { Storage, IonicStorageModule } from '@ionic/storage';

@NgModule( {
    declarations: [
        MyApp,
        HomePage,
        LogInPage,
        ProfilePage,
        RegisterPage,
        WelcomeHomePage,
        SearchPage,
        DetailsPage,
        ShowNotificationPage,
        PendingListPage,
        AddBookPage
    ],
    imports: [
        BrowserModule,
        HttpModule,
        ReactiveFormsModule,
        IonicModule.forRoot( MyApp ),
        IonicStorageModule.forRoot()
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        HomePage,
        LogInPage,
        ProfilePage,
        RegisterPage,
        WelcomeHomePage,
        SearchPage,
        DetailsPage,
        ShowNotificationPage,
        PendingListPage,
        AddBookPage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        HttpModule,
        BookShareApi,
        BookAPI,
        Camera,
        { provide: ErrorHandler, useClass: IonicErrorHandler }
    ]
} )
export class AppModule { }
