import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http'
import 'rxjs';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class BookShareApi {

    baseUrl: string = "http://localhost:2725/api/user";
    authData: any;
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

}