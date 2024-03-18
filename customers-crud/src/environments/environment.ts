import { EnvironmentModel } from './environment.model';

export const environment: EnvironmentModel = {

  production: false,

  /** Interfaccia dove trovare l'API */
  API_ADDRESS_INTERFACE: window.location.protocol + '//' + window.location.hostname + ':5003/',

  CONTROLLERS_AUTHENTICATION: 'Auth/',
  CONTROLLERS_CUSTOMERS: 'Customers/',

  REQUESTS_LOGIN: "Login",
  REQUESTS_SESSION: "Session",

  REQUESTS_GET_CUSTOMERS: "GetCustomers",
  REQUESTS_GET_INVOICES: "GetInvoices",
  REQUESTS_EDIT_CUSTOMER: "EditCustomer",
  REQUESTS_ADD_CUSTOMER: "AddCustomer",
  REQUESTS_DELETE_CUSTOMER: "DeleteCustomer"
};

