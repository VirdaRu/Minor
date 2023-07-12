import {Component} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: "app-linkedin-login",
  templateUrl: "./linkedin-login.component.html",
  styleUrls: ["./linkedin-login.component.css"]
})
export class LinkedinLoginComponent {

  /**
   * LinkedIn credentials for OAuth2 authentication and authorization flow.
   * with the linkedinCredentials object you can change the scope of the data you want to retrieve.
   * once logged in you are redirected to the home page of the application.
   */
  linkedInCredentials = {
    clientId: "789e1yzbgzpcmc",
    redirectUrl: "http://localhost:4200",
    scope: "r_liteprofile%20r_emailaddress" // To read basic user profile data and email
  };

  constructor(private http: HttpClient) {
    this.login()
  }

  /**
   * the login function checks if the user that is trying to login is using registered credentials within linkedin.
   * if the user is registered with linkedin we get the user info from linkedin and set the session.
   * once logged in you are redirected to the home page of the application using the redirectUrl declared above.
   */
  login() {
    window.location.href = `https://www.linkedin.com/uas/oauth2/authorization?response_type=code&client_id=${
      this.linkedInCredentials.clientId
    }&redirect_uri=${this.linkedInCredentials.redirectUrl}&scope=${this.linkedInCredentials.scope}`;
  }
}
