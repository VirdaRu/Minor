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
  /**
   * in this file we use the google api service to get the user info from google
   * we then use the user info to get the third party id from the database
   * with this third party id we can check if the user is in the database
   * if the user is in the database we set the session
   * if the user is not in the database we redirect the user to the usertype switch page
   */

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

  /**
   * this function sets the sessions
   * the sessions are used to check if the user is logged in
   * and to set the username and picture in the navbar
   */
  setSessions() {
    this.SetUserIDSession(this.UID);
    SessionHandler.setUsername(this.userInfo!.info.name);
    SessionHandler.setPicture(this.userInfo?.info.picture);
  }

  /**
   * the logout button calls this function
   * this function calls the google api service to sign out
   * and calls the session handler to clear the sessions
   */
  logOut(): void {
    SessionHandler.LogOutSessions();
    this.googleApi.signOut();
  }

}
