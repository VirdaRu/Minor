import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {SessionHandler} from "../../config/SessionHandler";
import {HttpClient, HttpParams} from "@angular/common/http";
import {ResumeAPI_Requests} from "../../config/API_Requests/ResumeAPI_Requests";
import {Constants} from "../../config/constants";
import {Subject} from "rxjs";


@Component({
  selector: 'app-cv-user',
  templateUrl: './cv-user.component.html',
  styleUrls: ['./cv-user.component.css']
})

export class CvUserComponent implements OnChanges {

  @Input() offerID = 0;

  @Input() clickToShowFull: Subject<any> = new Subject<any>();

  ShowFullResume: boolean = true;

  ngOnChanges(changes: SimpleChanges) {
    console.log("V");
    console.log(this.offerID)

    this.showResume();

    if (this.offerID != 0) {    //Show censored resume
      this.getResume();
    }
    //this.getResume();
    // You can also use categoryId.previousValue and
    // categoryId.firstChange for comparing old and new values

  }

  private userid: number = SessionHandler.getUserSession();
  fileInfo: string = "";
  fileSrc: any;
  received: boolean = false;

  ResumeAPI = new ResumeAPI_Requests(this.http);

  constructor(private http: HttpClient) {
    console.log(this.offerID);

  }

  public getResume() {
    this.http.get(`${Constants.API_URL}/resume`, {
      'responseType': 'arraybuffer' as 'json',
      params: new HttpParams().set("userID", this.offerID)
    }).subscribe(response => {
      console.log(response);
      this.downloadBuffer(response);
    });
  }

  public getFullResume() {
    this.http.get(`${Constants.API_URL}/resume/full-resume`, {
      'responseType': 'arraybuffer' as 'json',
      params: new HttpParams().set("userID", this.userid)
    }).subscribe(response => {
      this.downloadBuffer(response)
    })
  }

  public downloadBuffer(arrayBuffer: any) {
    this.fileSrc = new Blob([arrayBuffer], {type: 'application/pdf'})
    this.received = true;
    // const a = document.createElement('a')
    // a.href = URL.createObjectURL(new Blob(
    //   [ arrayBuffer ],
    //   { type: 'application/pdf' }
    // ))
    // a.download = fileName
    // a.click()
  }

  public showResume() {
    this.clickToShowFull.subscribe(response => {

      if (this.offerID != 0) {      //if user has an offer
        if (response) {            //if user clicked show full resume
          this.getFullResume();
        } else {                     //else display censored resume
          this.getResume();
        }
      }
    });
  }
}
