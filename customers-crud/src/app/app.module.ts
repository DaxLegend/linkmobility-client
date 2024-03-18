import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app-component/app.component';

/**PrimeNG */
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { RadioButtonModule } from 'primeng/radiobutton';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ToastModule } from 'primeng/toast';
import { MessagesModule } from 'primeng/messages';
import { PasswordModule } from 'primeng/password';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { TabMenuModule } from 'primeng/tabmenu';
import { DialogModule } from 'primeng/dialog';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { OrganizationChartModule } from 'primeng/organizationchart';
import { FileUploadModule } from 'primeng/fileupload';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MultiSelectModule } from 'primeng/multiselect';
import { TreeModule } from 'primeng/tree';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';

/**Angular */
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

/**Animazioni Browser */
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

/**Componenti */
import { CustomerDetailComponent } from './components/customer-detail/customer-detail.component';
import { CustomersComponent } from './components/customers/customers.component';
import { InvoiceDetailComponent } from './components/invoice-detail/invoice-detail.component';
import { LoginComponent } from './components/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    CustomerDetailComponent,
    CustomersComponent,
    InvoiceDetailComponent,
    LoginComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    ButtonModule,
    CheckboxModule,
    DropdownModule,
    InputTextModule,
    InputNumberModule,
    RadioButtonModule,
    SplitButtonModule,
    TableModule,
    ToastModule,
    MessagesModule,
    PasswordModule,
    CalendarModule,
    CardModule,
    ConfirmPopupModule,
    TabMenuModule,
    DialogModule,
    TooltipModule,
    ProgressSpinnerModule,
    OrganizationChartModule,
    FileUploadModule,
    TreeModule,
    FormsModule,
    MultiSelectModule,
    BrowserAnimationsModule,
    ConfirmDialogModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
