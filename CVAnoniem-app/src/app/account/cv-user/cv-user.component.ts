import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {SessionHandler} from "../../config/SessionHandler";
import {HttpClient} from "@angular/common/http";
import {ResumeAPI_Requests} from "../../config/API_Requests/ResumeAPI_Requests";
import {Subject} from "rxjs";


@Component({
  selector: 'app-cv-user',
  templateUrl: './cv-user.component.html',
  styleUrls: ['./cv-user.component.css']
})

export class CvUserComponent implements OnChanges {

  @Input() offerID = 0;

  @Input() clickToShowFull: Subject<any> = new Subject<any>();

  ngOnChanges(changes: SimpleChanges) {

    this.showResume();

    if (this.offerID != 0) {    //Show censored resume
      this.getResume();
    }
  }

  private userid: number = SessionHandler.getUserSession();
  fileSrc: any;
  received: boolean = false;

  ResumeAPI = new ResumeAPI_Requests(this.http);

  constructor(private http: HttpClient) {
    console.log(this.offerID);
  }

  public getResume() {
    this.ResumeAPI.getByID(this.offerID).subscribe(response => {
      this.downloadBuffer(response);});
  }

  public getFullResume() {
    this.ResumeAPI.getUncensoredResume(this.userid).subscribe(response => {
      this.downloadBuffer(response)});
  }

  public downloadBuffer(arrayBuffer: any) {
    this.fileSrc = new Blob([arrayBuffer], {type: 'application/pdf'})
    this.received = true;
  }

  public showResume() {
    this.clickToShowFull.subscribe(response => {
      //if (this.offerID != 0) {      //if user has an offer
        if (response) {            //if user clicked show full resume
          this.getFullResume();
        } else {                     //else display censored resume
          this.getResume();
        }
      //}
    });
  }
}
