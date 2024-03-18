import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthServiceService } from 'src/app/services/auth-service/auth-service.service';
import { HttpRequestsService } from 'src/app/services/http-requests/http-requests.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  username!: string;
  password!: string;

  isLoading: boolean;

  constructor(public auth_service: AuthServiceService, public router: Router) {}

  login() {
    this.isLoading = true;
    this.auth_service.login(this.username, this.password).subscribe({
      next: (result) => {
        try {
          this.isLoading = false;
          let sessionToken = this.getCookie('sessionToken');
          let helper = new JwtHelperService();
          localStorage.setItem('username', helper.decodeToken(sessionToken).username);
          this.router.navigate(['/home']);
        } catch(ex) {
          console.error(ex);
        }
      },
      error: (err) => {
        this.isLoading = false;
        alert("Authentication failed");
      },
    })
  }

  public getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        c = c.substring(name.length, c.length);
        return c.substring(1,c.length-1);
      }
    }
    return "";
  }

}
