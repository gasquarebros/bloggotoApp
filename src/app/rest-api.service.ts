import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { forkJoin } from 'rxjs';


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Access-Control-Allow-Origin': '*' })
};
// const apiUrl = 'http://localhost/bloggotoweb/';
// const apiUrl = 'http://192.168.1.11/bloggotoweb/';
const apiUrl = 'https://cors-anywhere.herokuapp.com/http://www.bloggoto.com/';

@Injectable({
  providedIn: 'root'
})
export class RestApiService {

  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  }

  private extractData(res: Response) {
    const body = res;
    return body || { };
  }


  getStaticData(params, reqOpts): Observable<any> {
    const response1 = this.http.get(apiUrl + params, httpOptions);
    return forkJoin([response1]);
  }

  postData(params, data) {
    const response1 = this.http.post(apiUrl + params, data);
    return forkJoin([response1]);
  }
/*
  getStaticDatas(params) {
    console.log('check');
    console.log(params);
    return new Promise((resolve, reject) => {
      const headers = new Headers();
      headers.append('Access-Control-Allow-Origin', '*');
      headers.append('origin', '*');
      headers.append('Authorization', 'Bearer');

      const headerss = new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8',
        id: '105',
        user_id: '90'
      });
      console.log(headers);
      console.log('promise inn');
      this.http.get(apiUrl + params, { headers })
      .subscribe(res => {
        console.log(res);
        resolve(res.json());
      },
      (err) => {
        reject(err);
      });
    });
  }

*/

}
