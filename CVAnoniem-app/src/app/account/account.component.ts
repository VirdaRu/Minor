import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SessionHandler} from "../config/SessionHandler";
import {OfferAPI_Requests} from "../config/API_Requests/OfferAPI_Requests";
import {Router} from "@angular/router";
import {Subject} from "rxjs";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router) {
  }

  showFullResume: Subject<any> = new Subject();

  OfferID: number = 0;

  OfferAPI = new OfferAPI_Requests(this.http);

  UserID: number = SessionHandler.getUserSession();

  displayFullResume: boolean = false;


  ngOnInit() {
    if (this.loggedIn()) {
      this.OfferAPI.checkOfferExist(this.UserID)
        .subscribe(response => this.OfferID = Number(response))
      console.log(this.OfferID)
    } else {
      this.router.navigate(["/Login"])
    }
  }

  public loggedIn() {
    if (this.UserID != 0) {
      return true;
    }
    return false;
  }

  public isEmployer() {
    return SessionHandler.getUserTypeSession();
  }

  public DeleteCV() {
    let dialog = confirm("Weet u zeker dat u uw CV wilt verwijderen?");
    if (dialog) {
      this.OfferAPI.delete(this.OfferID)
    }
  }

  OnClickDisplay() {
    if (this.displayFullResume) {
      this.showFullResume.next(false);
      this.displayFullResume = false
    } else {
      this.showFullResume.next(true);
      this.displayFullResume = true
    }
  }
}
