import {Component} from '@angular/core';
import {UserAPI_Requests} from "../../config/API_Requests/UserAPI_Requests";
import {User} from "../../../models/user";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {SessionHandler} from "../../config/SessionHandler";
import {Constants} from "../../config/constants";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

/**
 * The register component is used to register a new user.
 * The user can choose between being a jobseeker or an employer.
 * The user can register with an email and password.
 * The user can also register with a linkedin account.
 * The user can also register with a google account.
 */
export class RegisterComponent {

  userAPI = new UserAPI_Requests(this.http);
  isEmployer: boolean = false;
  options = Constants.UserTypeOptions;
  user!: User;
  passwordMatch: boolean = true;

  constructor(private http: HttpClient, private router: Router) {
  }

  /**
   * This function checks if the email is already in use.
   * If the email is already in use, the user will get an alert.
   * @param email
   */
  public checkExist(email: string) {

    let exist: boolean = true;
    this.userAPI.getUserExistByEmail(email).subscribe(
      response => {
        if (response === null) {
          exist = false;
        } else {
          alert("Dit emailadres is al in gebruik.");
          exist = true;
        }
      }
    );
    return exist;
  }

  /**
   * This function sets the session of the user.
   * The session is used to check if the user is logged in.
   * And keeps the user logged in between pages.
   */
  public setSession() {
    SessionHandler.setUsertypeSession(this.user.IsEmployer.toString());
    SessionHandler.setUserSession(this.user.UserID);
    SessionHandler.setUsername(this.user.EmailAddress);
  }

  /**
   * This function checks if the user is an employer.
   * @param isEmployer
   */
  public onSelect(isEmployer: string) {
    if (isEmployer.includes("1")) {
      this.isEmployer = true;
      return true;
    } else {
      this.isEmployer = false;
      return false;
    }
  }

  /**
   * This function checks if the password and the password confirmation are the same.
   * If they are the same, the user can register.
   * If they are not the same, the user will get an alert.
   * @param FirstEntry
   * @param SecondEntry
   */
  public confirmPassword(FirstEntry: string, SecondEntry: string) {
    if (FirstEntry === SecondEntry) {
      this.passwordMatch = true;
    } else {
      this.passwordMatch = false;
    }
  }

  /**
   * This function registers a new user.
   * The user can register with an email and password.
   * The user can also register with a linkedin account.
   * The user can also register with a google account.
   * The user can choose between being a jobseeker or an employer after registering.
   * @param email
   * @param password
   * @param passwordConfirm
   * @param tel
   * @constructor
   */
  public RegisterUser(email: string, password: string, passwordConfirm: string, tel: string) {
    if (this.passwordMatch) {
      let body = JSON.stringify([{
        EmailAddress: email,
        Password: password,
        PhoneNumber: tel,
        IsEmployer: this.isEmployer,
        ThirdPartyID: ""
      }])
      console.log(body);
      this.userAPI.post(body).subscribe(response => {
        alert("Account is aangemaakt.");
      });
    }
  }
}
