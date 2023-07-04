import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {SessionHandler} from "../../config/SessionHandler";
import {HttpClient, HttpParams} from "@angular/common/http";
import {ResumeAPI_Requests} from "../../config/API_Requests/ResumeAPI_Requests";
import {Constants} from "../../config/constants";


@Component({
  selector: 'app-cv-user',
  templateUrl: './cv-user.component.html',
  styleUrls: ['./cv-user.component.css']
})

export class CvUserComponent implements OnChanges{

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

    console.log(this.offerID);
  }

  public GotResume() {
    //this.ResumeAPI.get()


    this.http.get(`${Constants.API_URL}/resume`, {
      'responseType': 'arraybuffer' as 'json',
      params: new HttpParams().set("userID", this.offerID)
    }).subscribe(response => {
      console.log(response);
      this.downloadBuffer(response, "test");
    });

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
