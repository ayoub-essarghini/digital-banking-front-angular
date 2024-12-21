import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {routes} from "../app.routes";
import {Customer} from "../model/customer.model";

@Component({
  selector: 'app-customer-account',
  standalone: true,
  imports: [],
  templateUrl: './customer-account.component.html',
  styleUrl: './customer-account.component.css'
})
export class CustomerAccountComponent implements OnInit{
  customerId!:string;
  customer!:Customer;
  constructor(private route:ActivatedRoute,private router:Router) {
    this.customer = this.router.getCurrentNavigation()?.extras.state as Customer;
  }
    ngOnInit(): void {
    this.customerId = this.route.snapshot.params['id']
    }

}
