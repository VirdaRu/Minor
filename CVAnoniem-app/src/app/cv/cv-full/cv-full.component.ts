import {Component, Input} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {SavedOffers} from "../../../models/savedoffers";
import {SessionHandler} from "../../config/SessionHandler";
import {SavedOffersAPI_Requests} from "../../config/API_Requests/SavedOffersAPI_Requests";
import {ResumeAPI_Requests} from "../../config/API_Requests/ResumeAPI_Requests";
import {Constants} from "../../config/constants";

@Component({
  selector: 'app-cv-full',
  templateUrl: './cv-full.component.html',
  styleUrls: ['./cv-full.component.css']
})

export class CvFullComponent {
  @Input() showOptions: boolean = false;
  @Input() SavedPage: boolean = false;
  public static Bookmarked : boolean = false;

  public static OfferID : number;
  public static JobseekerID : number;

  public isEmployer = SessionHandler.getUserTypeSession();
  private userID = SessionHandler.getUserSession();

  SavedOfferAPI = new SavedOffersAPI_Requests(this.http);
  ResumeAPI = new ResumeAPI_Requests(this.http);

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

  public getOfferID(): number {
    return CvFullComponent.OfferID;
  }

  public isBookmarked(): boolean {
    return CvFullComponent.Bookmarked;
  }

  public getResumes() {
    this.http.get(`${Constants.API_URL}/resume`,
      {
        params: new HttpParams().set('id', this.getOfferID())
      })
  }

}
