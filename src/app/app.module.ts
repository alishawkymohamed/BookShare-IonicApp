import { WelcomeHomePage } from './../pages/welcome-home/welcome-home';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LogInPage, HomePage } from "../pages/pages";
import { HttpModule } from "@angular/http";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule( {
  declarations: [
    MyApp,
    HomePage,
    LogInPage,
    WelcomeHomePage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    ReactiveFormsModule,
    IonicModule.forRoot( MyApp ),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LogInPage,
    WelcomeHomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    HttpModule,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
} )
export class AppModule { }
