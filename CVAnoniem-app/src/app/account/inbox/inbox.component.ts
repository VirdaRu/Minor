import {Component, Input} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Message} from "../../../models/message";
import {SessionHandler} from "../SessionHandler";
import { MessageAPI_Requests } from "../../config/API_Requests/MessageAPI_Requests"

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})
export class InboxComponent {

  Messages! : Message[];
  private userid = SessionHandler.getSession();

  MessageAPI = new MessageAPI_Requests(this.http);

  constructor(private http : HttpClient) {
  }

  ngOnInit()
  {
    this.GetMessages();
  }

  public GetMessages()
  {
    return this.MessageAPI.get();
    /*
    return this.http.get<Message[]>("https://localhost:7229/api/message",
      {params : new HttpParams().set("userid", this.userid)})
      .subscribe(response =>  this.Messages = response);*/
  }
}
