import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, tap, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { ICustomer } from '../models/customer.model';
import { IServiceError } from '../models/serviceError.model';


@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  baseApiUrl: string = 'https://localhost:7081';

  constructor (private http: HttpClient) { }

  getAllCustomersMock() {

    // A mock json file if ran without the database
    const dbUrl = '../../assets/db.json';

    return this.http.get<ICustomer[]>(dbUrl).pipe(
      tap(data => console.log(data)),
      catchError(err => of(err))
    );
  }

  getAllCustomers(): Observable<ICustomer[]> {

    return this.http.get<ICustomer[]>(`${ this.baseApiUrl }/api/customers`)
      .pipe(
        tap(data => console.log(data)),
        map(this.extractData),
        catchError(err => of(err))
      );
  }

  getCustomerById(id: string): Observable<ICustomer> {

    return this.http.get<ICustomer>(`${ this.baseApiUrl }/api/customers/${id}`)
      .pipe(
        map(this.extractData),
        catchError(err => of(err))
      );
  }

  addCustomer(customerModel: ICustomer) {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<ICustomer>(`${ this.baseApiUrl }/api/Customers`, customerModel, { headers: headers })
      .pipe(map(this.extractData),
        catchError(this.handleErrors));
  }

  updateCustomer(id: string, updatedCustomer: ICustomer): Observable<ICustomer> {

    return this.http.put<ICustomer>(`${ this.baseApiUrl }/api/customers/${ id }`, updatedCustomer);
  }


  deleteCustomer(id: string): Observable<ICustomer> {

    return this.http.delete<ICustomer>(`${ this.baseApiUrl }/api/customers/${ id }`);
  }

  // Get data successfully from api call
  private extractData(response: any) {
    if (response.status < 200 || response.status >= 300) {
      throw new Error('Bad response status: ' + response.status);
    }

    const body = response;
    return body || {};
  }

  private handleErrors(error: any): Observable<any> {

    return throwError(error.error);
  }
}
