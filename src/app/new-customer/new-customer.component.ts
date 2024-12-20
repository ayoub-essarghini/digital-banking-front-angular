import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Customer} from "../model/customer.model";
import {CustomerService} from "../services/customer.service";
import {catchError, throwError} from "rxjs";
import {NgIf} from "@angular/common";
import {Router} from "@angular/router";

@Component({
  selector: 'app-new-customer',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './new-customer.component.html',
  styleUrl: './new-customer.component.css'
})
export class NewCustomerComponent {
  newCustomerFormGroup!:FormGroup;
  errorMsg:any;
  constructor(private fb:FormBuilder,private customerService:CustomerService,private router:Router) {
    this.newCustomerFormGroup = this.fb.group({
      name: this.fb.control(null,[Validators.required,Validators.minLength(4)]),
      email: this.fb.control(null,[Validators.required,Validators.email])
    })
  }

  handleNewCustomer() {
  let customer:Customer = this.newCustomerFormGroup.value;
  this.customerService.saveCustomer(customer).subscribe({
    next:(data)=>{
      alert("Customer has been added successfully !")
      this.newCustomerFormGroup.reset()
      this.router.navigateByUrl("/customers")
    },
    error:(err)=>{
      console.log(err)
    }
  });

  }
}
