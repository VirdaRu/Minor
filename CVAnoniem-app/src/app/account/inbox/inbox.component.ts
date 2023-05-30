import {Component, Input} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Message} from "../../../models/message";

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})
export class InboxComponent {

  Messages! : Message[];

  constructor(private http : HttpClient) {
  }

  ngOnInit()
  {
    this.GetMessages();
  }

  public GetMessages()
  {
    return this.http.get<Message[]>("https://localhost:7229/api/message", {params : new HttpParams().set("id", 10)})
      .subscribe(response =>  this.Messages = response);
  }
}
