import {Component, OnInit} from '@angular/core';
import {AsyncPipe, JsonPipe, NgForOf, NgIf} from "@angular/common";
import {CustomerService} from "../services/customer.service";
import {catchError, map, Observable, throwError} from "rxjs";
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {Customer} from "../model/customer.model";


@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [NgForOf, NgIf, JsonPipe, AsyncPipe, ReactiveFormsModule],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css'
})
export class CustomersComponent implements OnInit {
  customers!: Observable<any>;
  errorMsg!: string;
  searchFormGroup!: FormGroup;

  constructor(private customerService: CustomerService, private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.searchFormGroup = this.formBuilder.group({
      keyword: this.formBuilder.control("")
    });
    this.handleSearchCustomers()

  }

  handleSearchCustomers() {
    let keyword = this.searchFormGroup?.value.keyword;

    this.customers = this.customerService.searchCustomer(keyword).pipe(
      catchError(err => {
        this.errorMsg = err.message;
        return throwError(err);
      })
    );
  }

  deleteCustomer(c: Customer) {
    let conf = confirm("Are you sure ?");
    if (!conf) return;
    this.customerService.deleteCustomer(c.id).subscribe({
      next: (resp) => {
        this.customers = this.customers.pipe(
          map(data => {
            let index = data.indexOf(c);
            data.slice(index, 1);
            return data;
          })
        )
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}
