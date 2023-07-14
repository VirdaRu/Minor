import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CvFullComponent} from "./cv-full/cv-full.component";
import {HttpClient} from "@angular/common/http";
import {SessionHandler} from "../config/SessionHandler";
import {SavedOffersAPI_Requests} from "../config/API_Requests/SavedOffersAPI_Requests";
import {ResumeAPI_Requests} from "../config/API_Requests/ResumeAPI_Requests";

@Component({
  selector: 'app-cv',
  templateUrl: './cv.component.html',
  styleUrls: ['./cv.component.css']
})

export class CvComponent {
  @Input() OfferID: string = "";
  @Input() PDFPath: string = "";
  @Input() Title: string = "";
  @Input() Branche: string = "";
  @Input() Beschrijving: string = "";
  @Input() Provincie: string = "";
  @Input() JobSeekerID: string = "";

  @Output() ClickedID = new EventEmitter<number>();

  private userID = SessionHandler.getUserSession();
  public filesrc: any;
  received: boolean = false;

  SavedOffersAPI = new SavedOffersAPI_Requests(this.http);
  ResumeAPI = new ResumeAPI_Requests(this.http);

  constructor(private http: HttpClient) {
  }

  public displayResume() {
    CvFullComponent.OfferID = Number(this.OfferID);
    CvFullComponent.JobseekerID = Number(this.JobSeekerID);
    this.OfferIsSaved(Number(this.OfferID));
    this.ClickedID.emit(Number(this.OfferID));
  }


  public OfferIsSaved(offerid: number) {
    this.SavedOffersAPI.getByIDs(this.userID, offerid)
      .subscribe(response => this.displayButton(Number(response)));
  }

  public displayButton(ID: number) {
    if (ID != 0) {
      CvFullComponent.Bookmarked = true;
    }
    else
    {
      CvFullComponent.Bookmarked = false;
    }
  }

}
