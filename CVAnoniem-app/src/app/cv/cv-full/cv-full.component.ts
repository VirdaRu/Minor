import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SavedOffers} from "../../../models/savedoffers";
import {SessionHandler} from "../../config/SessionHandler";
import {SavedOffersAPI_Requests} from "../../config/API_Requests/SavedOffersAPI_Requests";
import {ResumeAPI_Requests} from "../../config/API_Requests/ResumeAPI_Requests";
import {Router} from "@angular/router";

@Component({
  selector: 'app-cv-full',
  templateUrl: './cv-full.component.html',
  styleUrls: ['./cv-full.component.css']
})

export class CvFullComponent implements OnChanges {
  @Input() showOptions: boolean = false;
  @Input() SavedPage: boolean = false;

  public static Bookmarked: boolean = false;

  public static OfferID: number = 0;
  public static JobseekerID: number;

  @Input() RecOfferID = 0;

  ngOnChanges(changes: SimpleChanges) {
    console.log(this.RecOfferID);
    CvFullComponent.OfferID = this.RecOfferID;
    if (this.RecOfferID != 0) {
      this.GotResume();
    }
  }

  public isEmployer = SessionHandler.getUserTypeSession();
  private userID = SessionHandler.getUserSession();

  SavedOfferAPI = new SavedOffersAPI_Requests(this.http);
  ResumeAPI = new ResumeAPI_Requests(this.http);

  fileSrc: any;
  received: boolean = false;
  public static Clicked = false;

  onPostBookmark(bookmark: {
    SavedID: number,
    OfferID: number,
    EmployerID: number
  }) {
    bookmark.OfferID = this.getOfferID();
    bookmark.EmployerID = this.userID;
    this.BookmarkResume(bookmark);
  }


  constructor(private http: HttpClient, private router: Router) {
    // setInterval(() =>{
    //   if (CvFullComponent.Clicked === true){
    //     this.GotResume();
    //     CvFullComponent.Clicked = false;
    //   }
    //   console.log(CvFullComponent.OfferID)
    // }, 5000)
  }

  public BookmarkResume(SaveOffer: SavedOffers) {
    if (this.userID > 0) {
      this.SavedOfferAPI.post(SaveOffer).subscribe();
    } else {
      this.router.navigate(["/Login"]);
    }
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


  public GotResume() {
    this.ResumeAPI.getByOfferID(CvFullComponent.OfferID).subscribe(
      response => {
        this.downloadBuffer(response);
      }
    )
  }

  public downloadBuffer(arrayBuffer: any) {
    this.fileSrc = new Blob([arrayBuffer], {type: 'application/pdf'})
    this.received = true;
  }
}
