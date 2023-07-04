import {Component, Input, SimpleChanges} from '@angular/core';
import {SearchComponent} from "../../home/search/search.component";
import {Offer} from "../../../models/offer";
import {OfferAPI_Requests} from "../../config/API_Requests/OfferAPI_Requests";
import {SavedOffersAPI_Requests} from "../../config/API_Requests/SavedOffersAPI_Requests";
import {SessionHandler} from "../../config/SessionHandler";
import {HttpClient} from "@angular/common/http";
import {CvFullComponent} from "../../cv/cv-full/cv-full.component";

@Component({
  selector: 'app-account-offer',
  templateUrl: './account-offer.component.html',
  styleUrls: ['./account-offer.component.css']
})
export class AccountOfferComponent {

  search!: SearchComponent;

  @Input() SavedPage: boolean = false;
  @Input() MessageView: boolean = false;
  @Input() AccountView: boolean = false;

  offers!: Offer[];

  OfferAPI = new OfferAPI_Requests(this.http);
  SavedAPI = new SavedOffersAPI_Requests(this.http);

  public static query: string;
  public static oldquery: string;
  offerID = 0;
  @Input() resumeLoaded = false;
  private userID = SessionHandler.getUserSession();


  constructor(private http : HttpClient)
  {

  }

  ngOnChanges(changes: SimpleChanges) {

    if (this.resumeLoaded){
      this.OfferAPI.getByJobseekerID(this.userID)
        .subscribe(response => this.offers = response);
      this.offerID = this.offers[0].OfferID;
      this.resumeLoaded = false;
    }
  }

  ngOnInit(){

  }

  public getSavedResumes(userid: number)
  {
    return this.SavedAPI.getByID(userid).subscribe(
      offers => this.offers = offers
    );
  }

  public getResumeResults()
  {
    return this.OfferAPI.get().subscribe(
      response => this.offers = response);
  }

  public getResultsBySearch(query : string)
  {
    return this.OfferAPI.getByID(query).subscribe(
      response => this.offers = response);
  }
}
