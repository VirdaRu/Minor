import {Component, Input} from '@angular/core';
import {CvFullComponent} from "./cv-full/cv-full.component";
import {HttpClient, HttpParams} from "@angular/common/http";

@Component({
  selector: 'app-cv',
  templateUrl: './cv.component.html',
  styleUrls: ['./cv.component.css']
})

export class CvComponent{
  @Input() OfferID: string = "";
  @Input() PDFPath: string = "";
  @Input() Title: string = "";
  @Input() Branche: string = "";
  @Input() Beschrijving: string = "";
  @Input() Provincie: string = "";

  constructor(private http : HttpClient) {
  }

  public displayResume()
  {
    CvFullComponent.OfferID = Number(this.OfferID);
    this.ResumeIsSaved(Number(this.OfferID));
  }

  public ResumeIsSaved(ResumeID : number)
  {
    this.http.get("https://localhost:7229/api/saved-offer/user-saved-offer",
      { params: new HttpParams().set("offerid", ResumeID)
          .set("userid", 10) }).subscribe(response => this.displayButton(Number(response)));
  }

  public displayButton(ID : number)
  {
    if (ID != 0)
    {
      CvFullComponent.Bookmarked = true;
    }
    else
    {
      CvFullComponent.Bookmarked = false;
    }
  }

}
