import {Component} from '@angular/core';
import {PermissionAPI_Requests} from "../config/API_Requests/PermissionAPI_Requests"
import {HttpClient} from "@angular/common/http";
import {SessionHandler} from "../config/SessionHandler";

@Component({
  selector: 'app-user-permissions',
  templateUrl: './user-permissions.component.html',
  styleUrls: ['./user-permissions.component.css']
})
export class UserPermissionsComponent {
  PermissionList!: any;
  PermissionAPI = new PermissionAPI_Requests(this.http);

  constructor(private http: HttpClient) {
    this.PermissionAPI.getByID(SessionHandler.getUserSession()).subscribe(
      response => this.PermissionList = response
    )
  }

  RemovePermission(PermissionID: number) {
    let userConfirmation = confirm("Weet u zeker dat u uw gehele CV " +
      "niet meer met deze persoon wil delen?");

    if (userConfirmation) {
      this.PermissionAPI.delete(PermissionID).subscribe();
    }
  }

}
