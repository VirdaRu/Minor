import {Component} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {MessageAPI_Requests} from "../../../config/API_Requests/MessageAPI_Requests";
import {Message} from "../../../../models/message";
import {AdminDashboardComponent} from "../admin-dashboard.component";

@Component({
  selector: 'app-message-admin-page',
  templateUrl: './message-admin-page.component.html',
  styleUrls: ['./message-admin-page.component.css']
})
export class MessageAdminPageComponent {
  public messageAPI = new MessageAPI_Requests(this.http);

  messages!: Message[];

  constructor(private http: HttpClient) {
    this.messageAPI.get().subscribe(
      response => {
        this.messages = response
        AdminDashboardComponent.ItemsAmount = this.messages.length;
      })
  }

  public delete(id: number) {
    if (confirm("Weet u het zeker?")) {
      this.messageAPI.delete(id).subscribe();
    }
  }
}
