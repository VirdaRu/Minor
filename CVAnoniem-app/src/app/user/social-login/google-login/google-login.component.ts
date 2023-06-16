import {Component} from '@angular/core';
import {GoogleApiService, UserInfo} from "./google-api.service";
import {SessionHandler} from "../../../config/SessionHandler";
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

  constructor(private readonly googleApi: GoogleApiService, private http: HttpClient) {
    googleApi.userProfileSubject.subscribe((info) => {
      this.userInfo = info
    })
  }

  isLoggedIn(): boolean {
    GoogleLoginComponent.LoggedIn = this.googleApi.isLoggedIn();
    GoogleLoginComponent.userinfo = this.userInfo;
    return this.googleApi.isLoggedIn();
  }

  SessionSetter(TPID: string) {
    let x: any;
    this.userAPI.getThirdPartyID(TPID).subscribe(
      response => x = response
    );
    SessionHandler.setUserSession(x);
  }

  logOut(): void {
    GoogleLoginComponent.LoggedIn = false;
    this.googleApi.signOut();
  }

}
