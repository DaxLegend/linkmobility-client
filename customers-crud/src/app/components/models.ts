
export class Customer {
  constructor(
    public id?: string,
    public companyName?: string,
    public address?: string,
    public state?: string,
    public country?: string,
    public subscriptionState?: string | number,
    public numberOfInvoices = 0
  ) {}
}

export class CustomerData {
  constructor(
    public customers: Customer[] = [],
    public total: number
  ) {}
}

export class Invoice {
  constructor(
    public invoiceNumber: string,
    public date: string,
    public total: number,
    public customerId: string
  ) {}
}

export class FieldChange {
  constructor(
    public field: string,
    public value: any
  ) {}
}

export class CustomerChanges {
  constructor(
    public id: string,
    public changes: FieldChange[]
  ) {}
}

export class Paginator {
  constructor(
    public first: number,
    public rows: number
  ) {}
}
