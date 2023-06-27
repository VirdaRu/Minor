import {Component} from '@angular/core';
import {Offer} from "../../../models/offer";
import {HttpClient} from "@angular/common/http";
import {OfferAPI_Requests} from "../../config/API_Requests/OfferAPI_Requests";

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {
  items!: Offer[];

  OfferAPI = new OfferAPI_Requests(this.http);

  constructor(private http: HttpClient) {

    this.OfferAPI.get().subscribe(
      response => this.items = response
    );
  }

  public showPage(page: string) {
    if (page === "user") {

    }
  }


}
