import {Component} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: "app-linkedin-login",
  templateUrl: "./linkedin-login.component.html",
  styleUrls: ["./linkedin-login.component.css"]
})
export class LinkedinLoginComponent {

  linkedInCredentials = {
    clientId: "789e1yzbgzpcmc",
    redirectUrl: "http://localhost:4200",
    scope: "r_liteprofile%20r_emailaddress" // To read basic user profile data and email
  };

  constructor(private http: HttpClient) {
    this.login()
  }

  login() {
    window.location.href = `https://www.linkedin.com/uas/oauth2/authorization?response_type=code&client_id=${
      this.linkedInCredentials.clientId
    }&redirect_uri=${this.linkedInCredentials.redirectUrl}&scope=${this.linkedInCredentials.scope}`;
  }
}
