import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {SessionHandler} from "./SessionHandler";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  constructor(private http: HttpClient) {
  }
  OfferID : number = 0;

  UserID : number = SessionHandler.getSession();
  ngOnInit() {
    this.GetOfferID(this.UserID);
  }

  public GetOfferID(UID: number) {
    this.http.get("https://localhost:7229/api/offer/user-has-offer",
      {params: new HttpParams().set("userid", UID)}).subscribe(
        response => this.OfferID = Number(response)
    );
  }

  public DeleteCV()
  {
    let dialog = confirm("Weet u zeker dat u uw CV wilt verwijderen?");
    if (dialog)
    {
      this.http.delete("https://localhost:7229/api/offer",
        {params: new  HttpParams().set("id", this.OfferID)}).
      subscribe();
    }
  }
}
