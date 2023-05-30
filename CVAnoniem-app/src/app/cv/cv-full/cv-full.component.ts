import {Component, Input, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {SavedOffers} from "../../../models/savedoffers";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-cv-full',
  templateUrl: './cv-full.component.html',
  styleUrls: ['./cv-full.component.css']
})
export class CvFullComponent{
  @Input() showOptions: boolean = false;
  @Input() SavedPage : boolean = false;
  public static Bookmarked : boolean = false;

  public static OfferID : number = 0;

  SaveOffer! : SavedOffers;

  onPostBookmark(bookmark : {
    SavedID : number,
    OfferID : number,
    EmployerID : number
  })
  {
    bookmark.OfferID = this.getOfferID();
    bookmark.EmployerID = 10;
    this.BookmarkResume(bookmark);
  }

  constructor(private http: HttpClient) {

  }

   public SendRequest() : void {
    alert("Request sent to person");
  }

  public BookmarkResume(SaveOffer : SavedOffers)
  {
    alert("Resume added to favourites.");
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*');
    let body = JSON.stringify(SaveOffer);
    return this.http.post<SavedOffers>("https://localhost:7229/api/saved-offer", body,{'headers': headers}).
    subscribe();
  }

  public UnbookmarkResume()
  {
    alert("CV niet meer opgeslagen.");
    this.http.delete("https://localhost:7229/api/saved-offer",
      { params: new HttpParams().set("offerid", this.getOfferID())
                                       .set("userid", 10) }).subscribe();
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
