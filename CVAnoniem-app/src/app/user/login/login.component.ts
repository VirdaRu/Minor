import {Component} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UserAPI_Requests} from "../../config/API_Requests/UserAPI_Requests";
import {Router} from "@angular/router";
import {SessionHandler} from "../../config/SessionHandler";
import {User} from "../../../models/user";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  userAPI = new UserAPI_Requests(this.http);

  user!: User;

  constructor(private http: HttpClient, private router: Router) {
  }

  /**
   * This function checks if the email and password match.
   * If the email and password match, the user will be logged in.
   * @param email
   * @param pw
   */
  public checkExist(email: string, pw: string) {
    this.userAPI.getUserExist(email, pw).subscribe(
      response => {
        if (response === null) {
          alert("not found");
        } else {
          this.user = response;
          this.setSession();
          this.router.navigate(["/"]);
        }
      }
    );
  }

  /**
   * This function sets the session of the user.
   */
  public setSession() {
    SessionHandler.setUsertypeSession(this.user.IsEmployer.toString());
    SessionHandler.setUserSession(this.user.UserID);
    SessionHandler.setUsername(this.user.EmailAddress);
  }

}
