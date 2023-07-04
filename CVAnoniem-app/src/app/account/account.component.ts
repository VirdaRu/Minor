import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SessionHandler} from "../config/SessionHandler";
import {OfferAPI_Requests} from "../config/API_Requests/OfferAPI_Requests";
import {Router} from "@angular/router";
import {CvUserComponent} from "./cv-user/cv-user.component";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router) {
  }

  OfferID : number = 0;

  loadedResume: boolean = false

  OfferAPI = new OfferAPI_Requests(this.http);

  UserID : number = SessionHandler.getUserSession();

  //@ViewChild(CvUserComponent) viewCV : CvUserComponent = new CvUserComponent();

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
    if (this.UserID != 0)  //isLogged In
    {
      return true;
    }
    return false;
  }

  public isEmployer() {
    return (Number(SessionHandler.getUserTypeSession()));
  }

  public onGetResume(bool : boolean){
    this.loadedResume = bool;
  }

  public DeleteCV() {
    let dialog = confirm("Weet u zeker dat u uw CV wilt verwijderen?");
    if (dialog) {
      this.OfferAPI.delete(this.OfferID)
    }
  }
}
