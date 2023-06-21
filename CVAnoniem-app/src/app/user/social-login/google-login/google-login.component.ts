import {Component} from '@angular/core';
import {GoogleApiService, UserInfo} from "./google-api.service";
import {HttpClient} from "@angular/common/http";
import {UserAPI_Requests} from 'src/app/config/API_Requests/UserAPI_Requests';
import {SessionHandler} from "../../../config/SessionHandler";
import {ActivatedRoute, Router} from "@angular/router";


@Component({
  selector: 'app-google-login',
  templateUrl: './google-login.component.html',
  styleUrls: ['./google-login.component.css']
})
export class GoogleLoginComponent {

  userAPI = new UserAPI_Requests(this.http);

  userInfo?: UserInfo;
  static userinfo?: UserInfo;
  UID: string = "";

  constructor(private readonly googleApi: GoogleApiService, private http: HttpClient, private router: Router, private route: ActivatedRoute) {
    googleApi.userProfileSubject.subscribe((info) => {
      this.userInfo = info
      this.UID = info.info.sub
      this.setSessions()
    })
  }

  isLoggedIn(): boolean {
    //GoogleLoginComponent.LoggedIn = this.googleApi.isLoggedIn();
    GoogleLoginComponent.userinfo = this.userInfo;
    return this.googleApi.isLoggedIn();
  }

  SetUserIDSession(ThirdPartyID: string) {
    if (ThirdPartyID === undefined) {
      console.log("ERROR: Undefined")
    } else {
      this.userAPI.getThirdPartyID(ThirdPartyID).subscribe(
        response => {
          this.HandleSessionSetter(Number(response));
        }
      );
    }
  }

  HandleSessionSetter(ID: number) {
    if (ID == 0) {
      this.router.navigate(["/set-user-type"], {relativeTo: this.route});
    } else {
      SessionHandler.setUserSession(ID);                  //Set Session for UserID
      this.userAPI.getUsertype(ID).subscribe(             //Set Session for usertype
        response => {
          SessionHandler.setUsertypeSession(response.toString())
        }
      );

    }
  }

  setSessions() {
    this.SetUserIDSession(this.UID);
    SessionHandler.setUsername(this.userInfo!.info.name);
    SessionHandler.setPicture(this.userInfo?.info.picture);
  }

  logOut(): void {
    SessionHandler.LogOutSessions();
    //GoogleLoginComponent.LoggedIn = false;
    this.googleApi.signOut();
  }

}
