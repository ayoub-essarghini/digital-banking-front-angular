import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {AccountService} from "../services/account.service";
import {Observable} from "rxjs";
import {AccountDetails} from "../model/account.model";
import {AsyncPipe, DatePipe, DecimalPipe, JsonPipe, NgClass, NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-accounts',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    AsyncPipe,
    DecimalPipe,
    NgForOf,
    DatePipe,
    NgClass,
    JsonPipe
  ],
  templateUrl: './accounts.component.html',
  styleUrl: './accounts.component.css'
})
export class AccountsComponent implements OnInit {
  accountForm!: FormGroup;
  currentPage: number = 0;
  pageSize: number = 5;
  accountDetails!: Observable<AccountDetails>;
  operationForm!: FormGroup;


  constructor(private fb: FormBuilder, private accountService: AccountService) {
  }

  ngOnInit(): void {
    this.accountForm = this.fb.group({
      accountId: this.fb.control('')
    })
    this.operationForm = this.fb.group({
      operationType: this.fb.control(null),
      amount: this.fb.control(0),
      description: this.fb.control(null),
      accountDest: this.fb.control(null)
    })
  }

  handleAccount() {
    let accountId: string = this.accountForm.value.accountId;
    this.accountDetails = this.accountService.getAccount(accountId, this.currentPage, this.pageSize);


  }

  goToPage(p: number) {
    this.currentPage = p;
    this.handleAccount();
  }

  handleOperations() {
    let accountId = this.accountForm.value.accountId;
    console.log("account id == "+accountId)
    let operationType = this.operationForm.value.operationType;
    if (operationType == "DEBIT") {
      this.accountService.debit(accountId,this.operationForm.value.amount,this.operationForm.value.description).subscribe({
        next:(res)=>{
          alert("Debit done");
          this.handleAccount();
          this.operationForm.reset()

        },
        error:(err)=>{
          console.log(err);
        }
      });
    } else if (operationType == "CREDIT") {
      this.accountService.credit(accountId,this.operationForm.value.amount,this.operationForm.value.description).subscribe({
        next:(res)=>{
          alert("Credit done");
          this.handleAccount();
          this.operationForm.reset()

        },
        error:(err)=>{
          console.log(err);
        }
      });
    } else if (operationType == "TRANSFER")
    {
      this.accountService.transfer(accountId,this.operationForm.value.accountDest,this.operationForm.value.amount,this.operationForm.value.description).subscribe({
        next:(res)=>{
          alert("Transfer done");
          this.handleAccount();
          this.operationForm.reset()

        },
        error:(err)=>{
          console.log(err);
        }
      });
    }

  }

}
