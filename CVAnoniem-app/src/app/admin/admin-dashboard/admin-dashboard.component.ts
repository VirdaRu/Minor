import {Component} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {OfferAPI_Requests} from "../../config/API_Requests/OfferAPI_Requests";
import {AdminNavPanelComponent} from "../admin-nav-panel/admin-nav-panel.component";

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {

  static ItemsAmount: number

  OfferAPI = new OfferAPI_Requests(this.http);

  constructor(private http: HttpClient) {

  }

  public showPage() {
    return AdminNavPanelComponent.chosenPage;
  }

  public getItemAmount() {
    return AdminDashboardComponent.ItemsAmount;
  }


}
