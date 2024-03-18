import { Component } from '@angular/core';
import { AuthServiceService } from 'src/app/services/auth-service/auth-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'customers-crud';

  constructor(public auth_service: AuthServiceService) {
    this.initApp();
  }

  async initApp() {
    await this.auth_service.load();
  }
}
