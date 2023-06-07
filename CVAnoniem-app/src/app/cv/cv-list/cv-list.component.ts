import {Component, Input} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Offer} from "../../../models/offer";
import {map, Observable, interval, tap} from "rxjs";
import {SessionHandler} from "../../account/SessionHandler";
import {OfferAPI_Requests} from "../../config/API_Requests/OfferAPI_Requests";
import {CvFullComponent} from "../cv-full/cv-full.component";

@Component({
  selector: 'app-cv-list',
  templateUrl: './cv-list.component.html',
  styleUrls: ['./cv-list.component.css']
})
export class CvListComponent {

  @Input() SavedPage : boolean = false;
  @Input() MessageView : boolean = false;

  offers! : Offer[];

  OfferAPI = new OfferAPI_Requests(this.http);

  public static query : string;

  private userID = SessionHandler.getSession();

  constructor(private http : HttpClient)
  {
  }

  ngOnInit(){
    if (this.SavedPage)
    {
      this.getSavedResumes(this.userID).
      subscribe( offers => this.offers = offers);
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
    return this.http.get<Offer[]>("https://localhost:7229/api/saved-offer",
      { params: new HttpParams().set("userid", userid) });
  }

  public getResumeResults()
  {
      return this.http.get<Offer[]>("https://localhost:7229/api/offer/all-offers-list").
        subscribe(response => this.offers = response);
  }

  public getResultsBySearch(query : string)
  {
    return this.http.get<Offer[]>("https://localhost:7229/api/offer/search-offers",
      { params : new HttpParams().set('query',query)}).subscribe(
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
