import {Component} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {OfferAPI_Requests} from "../../config/API_Requests/OfferAPI_Requests"
import {Offer} from "../../../models/offer"
import {FormControl, FormGroup} from "@angular/forms";
import {SessionHandler} from "../../config/SessionHandler";
import {Router} from "@angular/router";

@Component({
  selector: 'app-upload-cv',
  templateUrl: './upload-cv.component.html',
  styleUrls: ['./upload-cv.component.css']
})

export class UploadCvComponent {

  private userid: number = SessionHandler.getUserSession();

  private userHasOffer!: Offer[];

  OfferAPI = new OfferAPI_Requests(this.http);

  constructor(private http: HttpClient, private router:Router) {
    this.OfferAPI.getByJobseekerID(this.userid)
      .subscribe(
        response => {
          this.userHasOffer = response;
        });
  }

  Offerform = new FormGroup({
    OfferID: new FormControl(),
    Title: new FormControl(),
    Workfield: new FormControl(),
    Province: new FormControl(),
    Description: new FormControl(),
    JobSeekerID: new FormControl()
  });

  //offer? : Offer;
  fileSrc: any = null;

  onUpload(file: File) {

    this.fileSrc = file;

  }

  onOfferPost(offer: {
    OfferID: number,
    Title: string,
    WorkField: string,
    Description: string,
    Province: string,
    JobSeekerID: number
  }) {
    if (this.userHasOffer.length < 1) {
      offer.OfferID = 0;
    } else {
      offer.OfferID = this.userHasOffer[0].OfferID;
    }

    offer.JobSeekerID = this.userid;

    if (this.userHasOffer.length > 0) {
      this.updateOffer(offer);
    } else {
      this.addOffer(offer);
    }
  }

  addOffer(offer: Offer) {
    if (this.confirmUpdate()) {

      const formData = new FormData();
      formData.append("file", this.fileSrc);

      this.OfferAPI.postWithResume(formData, JSON.stringify(offer)).subscribe(response => console.log(response));

      this.redirect();
    }
  }

  redirect(){
    alert("upload succesvol");
    this.router.navigate(["/redact-resume"]);
  }


  updateOffer(offer: Offer) {
    if (this.confirmUpdate()) {

      const formData = new FormData();
      formData.append("file", this.fileSrc);

      this.OfferAPI.putWithResume(formData, JSON.stringify(offer)).subscribe
      (response => console.log(response));

      this.redirect();
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

