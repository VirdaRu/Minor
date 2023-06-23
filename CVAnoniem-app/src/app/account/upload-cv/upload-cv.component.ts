import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {OfferAPI_Requests} from "../../config/API_Requests/OfferAPI_Requests"
import {Offer} from "../../../models/offer"
import { FormGroup, FormControl, Validators} from "@angular/forms";
import {SessionHandler} from "../SessionHandler";

@Component({
  selector: 'app-upload-cv',
  templateUrl: './upload-cv.component.html',
  styleUrls: ['./upload-cv.component.css']
})

export class UploadCvComponent{

  private userid : number = SessionHandler.getSession();

  API_Request = new OfferAPI_Requests(this.http);

  constructor(private http : HttpClient, private router : Router) {

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



  fileSrc : any = null;

  onUpload(file : File){

    this.fileSrc = file;

  }


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
    if (this.fileSrc == null){
      alert("Voeg alstublieft een pdf van een CV toe.")
    }else {
      this.addOffer(offer);
    }
  }

  addOffer(offer : Offer)
  {
    if (this.confirmUpdate()){
      //console.log(offer);
      const formData = new FormData();
      //formData.append("offer", JSON.stringify(offer));
      formData.append("file", this.fileSrc);

      this.http.post("https://localhost:7229/api/offer", formData, {params: new HttpParams().set("offer", JSON.stringify(offer))}).subscribe( response => console.log(response));

      // mischien confirm inplaats van alert
      alert("CV geupload");
      // test voor routerlink
      this.router.navigate(['/Account']);
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

}
