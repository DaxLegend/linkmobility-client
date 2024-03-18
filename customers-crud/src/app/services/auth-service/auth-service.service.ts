import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(public http: HttpClient, public router: Router) { }

  async load() {
    await this.validateSession().subscribe({
      error: (err) => {
        console.log(err);
        // Effettua la redirect al componente di login
        this.router.navigate(['/login']);
      }
    });
  }

  validateSession(): Observable<string> {
    const route = environment.API_ADDRESS_INTERFACE + environment.CONTROLLERS_AUTHENTICATION + environment.REQUESTS_SESSION;
    const headers = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }), //Tipo di contenuto mandato
      withCredentials: true //Boolean per mandare i cookie posseduti dalla pagina al server

    };
    return this.http.post<string>(route, {}, headers);
  }

  login(username: string, password: string): Observable<string> {
    const route = environment.API_ADDRESS_INTERFACE + environment.CONTROLLERS_AUTHENTICATION + environment.REQUESTS_LOGIN;
    const headers = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }), //Tipo di contenuto mandato
      withCredentials: true //Boolean per mandare i cookie posseduti dalla pagina al server
    };
    let credentials = new Credentials(username, password);
    return this.http.post<string>(route, credentials, headers);
  }
}

export class Credentials
{
  constructor(
    public Username: string,
    public Password: string) {}
}
