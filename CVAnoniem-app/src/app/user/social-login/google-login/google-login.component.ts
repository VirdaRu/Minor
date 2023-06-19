import {Component} from '@angular/core';
import {GoogleApiService, UserInfo} from "./google-api.service";
import {HttpClient} from "@angular/common/http";
import {UserAPI_Requests} from "../../../config/API_Requests/UserAPI_Requests";

@Component({
  selector: 'app-google-login',
  templateUrl: './google-login.component.html',
  styleUrls: ['./google-login.component.css']
})
export class GoogleLoginComponent {

  userAPI = new UserAPI_Requests(this.http);

  userInfo?: UserInfo;
  static LoggedIn: boolean;
  static userinfo?: UserInfo;
  UID: string = "";

  constructor(private readonly googleApi: GoogleApiService, private http: HttpClient) {
    googleApi.userProfileSubject.subscribe((info) => {
      this.userInfo = info
      this.UID = info.info.sub
      this.SetSession(this.UID)
    })
  }

  isLoggedIn(): boolean {
    GoogleLoginComponent.LoggedIn = this.googleApi.isLoggedIn();
    GoogleLoginComponent.userinfo = this.userInfo;
    return this.googleApi.isLoggedIn();
  }

  SetSession(ThirdPartyID: string) {
    if (ThirdPartyID === undefined) {
      alert("ERROR: undefined")
    } else {
      this.userAPI.getThirdPartyID(ThirdPartyID).subscribe(
        response => alert("ID Found: " + response)//SessionHandler.setUserSession(Number(response));
      );
    }
  }

  logOut(): void {
    GoogleLoginComponent.LoggedIn = false;
    this.googleApi.signOut();
  }

}
