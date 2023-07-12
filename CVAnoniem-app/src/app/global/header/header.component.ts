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

  /**
   * Constructor for the header component.
   * @param router
   */
//private googleApi: GoogleApiService,
  constructor(private router: Router) {
    this.loggedInUser = SessionHandler.getUserSession();
  }

  /**
   * Returns the username of the logged in user.
   */
  public getUsername() {
    return SessionHandler.getUsername();
  }

  /**
   * Returns the picture of the logged in user.
   */
  public getPicture() {
    return SessionHandler.getPicture();
  }

  /**
   * if the user is logged in, return true, else return false.
   * @constructor
   */
  public UserIsLoggedIn() {
    if (SessionHandler.getUsername()) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * Logs the user out.
   */
  logOut() {
    //this.googleApi.signOut();
    SessionHandler.LogOutSessions();
    return this.router.navigate(['/google-login']);
  }
}
