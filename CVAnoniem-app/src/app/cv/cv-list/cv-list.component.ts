import {Component, EventEmitter, Input, Output} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Offer} from "../../../models/offer";
import {SessionHandler} from "../../config/SessionHandler";
import {OfferAPI_Requests} from "../../config/API_Requests/OfferAPI_Requests";
import {CvFullComponent} from "../cv-full/cv-full.component";
import {SavedOffersAPI_Requests} from "../../config/API_Requests/SavedOffersAPI_Requests";
import {SearchComponent} from "../../home/search/search.component";

@Component({
  selector: 'app-cv-list',
  templateUrl: './cv-list.component.html',
  styleUrls: ['./cv-list.component.css']
})
export class CvListComponent {

  search!: SearchComponent;

  @Input() SavedPage: boolean = false;
  @Input() MessageView: boolean = false;
  @Input() AccountView: boolean = false;

  @Output() OutputOfferID = new EventEmitter<number>();

  offers!: Offer[];

  OfferAPI = new OfferAPI_Requests(this.http);
  SavedAPI = new SavedOffersAPI_Requests(this.http);

  public static query: string;
  public static oldquery: string;
  public static OfferID = 0;

  private userID = SessionHandler.getUserSession();

  constructor(private http: HttpClient) {

  }

  OnClickShare(offerID: number) {
    this.OutputOfferID.emit(offerID)
  }

  ngOnInit() {
    if (this.SavedPage) {
      this.getSavedResumes(this.userID);
    } else if (this.AccountView) {
      this.OfferAPI.getByJobseekerID(this.userID)
        .subscribe(response => this.offers = response);
      CvListComponent.OfferID = this.offers[0].OfferID;
    }
    else if (this.MessageView)
    {
      this.OfferAPI.getByOfferID(CvFullComponent.OfferID)
        .subscribe(
        offers => this.offers = offers);
    }
    else
    {
      setInterval(() => {
        if (CvListComponent.query !== CvListComponent.oldquery) {
          console.log(CvListComponent.query)
          this.getResultsBySearch(CvListComponent.query);
        }
        CvListComponent.oldquery = CvListComponent.query;
      }, 1000);
    }
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
