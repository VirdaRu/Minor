import {Component} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {OfferAPI_Requests} from "../../../config/API_Requests/OfferAPI_Requests";
import {Offer} from "../../../../models/offer";
import {AdminDashboardComponent} from "../admin-dashboard.component";

@Component({
  selector: 'app-offer-admin-page',
  templateUrl: './offer-admin-page.component.html',
  styleUrls: ['./offer-admin-page.component.css']
})
export class OfferAdminPageComponent {
  public offerAPI = new OfferAPI_Requests(this.http);

  offers!: Offer[];

  constructor(private http: HttpClient) {
    this.offerAPI.get().subscribe(
      response => {
        this.offers = response;
        AdminDashboardComponent.ItemsAmount = this.offers.length;
      }
    )

  }

  public delete(id: number) {
    if (confirm("Weet u het zeker?")) {
      this.offerAPI.delete(id).subscribe();
    }
  }
}
