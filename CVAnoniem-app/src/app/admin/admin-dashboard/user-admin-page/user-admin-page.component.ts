import {Component} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UserAPI_Requests} from "../../../config/API_Requests/UserAPI_Requests";
import {User} from "../../../../models/user";
import {AdminDashboardComponent} from "../admin-dashboard.component";

@Component({
  selector: 'app-user-admin-page',
  templateUrl: './user-admin-page.component.html',
  styleUrls: ['./user-admin-page.component.css']
})
export class UserAdminPageComponent {

  public userAPI = new UserAPI_Requests(this.http);

  users!: User[];

  constructor(private http: HttpClient) {
    this.userAPI.get().subscribe(
      response => {
        this.users = response;
        AdminDashboardComponent.ItemsAmount = this.users.length;
      }
    )
  }

  public delete(id: number) {
    if (confirm("Weet u het zeker?")) {
      this.userAPI.delete(id).subscribe();
    }
  }

  public getUserType(isEmployer: boolean) {
    if (isEmployer) {
      return "Werkgever";
    } else {
      return "Werkzoekende";
    }
  }
}
