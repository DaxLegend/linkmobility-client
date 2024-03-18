import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer, CustomerChanges, CustomerData, FieldChange, Invoice, Paginator } from 'src/app/components/models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpRequestsService {

  constructor(public http: HttpClient) { }

  getCustomers(start: number, rows: number): Observable<CustomerData> {
    const route = environment.API_ADDRESS_INTERFACE + environment.CONTROLLERS_CUSTOMERS + environment.REQUESTS_GET_CUSTOMERS;
    const headers = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }), //Tipo di contenuto mandato
      withCredentials: true //Boolean per mandare i cookie posseduti dalla pagina al server
    };
    let paginator = new Paginator(start, rows);
    return this.http.post<CustomerData>(route, paginator, headers);
  }

  getInvoices(customer: Customer): Observable<Invoice[]> {
    const route = environment.API_ADDRESS_INTERFACE + environment.CONTROLLERS_CUSTOMERS + environment.REQUESTS_GET_INVOICES;
    const headers = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }), //Tipo di contenuto mandato
      withCredentials: true //Boolean per mandare i cookie posseduti dalla pagina al server
    };
    return this.http.post<Invoice[]>(route, customer, headers);
  }

  editCustomer(changes: CustomerChanges): Observable<string> {
    const route = environment.API_ADDRESS_INTERFACE + environment.CONTROLLERS_CUSTOMERS + environment.REQUESTS_EDIT_CUSTOMER;
    const headers = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }), //Tipo di contenuto mandato
      withCredentials: true //Boolean per mandare i cookie posseduti dalla pagina al server
    };
    return this.http.post<string>(route, changes, headers);
  }

  addCustomer(customer: Customer): Observable<string> {
    const route = environment.API_ADDRESS_INTERFACE + environment.CONTROLLERS_CUSTOMERS + environment.REQUESTS_ADD_CUSTOMER;
    const headers = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }), //Tipo di contenuto mandato
      withCredentials: true //Boolean per mandare i cookie posseduti dalla pagina al server
    };
    return this.http.post<string>(route, customer, headers);
  }

  deleteCustomer(customer: Customer): Observable<string> {
    const route = environment.API_ADDRESS_INTERFACE + environment.CONTROLLERS_CUSTOMERS + environment.REQUESTS_DELETE_CUSTOMER;
    const headers = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }), //Tipo di contenuto mandato
      withCredentials: true //Boolean per mandare i cookie posseduti dalla pagina al server
    };
    return this.http.post<string>(route, customer, headers);
  }
}

