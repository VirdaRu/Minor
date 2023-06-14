import {Component, Input, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {SavedOffers} from "../../../models/savedoffers";
import {FormControl, FormGroup} from "@angular/forms";
import {SessionHandler} from "../../config/SessionHandler";
import {SavedOffersAPI_Requests} from "../../config/API_Requests/SavedOffersAPI_Requests";

@Component({
  selector: 'app-cv-full',
  templateUrl: './cv-full.component.html',
  styleUrls: ['./cv-full.component.css']
})

export class CvFullComponent{
  @Input() showOptions: boolean = false;
  @Input() SavedPage : boolean = false;
  public static Bookmarked : boolean = false;

  public static OfferID : number;
  public static JobseekerID : number;

  public isEmployer = SessionHandler.getUserTypeSession();

  private userID = SessionHandler.getUserSession();

  SaveOffer! : SavedOffers;

  SavedOfferAPI = new SavedOffersAPI_Requests(this.http);

  onPostBookmark(bookmark : {
    SavedID : number,
    OfferID : number,
    EmployerID : number
  })
  {
    bookmark.OfferID = this.getOfferID();
    bookmark.EmployerID = this.userID;
    this.BookmarkResume(bookmark);
  }

  constructor(private http: HttpClient) {

  }

  public BookmarkResume(SaveOffer : SavedOffers)
  {
    this.SavedOfferAPI.post(SaveOffer).subscribe();
  }

  public UnbookmarkResume()
  {
    this.SavedOfferAPI.delete(this.getOfferID()).subscribe()
    alert("CV niet meer opgeslagen.");
  }

  public getOfferID() :number
  {
    return CvFullComponent.OfferID;
  }

  public isBookmarked() :boolean
  {
    return CvFullComponent.Bookmarked;
  }

}
