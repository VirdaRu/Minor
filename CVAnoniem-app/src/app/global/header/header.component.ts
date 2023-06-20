import {Component} from '@angular/core';
import {SessionHandler} from "../../config/SessionHandler";
import {GoogleApiService} from "../../user/social-login/google-login/google-api.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  loggedInUser!: number;

  constructor(private googleApi: GoogleApiService) {
    this.loggedInUser = SessionHandler.getUserSession();
  }

  public getUsername() {
    return SessionHandler.getUsername();
  }

  public getPicture() {
    return SessionHandler.getPicture();
  }

  public UserIsLoggedIn() {
    console.log(SessionHandler.getUsername())
    if (SessionHandler.getUsername()) {
      return true;
    } else {
      return false;
    }
  }

  logOut() {
    //alert("logged out")
    //return this.router.navigate(['/google-login']);
    //return this.googleApi.signOut();
  }
}
