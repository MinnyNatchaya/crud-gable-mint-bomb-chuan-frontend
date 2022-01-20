import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Data } from '../models/data.model';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  // API
  API: string = `http://localhost:8080/sffCfgLovs`;

  // Http header
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private httpClient: HttpClient) {}

  // Get all objects
  getAll() {
    return this.httpClient.get(`${this.API}`);
  }

  // Get single object
  getOne(id: any) {
    return this.httpClient
      .get(`${this.API}/${id}`, { headers: this.httpHeaders })
      .pipe(
        map((res: any) => {
          return res || {};
        }),
        catchError(this.handleError)
      );
  }

  // //Create
  create(data: Data): Observable<any> {
    let API_URL = `${this.API}`;
    return this.httpClient
      .post(API_URL, data, { headers: this.httpHeaders })
      .pipe(catchError(this.handleError));
  }

  //Update
  update(id: any, data: any): Observable<any> {
    let API_URL = `${this.API}/${id}`;
    return this.httpClient
      .put(API_URL, data, { headers: this.httpHeaders })
      .pipe(catchError(this.handleError));
  }

  // Delete
  delete(id: any): Observable<any> {
    let API_URL = `${this.API}/${id}`;
    return this.httpClient
      .delete(API_URL, { headers: this.httpHeaders })
      .pipe(catchError(this.handleError));
  }

  // Error
  handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      // Handle client error
      errorMessage = err.error.message;
    } else {
      // Handle server error
      errorMessage = `Error code: ${err.status}\nMessage: ${err.message}`;
    }
    console.log(err.message);
    console.dir(err);
    return throwError(errorMessage);
  }
}
