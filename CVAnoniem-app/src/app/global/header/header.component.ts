import {Component} from '@angular/core';
import {SessionHandler} from "../../config/SessionHandler";
import {GoogleLoginComponent} from "../../user/social-login/google-login/google-login.component";
import {UserInfo} from "angular-oauth2-oidc";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  loggedInUser!: number;
  userInfo?: UserInfo;

  constructor() {
    this.loggedInUser = SessionHandler.getUserSession();
  }

  public logOut() {

  }

  public getUserInfo() {
    return GoogleLoginComponent.userinfo;
  }

  public UserIsLoggedIn() {
    return GoogleLoginComponent.LoggedIn;
  }


}
