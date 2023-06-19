import {Component} from '@angular/core';
import {SessionHandler} from "../../config/SessionHandler";
import {GoogleLoginComponent} from "../../user/social-login/google-login/google-login.component";
import {GoogleApiService} from "../../user/social-login/google-login/google-api.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  loggedInUser!: number;

  constructor(private readonly googleApi: GoogleApiService) {
    this.loggedInUser = SessionHandler.getUserSession();
  }

  public getUserInfo() {
    return GoogleLoginComponent.userinfo;
  }

  public UserIsLoggedIn() {
    return GoogleLoginComponent.LoggedIn;
  }

  logOut() {
    return this.googleApi.signOut();
  }
}
