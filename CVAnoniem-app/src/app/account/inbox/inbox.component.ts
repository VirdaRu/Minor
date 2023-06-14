import {Component, Input} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Message} from "../../../models/message";
import {SessionHandler} from "../../config/SessionHandler";
import { MessageAPI_Requests } from "../../config/API_Requests/MessageAPI_Requests"

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})
export class InboxComponent {

  Messages! : Message[];
  private userid = SessionHandler.getUserSession();

  MessageAPI = new MessageAPI_Requests(this.http);

  constructor(private http : HttpClient) {
  }

  ngOnInit()
  {
    this.MessageAPI.getByID(this.userid).subscribe(
      response => this.Messages = response
    );
  }

}
