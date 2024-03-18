import { Component, OnDestroy } from '@angular/core';
import { HttpRequestsService } from 'src/app/services/http-requests/http-requests.service';
import { Customer, CustomerChanges, FieldChange, Invoice } from '../models';
import { LazyLoadEvent } from 'primeng/api';
import { Subscription } from 'rxjs';
import { TablePageEvent } from 'primeng/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnDestroy {

  customers: Customer[] = [];
  customersData: Customer[] = [];
  selectedCustomer!: Customer;
  customerCopy!: Customer;
  newCustomer: Customer = new Customer();
  searchString: string;
  invoices: Invoice[] = [];

  showCustomerDetail: boolean;
  showNewCustomerDetail: boolean;
  showInvoiceDetail: boolean;

  loading: boolean = true;
  loadTable: boolean;

  rows: number;
  totalRows: number;

  readonly start: number = 1;
  readonly records: number = 13;

  changes: FieldChange[] = [];

  subs: Subscription[] = [];

  readonly subscriptionStates = [
    { id: 1, code: 'New' },
    { id: 2, code: 'Active' },
    { id: 3, code: 'Suspended' }
  ];

  constructor(public http_requests_service: HttpRequestsService, public router: Router) {
    this.getCustomers(this.start, this.records);
  }

  ngOnDestroy(): void {
    this.subs.forEach((sub)=>{
      sub.unsubscribe();
    });
    this.subs = [];
  }

  filterTable() {
    if (!this.searchString || this.searchString == "")
    {
      this.customers = JSON.parse(JSON.stringify(this.customersData));
    } else  this.customers = this.customersData.filter((x) => { return x.companyName.toUpperCase().includes(this.searchString.toUpperCase());});
  }

  pageChange(event: TablePageEvent) {
    this.loading = true;
    const timeout = setTimeout(() => {
      const currentPage = (event.first / event.rows) + 1;
      this.getCustomers(currentPage, event.rows);
      clearTimeout(timeout);
    }, 1000);
  }

  addCustomerPopup() {
    this.showNewCustomerDetail = true;
  }

  editCustomerPopup() {
    this.customerCopy = JSON.parse(JSON.stringify(this.selectedCustomer));
    this.showCustomerDetail = true;
  }

  deleteCustomer() {
    this.subs.push(this.http_requests_service.deleteCustomer(this.selectedCustomer).subscribe({
      next: (value) => {
        this.customers = [];
        this.loadTable = false;
        this.getCustomers(this.start, this.records);
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
        if(err == 401) this.router.navigate(['/login']);
      }
    }));
  }

  viewInvoicesPopup() {
    this.invoices = [];
    this.subs.push(this.http_requests_service.getInvoices(this.selectedCustomer).subscribe({
      next: (values) => {
        values.forEach((invoice)=> {
          this.invoices.push(invoice);
        });
        this.showInvoiceDetail = true;
      },
      error: (err) => {
        console.error(err);
        if(err == 401) this.router.navigate(['/login']);
      }
    }));
  }

  getCustomers(from: number, rows: number) {
    this.customers = [];
    this.selectedCustomer = null;
    this.subs.push(this.http_requests_service.getCustomers(from, rows).subscribe({
      next: (values) => {
        values.customers?.forEach((value)=> {
          this.customers.push(value);
        });
        this.customersData = JSON.parse(JSON.stringify(this.customers));
        this.totalRows = values.total;
        this.loading = false;
        if(!this.loadTable) this.loadTable = true;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
        if(err == 401) this.router.navigate(['/login']);
      }
    }));
  }

  addItemToChanges(field: string, newCustomer = false) {
    const pastChange = this.changes.find((x) => {
      return x.field === field;
    });
    if (pastChange) {
      this.changes.splice(this.changes.indexOf(pastChange), 1);
    }
    this.changes.push(
      new FieldChange(field, newCustomer ? this.newCustomer[field] : this.customerCopy[field])
    );
  }

  saveCustomerChanges() {
    this.subs.push(this.http_requests_service.editCustomer(new CustomerChanges(this.selectedCustomer.id, this.changes)).subscribe({
      next: (values) => {
        this.showCustomerDetail = false;
        this.customerCopy = new Customer();
        this.loading = true;
        this.getCustomers(this.start, this.records);
      },
      error: (err) => {
        console.error(err);
        if(err == 401) this.router.navigate(['/login']);
      }
    }));
  }

  addNewCustomer() {
    if(this.newCustomer.subscriptionState) {
      this.newCustomer.subscriptionState = this.newCustomer.subscriptionState == 1 ? "New" : (this.newCustomer.subscriptionState == 2 ? "Active" : "Suspended");
    }
    this.subs.push(this.http_requests_service.addCustomer(this.newCustomer).subscribe({
      next: (values) => {
        this.showNewCustomerDetail = false;
        this.newCustomer = new Customer();
        this.loading = true;
        this.getCustomers(this.start, this.records);
      },
      error: (err) => {
        console.error(err);
        if(err == 401) this.router.navigate(['/login']);
      }
    }));
  }
}
