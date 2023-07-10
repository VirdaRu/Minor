import {Component, OnInit} from '@angular/core';
import {SessionHandler} from "../config/SessionHandler";
import {HttpClient} from "@angular/common/http";
import {ResumeAPI_Requests} from "../config/API_Requests/ResumeAPI_Requests";
import {OfferAPI_Requests} from "../config/API_Requests/OfferAPI_Requests";

@Component({
  selector: 'app-redact-resume',
  templateUrl: './redact-resume.component.html',
  styleUrls: ['./redact-resume.component.css']
})
export class RedactResumeComponent implements OnInit{
  UserID = SessionHandler.getUserSession();
  OfferID = 0;

  ResumeAPI = new ResumeAPI_Requests(this.http);
  OfferAPI = new OfferAPI_Requests(this.http);

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.OfferAPI.checkOfferExist(this.UserID)
      .subscribe(response => this.OfferID = Number(response))
  }

  public anonimize(infoToRedact: string) {
    infoToRedact += `,${SessionHandler.getUsername()}`
    this.ResumeAPI.redact(infoToRedact).subscribe(
      response => {
        if (response == 200) {
          alert("CV is geanonimiseerd.")
        }
      });
  }
}
