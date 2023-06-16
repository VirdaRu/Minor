import { Component } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {SessionHandler} from "../SessionHandler";

@Component({
  selector: 'app-cv-upload-file',
  templateUrl: './cv-upload-file.component.html',
  styleUrls: ['./cv-upload-file.component.css']
})
export class CvUploadFileComponent {

  constructor(private http : HttpClient) {
  }

  private userID = SessionHandler.getSession();
  fileName = '';
  filesrc : any;
  uploaded : boolean = false;

  onFileSelected({event}: { event: any }) {

    const file:File = event.target.files[0];

    if (file) {

      //this.fileName = file.name;
      //this.filesrc = file;
      //this.uploaded = true;
      const formData = new FormData();

      formData.append("file", file);

      const upload$ = this.http.post("https://localhost:7229/api/resume/test", formData, {params: new HttpParams().set("userID", this.userID)});

      upload$.subscribe(response => this.onResponse(Number(response), file));
      // upload$.subscribe(response => {
      //   this.fileName = response.toString();
      //});
    }
  }

  public onResponse(ID : number, file : File){
    if (ID == 1){
      this.fileName = file.name;
      this.filesrc = file;
      this.uploaded = true;
    }else if (ID == 0) {
      this.fileName = "Deze website ondersteund alleen bestanden in PDF formaat.";
    }else if (ID == 2) {
      this.fileName = "Het bestand dat u heeft gekozen is groter dan 2MB, upload alstublieft een kleiner bestand.";
    }
  }

}
