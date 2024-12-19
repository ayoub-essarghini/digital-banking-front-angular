import {Component, OnInit} from '@angular/core';
import {AsyncPipe, JsonPipe, NgForOf, NgIf} from "@angular/common";
import {CustomerService} from "../services/customer.service";
import {catchError, Observable, throwError} from "rxjs";


@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [NgForOf, NgIf, JsonPipe, AsyncPipe],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css'
})
export class CustomersComponent implements OnInit{
  customers!:Observable<any>;
  errorMsg! :string;
  constructor(private customerService:CustomerService) {
  }

    ngOnInit(): void {
     this.customers =  this.customerService.getCustomer().pipe(
       catchError(err => {
         this.errorMsg = err.message;
         return throwError(err);
       })
     );

    }

}
