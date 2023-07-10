import {Component} from '@angular/core';
import {SessionHandler} from "../config/SessionHandler";
import {HttpClient} from "@angular/common/http";
import {ResumeAPI_Requests} from "../config/API_Requests/ResumeAPI_Requests";

@Component({
  selector: 'app-redact-resume',
  templateUrl: './redact-resume.component.html',
  styleUrls: ['./redact-resume.component.css']
})
export class RedactResumeComponent {
  offerID = SessionHandler.getUserSession();

  ResumeAPI = new ResumeAPI_Requests(this.http);

  constructor(private http: HttpClient) {
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
