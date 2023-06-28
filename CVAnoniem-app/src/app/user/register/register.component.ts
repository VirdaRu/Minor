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
export class RegisterComponent {

  userAPI = new UserAPI_Requests(this.http);
  options = Constants.UserTypeOptions;
  user!: User;
  passwordMatch: boolean = true;

  constructor(private http: HttpClient, private router: Router) {
  }


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

  public setSession() {
    SessionHandler.setUsertypeSession(this.user.IsEmployer.toString());
    SessionHandler.setUserSession(this.user.UserID);
    SessionHandler.setUsername(this.user.EmailAddress);
  }

  public onSelect(isEmployer: string) {
    if (isEmployer.includes("1")) {
      return true;
    } else {
      return false;
    }
  }

  public confirmPassword(FirstEntry: string, SecondEntry: string) {
    if (FirstEntry === SecondEntry) {
      this.passwordMatch = true;
    } else {
      this.passwordMatch = false;
    }
  }

  public RegisterUser(email: string, password: string, passwordConfirm: string, tel: string) {
    if (this.passwordMatch) {
      let body = JSON.stringify([{
        //userid : 0,
        EmailAddress: email,
        Password: password,
        PhoneNumber: tel,
        IsEmployer: true,
        ThirdPartyID: ""
      }])
      console.log(body);
      this.userAPI.post(body).subscribe(response => alert(response));
    }
  }
}
