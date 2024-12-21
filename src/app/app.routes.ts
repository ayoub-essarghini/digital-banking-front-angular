import { Routes } from '@angular/router';
import {CustomersComponent} from "./customers/customers.component";
import {AccountsComponent} from "./accounts/accounts.component";
import {NewCustomerComponent} from "./new-customer/new-customer.component";
import {CustomerAccountComponent} from "./customer-account/customer-account.component";

export const routes: Routes = [
  {
    path:"customers",component: CustomersComponent
  },
  {
    path:"new-customer",component: NewCustomerComponent
  },
  {
    path:"accounts",component: AccountsComponent
  },
  {
    path:"customer-accounts/:id",component: CustomerAccountComponent
  }
];
