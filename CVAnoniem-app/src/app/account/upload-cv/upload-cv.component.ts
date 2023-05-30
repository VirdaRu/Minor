import {Component} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable , map} from "rxjs";
import {Offer} from "../../../models/offer"
import { FormGroup, FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-upload-cv',
  templateUrl: './upload-cv.component.html',
  styleUrls: ['./upload-cv.component.css']
})

export class UploadCvComponent{

  userid : number = 17;

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
    console.log(offer);
  }

  addOffer(offer : Offer)
  {
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*');
    let body = JSON.stringify(offer);

    //Add new Resume
    if (this.confirmUpdate()){
      this.http.post("https://localhost:7229/api/offer", body, {'headers': headers}).
      subscribe();
    }
    else
    {

    }
    //TODO: In Angular.json there is a line referencing a proxy file, this is for development! On production REMOVE it!
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

  public UpdateResume(body : string)
  {
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*');
    this.http.put("https://localhost:7229/api/offer", body,
      { 'headers': headers, params:new HttpParams().set('userid', this.userid)}).subscribe(
        response => alert("Uw CV is geupdated."));
  }

}
