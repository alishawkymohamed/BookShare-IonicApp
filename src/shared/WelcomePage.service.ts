import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs';
import { Observable } from 'rxjs/Observable';
import { Storage } from '@ionic/storage';


@Injectable()
export class BookAPI {
    private BaseUrl = 'http://localhost:2725/api/Book';
    CurrentBooks: any = {};
    CurrentUsers: any = {};
    searchdata: any = {};
    DetailsData: any = {};


    constructor(private http: Http, public storage: Storage) {
    }

    GetMostBorrowedBook() {
        return this.http.get(`${this.BaseUrl}/GetMostBorrowedBook`)
            .map((responce: Response) => {
                this.CurrentBooks = responce.json();
                console.log(responce);
                return this.CurrentBooks;

            });
    }
    GetMostBorrowedUser() {
        return this.http.get(`${this.BaseUrl}/GetMostBorrowedUser`)
            .map((responce: Response) => {
                this.CurrentUsers = responce.json();
                console.log(responce);
                return this.CurrentUsers;

            });
    }
    Search(Search_txt: string, Search_By: string, Email: String): Observable<any> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let obj = { Search_txt: Search_txt, Search_By: Search_By, Email: Email };
        let body = obj;
        return this.http.post(`${this.BaseUrl}/Search`, body, headers)
            .map(res => {
                this.searchdata = res.json();
                return this.searchdata;
            });
    }

    Details(ID: number, SearchBy: string) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let obj = { ID: ID, SearchBy: SearchBy };
        let body = obj;
        return new Promise(resolve => {
            //         this._http.post( `${ this.baseUrl }/checkAuth`, body, headers )
            //             .subscribe( res => resolve( res.json() ) );
            //     
            this.http.post(`${this.BaseUrl}/Details`, body, headers)
                //  .map( res => {
                .subscribe(res => resolve(res.json()));
            // this.DetailsData = res.json();
            //return this.DetailsData;
        });
    }
    GetUserData(Email: string) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let obj = { Email: Email };
        let body = obj;
        return new Promise(resolve => {
            this.http.post(`${this.BaseUrl}/GetUserData`, body, headers)
                .subscribe(res => resolve(res.json()));
        });
    }

    GetUserBook(Email: string) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let obj = { Email: Email };
        let body = obj;
        return new Promise(resolve => {
            this.http.post(`${this.BaseUrl}/GetUserBook`, body, headers)
                .subscribe(res => resolve(res.json()));
        });
    }
    BuyBorrow(SenderMail: string, BookID: number, Action: number) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let obj = { SenderMail: SenderMail, BookID: BookID, Action: Action };
        let body = obj;
        return new Promise(resolve => {
            this.http.post(`${this.BaseUrl}/BuyBorrow`, body, headers)
                .subscribe(res => resolve(res.json()));
        });
    }
    ShowNotification(Email: string) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let obj = { Email: Email };
        let body = obj;
        return new Promise(resolve => {
            this.http.post(`${this.BaseUrl}/ShowNotification`, body, headers)
                .subscribe(res => resolve(res.json()));
        });
    }
    AcceptNotication(NotID: number) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let obj = { NotID: NotID };
        let body = obj;
        return new Promise(resolve => {
            this.http.post(`${this.BaseUrl}/AcceptNotication`, body, headers)
                .subscribe(res => resolve(res.json()));
        });
    }
    PendingList(Email: string) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let obj = { Email: Email };
        let body = obj;
        return new Promise(resolve => {
            this.http.post(`${this.BaseUrl}/PendingList`, body, headers)
                .subscribe(res => resolve(res.json()));
        });
    }
    CancelNot(NotID: number, Email: string) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let obj = { NotID: NotID, Email: Email };
        let body = obj;
        return new Promise(resolve => {
            this.http.post(`${this.BaseUrl}/CancelNot`, body, headers)
                .subscribe(res => resolve(res.json()));
        });
    }
    UserBorrowed(Email: string) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let obj = { Email: Email };
        let body = obj;
        return new Promise(resolve => {
            this.http.post(`${this.BaseUrl}/UserBorrowed`, body, headers)
                .subscribe(res => resolve(res.json()));
        });
    }

}