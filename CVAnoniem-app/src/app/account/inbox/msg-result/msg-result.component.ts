import {Component, Input} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {FormControl, FormGroup} from "@angular/forms";
import {SessionHandler} from "../../SessionHandler";
import {Permission} from "../../../../models/permission";
import {CvFullComponent} from "../../../cv/cv-full/cv-full.component";

@Component({
  selector: 'app-msg-result',
  templateUrl: './msg-result.component.html',
  styleUrls: ['./msg-result.component.css']
})
export class MsgResultComponent {

  @Input() Sender: string = "";
  @Input() Subject: string = "";
  @Input() message: string = "";
  @Input() DateSent: string = "";
  @Input() Attachment: string = "";

  constructor(private http : HttpClient)
  {

  }

  PermissionForm = new FormGroup({
    PermissionID : new FormControl(),
    OfferID : new FormControl(),
    EmployerID : new FormControl()
  });

  onPostGrantPermission(permission : {
    PermissionID : number,
    OfferID : number,
    EmployerID : number
  })
  {
    permission.EmployerID = SessionHandler.getSession();
    this.acceptRequest(permission, Number(this.Sender));
  }

  public acceptRequest(permission : Permission, senderid : number)
  {
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*');
    let body = JSON.stringify(permission);
    this.http.post("https://localhost:7229/api/permission",
      body,
      {'headers' : headers ,
        params : new HttpParams().set('senderid', senderid)})
      .subscribe(
          response => alert("uploaded")
    );
  }

  public rejectRequest()
  {
    alert("Rejected")
    this.http.delete("https://localhost:7229/api/permission");
  }
}
