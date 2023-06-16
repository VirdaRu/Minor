import {Component} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {OfferAPI_Requests} from "../../config/API_Requests/OfferAPI_Requests"
import {Offer} from "../../../models/offer"
import {FormControl, FormGroup} from "@angular/forms";
import {SessionHandler} from "../../config/SessionHandler";
import {CvListComponent} from "../../cv/cv-list/cv-list.component";

@Component({
  selector: 'app-upload-cv',
  templateUrl: './upload-cv.component.html',
  styleUrls: ['./upload-cv.component.css']
})

export class UploadCvComponent{

  private userid : number = SessionHandler.getUserSession();

  API_Request = new OfferAPI_Requests(this.http);

  constructor(private http : HttpClient) {

  }

  Offerform = new FormGroup({
    OfferID : new FormControl(),
    Title : new FormControl(),
    Workfield : new FormControl(),
    Province : new FormControl(),
    Description : new FormControl(),
    JobSeekerID : new FormControl()
  });

  offer? : Offer;

  onOfferPost(offer : {
    OfferID : number,
    Title: string,
    WorkField: string,
    Description: string,
    Province: string,
    JobSeekerID: number
  }) {
    offer.OfferID =
      offer.JobSeekerID = this.userid;
    if (CvListComponent.OfferID != 0) {
      this.addOffer(offer);
    } else {
      this.updateOffer(offer)
    }
  }

  addOffer(offer: Offer) {
    if (this.confirmUpdate()) {
      this.API_Request.post(offer).subscribe(response => console.log(response));
    }
  }

  updateOffer(offer: Offer) {
    if (this.confirmUpdate()) {
      this.API_Request.put(offer, offer.OfferID).subscribe
      (response => console.log(response));
    }
  }


  public confirmUpdate() {
    let confirmation =
      confirm("Als u al een CV heeft, wordt dit CV overschreven. Wilt u het huidige CV overschrijven?");
    if (confirmation) {
      return true;
    } else
    {
      return false;
    }
  }
}

//TODO: For new components commit to git --> Add VCS
//TODO: In Angular.json there is a line referencing a proxy file, this is for development! On production REMOVE it!
