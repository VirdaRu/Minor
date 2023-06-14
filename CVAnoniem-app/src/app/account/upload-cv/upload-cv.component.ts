import {Component} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {OfferAPI_Requests} from "../../config/API_Requests/OfferAPI_Requests"
import {Offer} from "../../../models/offer"
import { FormGroup, FormControl, Validators} from "@angular/forms";
import {SessionHandler} from "../../config/SessionHandler";

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
  })
  {
    offer.JobSeekerID = this.userid;
    this.addOffer(offer);
  }

  addOffer(offer : Offer)
  {
    if (this.confirmUpdate()){
      this.API_Request.post(offer).subscribe( response => console.log(response));
    }
  }

  public confirmUpdate()
  {
    let confirmation =
      confirm("Als u al een CV heeft, wordt dit CV overschreven. Wilt u het huidige CV overschrijven?");
    if(confirmation)
    {
      return true;
    }else
    {
      return false;
    }
  }
}

//TODO: In Angular.json there is a line referencing a proxy file, this is for development! On production REMOVE it!
