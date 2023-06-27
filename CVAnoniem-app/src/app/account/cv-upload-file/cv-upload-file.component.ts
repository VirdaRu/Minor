import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SessionHandler} from "../../config/SessionHandler";

@Component({
  selector: 'app-cv-upload-file',
  templateUrl: './cv-upload-file.component.html',
  styleUrls: ['./cv-upload-file.component.css']
})
export class CvUploadFileComponent implements OnInit {

  constructor(private http: HttpClient) {
  }

  private userID = SessionHandler.getUserSession();
  fileInfo = '';
  fileSrc : any;
  uploaded : boolean = false;

  ngOnInit() {
  }

  @Output() upload = new EventEmitter<File>();

  onFileSelected({event}: { event: any }) {

    const file:File = event.target.files[0];

    if (file) {
      const formData = new FormData();

      formData.append("file", file);

      const upload$ = this.http.post("https://localhost:7229/api/resume/check", formData);
      upload$.subscribe(response => this.onResponse(Number(response), file));

      //this.fileName = file.name;
      // this.fileSrc = file;
      // this.uploaded = true;
      // this.upload.emit(file);
      // const formData = new FormData();
      //
      // formData.append("file", file);
      //
      // const upload$ = this.http.post("https://localhost:7229/api/resume/test", formData, {params: new HttpParams().set("userID", this.userID)});
      //
      // upload$.subscribe(response => this.onResponse(Number(response), file));
      // upload$.subscribe(response => {
      //   this.fileName = response.toString();
      //});
    }


  }

  public onResponse(ID : number, file : File){
    if (ID == 1){
      this.fileInfo = file.name;
      this.fileSrc = file;
      this.uploaded = true;
      this.upload.emit(file);
    }else if (ID == 0) {
      this.fileInfo = "Deze website ondersteund alleen bestanden in PDF formaat.";
      this.fileSrc = null;
    }else if (ID == 2) {
      this.fileInfo = "Het bestand dat u heeft gekozen is groter dan 20MB, upload alstublieft een kleiner bestand.";
      this.fileSrc = null;
    }
  }

}
