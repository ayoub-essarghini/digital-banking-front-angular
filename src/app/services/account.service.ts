import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {AccountDetails} from "../model/account.model";

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  backendHost:string = "http://localhost:8085";
  constructor(private http:HttpClient) { }

  public getAccount(accountId:string,page:number,size:number):Observable<AccountDetails>
  {
    return this.http.get<AccountDetails>(this.backendHost+"/accounts/"+accountId+"/pageOperations?page="+page+"&size="+size);
  }

  public debit(accountId:string,amount:number,description:string)
  {
    return this.http.post(this.backendHost+"/accounts/debit",{accountId,amount,description})
  }

  public credit(accountId:string,amount:number,description:string)
  {
    return this.http.post(this.backendHost+"/accounts/credit",{accountId,amount,description})
  }
  public transfer(accountSource:string,accountDest:string,amount:number,description:string)
  {
    let data = {accountIdSrc:accountSource,accountIdDest: accountDest,amount:amount,description:description};
    return this.http.post(this.backendHost+"/accounts/transfer",data)
  }
}
