import { Injectable } from '@angular/core';
import {Http, Response} from "@angular/http";
import { Observable } from "rxjs/Rx";
import {Book} from "./book";

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class BookService {  

  constructor(private _http: Http) { }

  getBooks(): Observable<Book[]>{
    let url = 'http://dalenguyen.me/laravel5.3/public/api/book';
    return this._http.get(url)
      .map(res=> res.json())
      .catch(this.handleError)
  }

  private handleError (error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}
