import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {AccountService} from "../services/account.service";
import {Observable} from "rxjs";
import {AccountDetails} from "../model/account.model";

@Component({
  selector: 'app-accounts',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './accounts.component.html',
  styleUrl: './accounts.component.css'
})
export class AccountsComponent implements OnInit {
  accountForm!: FormGroup;
  currentPage: number = 0;
  pageSize: number = 5;
  accountDetails!: Observable<AccountDetails>;

  constructor(private fb: FormBuilder, private accountService: AccountService) {
  }

  ngOnInit(): void {
    this.accountForm = this.fb.group({
      accountId: this.fb.control('')
    })
  }

  handleAccount() {
    let accountId: string = this.accountForm.value.id;
    this.accountDetails = this.accountService.getAccount(accountId, this.currentPage, this.pageSize);


  }
}
