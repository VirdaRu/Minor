import {Component, Input} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Offer} from "../../../models/offer";
import {map, Observable, interval, tap} from "rxjs";
import {SessionHandler} from "../../account/SessionHandler";
import {OfferAPI_Requests} from "../../config/API_Requests/OfferAPI_Requests";
import {CvFullComponent} from "../cv-full/cv-full.component";
import {SavedOffersAPI_Requests} from "../../config/API_Requests/SavedOffersAPI_Requests";

@Component({
  selector: 'app-cv-list',
  templateUrl: './cv-list.component.html',
  styleUrls: ['./cv-list.component.css']
})
export class CvListComponent {

  @Input() SavedPage : boolean = false;
  @Input() MessageView : boolean = false;
  @Input() AccountView : boolean = false;

  offers! : Offer[];

  OfferAPI = new OfferAPI_Requests(this.http);
  SavedAPI = new SavedOffersAPI_Requests(this.http);

  public static query : string;

  private userID = SessionHandler.getSession();

  constructor(private http : HttpClient)
  {
  }

  ngOnInit(){
    if (this.SavedPage)
    {
      this.getSavedResumes(this.userID);
    }
    else if (this.AccountView)
    {
      this.OfferAPI.getByJobseekerID(SessionHandler.getSession())
        .subscribe(response => this.offers = response);
    }
    else if (this.MessageView)
    {
      this.OfferAPI.getByOfferID(CvFullComponent.OfferID)
        .subscribe(
        offers => this.offers = offers);
    }
    else
    {
      setInterval(() : any => {
        this.HandleResults();
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

  public HandleResults()
  {
    if (CvListComponent.query == "")
    {

    }else {
      this.getResultsBySearch(CvListComponent.query);
    }
  }


}
