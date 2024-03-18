export interface EnvironmentModel
{
  /** Se mi trovo in produzione */
  production: boolean;

  /** Interfaccia dove trovare l'API */
  API_ADDRESS_INTERFACE: string;

  CONTROLLERS_AUTHENTICATION: string;
  REQUESTS_LOGIN: string;
  REQUESTS_SESSION: string;

  CONTROLLERS_CUSTOMERS: string;
  REQUESTS_GET_CUSTOMERS: string;
  REQUESTS_GET_INVOICES: string;
  REQUESTS_EDIT_CUSTOMER: string;
  REQUESTS_ADD_CUSTOMER: string;
  REQUESTS_DELETE_CUSTOMER: string;
}
