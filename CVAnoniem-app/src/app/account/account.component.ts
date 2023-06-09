import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {SessionHandler} from "./SessionHandler";
import {OfferAPI_Requests} from "../config/API_Requests/OfferAPI_Requests";
import {CvListComponent} from "../cv/cv-list/cv-list.component";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  constructor(private http: HttpClient) {
  }

  OfferID : number = 0;

  OfferAPI = new OfferAPI_Requests(this.http);

  UserID : number = SessionHandler.getSession();

  ngOnInit() {
    this.OfferAPI.checkOfferExist(this.UserID)
      .subscribe(response => this.OfferID = Number(response))


  }

  public DeleteCV()
  {
    let dialog = confirm("Weet u zeker dat u uw CV wilt verwijderen?");
    if (dialog)
    {
      this.OfferAPI.delete(this.OfferID)
    }
  }
}
