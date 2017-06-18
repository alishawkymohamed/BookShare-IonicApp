import { Injectable } from '@angular/core';
import { Http } from '@angular/http'
import 'rxjs';
import { Observable } from 'rxjs/Observable';
import { User } from "../Classes/User";

@Injectable()
export class BookShareApi {

    baseUrl: string = "http://localhost:2725/api/user";
    authData: any;
    Govs: any[];
    Cities: any[];
    userAddingStatus: any;
    constructor( private _http: Http ) {
    }

    checkAuth ( email: string, pass: string ): Observable<any> {
        let headers = new Headers();
        headers.append( 'Content-Type', 'application/json' );
        let obj = { pass: pass, email: email };
        let body = obj;
        return this._http.post( `${ this.baseUrl }/checkAuth`, body, headers )
            .map( res => {
                this.authData = res.json();
                return this.authData;
            } );
    }

    getGovs () {
        return this._http.get( `${ this.baseUrl }/getGovs` )
            .map( res => {
                this.Govs = res.json();
                return this.Govs;
            } );
    }

    getCities ( id: number ) {
        return this._http.get( `${ this.baseUrl }/getCities/${ id }` )
            .map( res => {
                this.Cities = res.json();
                return this.Cities;
            } );
    }

    addUser ( obj: User ) {
        let headers = new Headers();
        headers.append( 'Content-Type', 'application/json' );
        let body = obj;
        return this._http.post( `${ this.baseUrl }/addUser`, body, headers )
            .map( res => {
                this.userAddingStatus = res.json();
                return this.userAddingStatus;
            } );
    }
}

    // checkMail ( emailz: string ): Observable<any> {
    //     let headers = new Headers();
    //     headers.append( 'Content-Type', 'application/json' );
    //     let obj = { email: emailz };
    //     let body = new FormData();
    //     body.append( "email", emailz );

    //     return this._http.post( `${ this.baseUrl }/checkemail`, body, headers )
    //         .map( res => {
    //             let emailExistance = res.json();
    //             return emailExistance;
    //         } );
    // }
    // checkAuth ( email: string, pass: string ) {
    //     let headers = new Headers();
    //     headers.append( 'Content-Type', 'application/json' );
    //     let obj = { pass: pass, email: email };
    //     let body = obj;

    //     return new Promise( resolve => {
    //         this._http.post( `${ this.baseUrl }/checkAuth`, body, headers )
    //             .subscribe( res => resolve( res.json() ) );
    //     } );
    // }