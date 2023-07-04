import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {SessionHandler} from "../../config/SessionHandler";
import {HttpClient, HttpParams} from "@angular/common/http";
import {OfferAPI_Requests} from "../../config/API_Requests/OfferAPI_Requests";
import {ResumeAPI_Requests} from "../../config/API_Requests/ResumeAPI_Requests";


@Component({
  selector: 'app-cv-user',
  templateUrl: './cv-user.component.html',
  styleUrls: ['./cv-user.component.css']
})

export class CvUserComponent implements OnChanges{

  @Output() gotResume = new EventEmitter<boolean>();
  @Input() offerID = 7;

  ngOnChanges(changes: SimpleChanges) {
    console.log("V");
    console.log(this.offerID)
    if (this.offerID != 0){
      this.GotResume();
    }
    //this.GotResume();
    // You can also use categoryId.previousValue and
    // categoryId.firstChange for comparing old and new values

  }

  private userid: number = SessionHandler.getUserSession();
  fileInfo: string = "";
  fileSrc: any;
  received: boolean = false;

  ResumeAPI = new ResumeAPI_Requests(this.http);

  constructor(private http: HttpClient) {
    // check of user al een offer/resume heeft
    // this.http.get("https://localhost:7229/api/resume/user-has-resume", {params: new HttpParams().set("userID", this.userid)}).subscribe(response => {
    //   console.log(Number(response))
    //   if (Number(response) != 0) {
    //     this.GotResume()
    //   }
    // });
    //this.GotResume();

    console.log(this.offerID);
  }

  public GotResume() {

    this.http.get("https://localhost:7229/api/resume", {
      'responseType': 'arraybuffer' as 'json',
      params: new HttpParams().set("userID", this.offerID)
    }).subscribe(response => {
      console.log(response);
      this.downloadBuffer(response, "test");
    });
    this.gotResume.emit(true);
  }

  public downloadBuffer(arrayBuffer: any, fileName: string) {
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

  // haal cv op op basis van userid

}
