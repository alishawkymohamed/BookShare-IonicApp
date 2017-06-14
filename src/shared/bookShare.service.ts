import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http'
import 'rxjs';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class BookShareApi {
    currentTournament: any = {};

    constructor( private _http: Http ) {

    }
    getTournaments () {
        return new Promise( resolve => {
            this._http.get( '' )
                .subscribe( res => resolve( res.json() ) );
        } );
    }


}