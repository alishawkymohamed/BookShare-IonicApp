import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs';
import { Observable } from 'rxjs/Observable';
import { User } from "../Classes/User";
import { Book } from "../Classes/Book";

@Injectable()
export class BookShareApi {

    baseUrl: string = "http://bookshareapi-service20170619054337.azurewebsites.net/api/user";
    // baseUrl: string = "http://localhost:2725/api/user";
    authData: any;
    Govs: any[];
    Cities: any[];
    userAddingStatus: any;
    book: any;
    updateFlag: boolean;
    emails: any;
    deleted: any;
    user: any;

    constructor(private _http: Http) {
    }

    checkAuth(email: string, pass: string): Observable<any> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let obj = { pass: pass, email: email };
        let body = obj;
        return this._http.post(`${this.baseUrl}/checkAuth`, body, headers)
            .map(res => {
                this.authData = res.json();
                return this.authData;
            });
    }

    getGovs() {
        return this._http.get(`${this.baseUrl}/getGovs`)
            .map(res => {
                this.Govs = res.json();
                return this.Govs;
            });
    }

    getCities(id: number) {
        return this._http.get(`${this.baseUrl}/getCities/${id}`)
            .map(res => {
                this.Cities = res.json();
                return this.Cities;
            });
    }

    addUser(obj: User) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let body = obj;
        return this._http.post(`${this.baseUrl}/addUser`, body, headers)
            .map(res => {
                this.userAddingStatus = res.json();
                return this.userAddingStatus;
            });
    }

    editUser(obj: User) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let body = obj;
        return this._http.post(`${this.baseUrl}/editUser`, body, headers)
            .map(res => {
                this.userAddingStatus = res.json();
                return this.userAddingStatus;
            });
    }

    addBook(obj: Book) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let body = obj;
        return this._http.post(`${this.baseUrl}/addBook`, body, headers)
            .map(res => {
                this.userAddingStatus = res.json();
                return this.userAddingStatus;
            });
    }

    getBook(bookId: number) {
        return this._http.get(`${this.baseUrl}/getBook/${bookId}`)
            .map(res => {
                this.book = res.json();
                return this.book;
            });
    }

    getUser(userId: number) {
        return this._http.get(`${this.baseUrl}/getUser/${userId}`)
            .map(res => {
                this.user = res.json();
                return this.user;
            });
    }

    editBook(book: Book) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let body = book;
        return this._http.post(`${this.baseUrl}/editBook`, body, headers)
            .map(res => {
                this.updateFlag = res.json();
                return this.updateFlag;
            });
    }

    getEmails() {
        return this._http.get(`${this.baseUrl}/getEmails`)
            .map(res => {
                this.emails = res.json();
                return this.emails;
            });
    }

    deleteBook(id: number) {
        return this._http.get(`${this.baseUrl}/deleteBook/${id}`)
            .map(res => {
                this.deleted = res.json();
                return this.deleted;
            });
    }
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