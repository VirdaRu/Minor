import {Component} from '@angular/core';
import {CvFullComponent} from "../cv/cv-full/cv-full.component";
import {OfferAPI_Requests} from "../config/API_Requests/OfferAPI_Requests";
import {HttpClient} from "@angular/common/http";
import {FormControl, FormGroup} from "@angular/forms";
import {SessionHandler} from "../config/SessionHandler";
import {MessageAPI_Requests} from "../config/API_Requests/MessageAPI_Requests";

@Component({
  selector: 'app-message-sender',
  templateUrl: './message-sender.component.html',
  styleUrls: ['./message-sender.component.css']
})
export class MessageSenderComponent {

  MessageReceiver: number = CvFullComponent.JobseekerID;

  OfferAPI = new OfferAPI_Requests(this.http);
  MessageAPI = new MessageAPI_Requests(this.http);

  constructor(private http: HttpClient) {

  }

  /**
   * This function posts a message to the database.
   */
  MessageForm = new FormGroup({
    MessageID: new FormControl(),
    JobSeekerID: new FormControl(),
    EmployerID: new FormControl(),
    Subject: new FormControl(),
    Attachment: new FormControl(),
    message: new FormControl(),
    DateSent: new FormControl()
  });

  onMessagePost(Message: {
    MessageID: number,
    JobSeekerID: number,
    EmployerID: number,
    Subject: string,
    Attachment: string,
    message: string,
    DateSent: string
  }) {
    let CurrentDate = new Date();
    Message.Attachment = "";
    Message.EmployerID = SessionHandler.getUserSession();
    Message.JobSeekerID = this.MessageReceiver;
    Message.DateSent = CurrentDate.toDateString();
    this.sendMessage(Message);
  }


  public sendMessage(body: any) {
    this.MessageAPI.post(body).subscribe(response =>
      console.log(response)
    );
    alert("Bericht is verzonden!")
    console.log(body);
  }
}
