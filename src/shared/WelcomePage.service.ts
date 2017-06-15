import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class BookAPI {
    private BaseUrl='http://localhost:2725/api/Book';
    CurrentBooks:any = {};
    constructor( private http :Http ) { }
    
    GetMostBorrowedBook()
    {
        return this.http.get(`${this.BaseUrl}/GetMostBorrowedBook`)
        .map((responce:Response)=>{
            this.CurrentBooks= responce.json();
             console.log( responce );
            return this.CurrentBooks;

        });

    }
}