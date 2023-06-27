import {Component} from '@angular/core';
import {SessionHandler} from "../../config/SessionHandler";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  loggedInUser!: number;

//private googleApi: GoogleApiService,
  constructor(private router: Router) {
    this.loggedInUser = SessionHandler.getUserSession();
  }

  public getUsername() {
    return SessionHandler.getUsername();
  }

  public getPicture() {
    return SessionHandler.getPicture();
  }

  public UserIsLoggedIn() {
    if (SessionHandler.getUsername()) {
      return true;
    } else {
      return false;
    }
  }

  logOut() {
    //this.googleApi.signOut();
    SessionHandler.LogOutSessions();
    return this.router.navigate(['/google-login']);
  }
}
