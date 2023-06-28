import {Component} from '@angular/core';
import {SessionHandler} from "../../config/SessionHandler";
import {Constants} from "../../config/constants";
import {GoogleLoginComponent} from "../social-login/google-login/google-login.component";
import {UserAPI_Requests} from "../../config/API_Requests/UserAPI_Requests";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-usertype-switch',
  templateUrl: './usertype-switch.component.html',
  styleUrls: ['./usertype-switch.component.css']
})
export class UsertypeSwitchComponent {

  userAPI = new UserAPI_Requests(this.http);
  options = Constants.UserTypeOptions;
  selected: any;

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) {
  }

  continue() {
    let userconfirm = confirm(`U registreert als: ${this.selected}.`)
    if (userconfirm) {
      let body = JSON.stringify(
        {
          EmailAddress: GoogleLoginComponent.userinfo?.info.email,
          Password: "",
          PhoneNumber: "",
          ThirdPartyID: GoogleLoginComponent.userinfo?.info.sub,
          IsEmployer: this.getUserType(this.selected)
        });
      console.log(body)
      this.userAPI.postUsingThirdParty(body).subscribe(
        response => {
          SessionHandler.setUserSession(Number(response));
        });

      this.router.navigate(["/"]);

    } else {
      alert("Gestopt")
    }
  }

  onSelect(val: any) {
    this.selected = val;
  }

  getUserType(val: any) {
    if (val.includes("1")) {
      SessionHandler.setUsertypeSession("employer");
      return true;
    } else {
      SessionHandler.setUsertypeSession("employee");
      return false;
    }
  }
}
