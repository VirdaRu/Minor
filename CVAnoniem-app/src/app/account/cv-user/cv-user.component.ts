import {Component} from '@angular/core';
import {SessionHandler} from "../../config/SessionHandler";
import {HttpClient, HttpParams} from "@angular/common/http";


@Component({
  selector: 'app-cv-user',
  templateUrl: './cv-user.component.html',
  styleUrls: ['./cv-user.component.css']
})
export class CvUserComponent {

  private userid : number = SessionHandler.getUserSession();
  fileInfo : string = "";
  fileSrc : any;
  received : boolean = false;

  constructor(private http : HttpClient) {
    // check of user al een offer/resume heeftt
    this.http.get("https://localhost:7229/api/resume/user-has-resume",{params: new HttpParams().set("userID", this.userid)}).subscribe( response => {
      console.log(Number(response))
      if (Number(response) != 0) {
        this.GotResume()
      }
    });
  }

  public GotResume(){
    this.http.get("https://localhost:7229/api/resume",{'responseType'  : 'arraybuffer' as 'json', params: new HttpParams().set("userID", this.userid)}).subscribe( response => {
      console.log(response);
      this.downloadBuffer(response, "test");
    });

  }
  public downloadBuffer(arrayBuffer : any, fileName : string) {
    this.fileSrc = new Blob([arrayBuffer], { type: 'application/pdf' })
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
