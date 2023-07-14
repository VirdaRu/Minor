import {Component, Input} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {FormControl, FormGroup} from "@angular/forms";
import {Permission} from "../../../../models/permission";
import {MessageAPI_Requests} from "../../../config/API_Requests/MessageAPI_Requests";
import {PermissionAPI_Requests} from "../../../config/API_Requests/PermissionAPI_Requests";

@Component({
  selector: 'app-msg-result',
  templateUrl: './msg-result.component.html',
  styleUrls: ['./msg-result.component.css']
})
export class MsgResultComponent {

  MessageAPI = new MessageAPI_Requests(this.http);

  PermissionAPI = new PermissionAPI_Requests(this.http);

  @Input() Sender: string = "";
  @Input() Subject: string = "";
  @Input() message: string = "";
  @Input() DateSent: string = "";
  @Input() Attachment: string = "";
  @Input() MessageID: string = "";

  constructor(private http: HttpClient) {

  }

  PermissionForm = new FormGroup({
    PermissionID: new FormControl(),
    OfferID: new FormControl(),
    EmployerID: new FormControl()
  });

  onPostGrantPermission(permission: {
    PermissionID: number,
    OfferID: number,
    EmployerID: number
  }) {
    permission.EmployerID = Number(this.Sender);
    this.acceptRequest(permission);
  }

  public acceptRequest(permission: Permission) {
    this.PermissionAPI.post(permission).subscribe();
  }

  public deleteRequest() {
    let userConfirmRemoval = confirm(
      "Weet u zeker dat uw dit bericht wilt verwijderen?"
    );

    if (userConfirmRemoval) {
      this.MessageAPI.delete(this.MessageID).subscribe();
    }
  }

  public rejectRequest() {
    //Offer Rejected
    alert("Offerte geweigerd")
  }
}
