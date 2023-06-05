import {Component, Input} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Offer} from "../../../models/offer";
import {map, Observable, interval, tap} from "rxjs";
import {SessionHandler} from "../../account/SessionHandler";

@Component({
  selector: 'app-cv-list',
  templateUrl: './cv-list.component.html',
  styleUrls: ['./cv-list.component.css']
})
export class CvListComponent {

  @Input() SavedPage : boolean = false;

  offers! : Offer[];

  public static query : string;

  private userID = SessionHandler.getSession();

  constructor(private http : HttpClient) {
  }

  ngOnInit(){
    if (this.SavedPage)
    {
      this.getSavedResumes(this.userID).
      subscribe( offers =>this.offers = offers);
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
    //  this.getResumeResults();
    }else {
      this.getResultsBySearch(CvListComponent.query);
    }
  }


}
