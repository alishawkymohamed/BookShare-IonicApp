import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http'
import 'rxjs';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class BookShareApi {

    baseUrl: string = "http://localhost:2725/api/user";
    constructor( private _http: Http ) {

    }
    checkAuth ( email: string, pass: string ) {
        let headers = new Headers();
        headers.append( 'Content-Type', 'application/json' );
        let obj = { pass: pass, email: email };
        let body = obj;
        this._http.post( `${ this.baseUrl }/checkAuth`, body, headers )
            .map( res => res.json() )
            .subscribe( data => {
                console.log( data );
                return ( data );
            } );


    }


}