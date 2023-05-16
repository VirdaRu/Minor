import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {parseJson} from "@angular/cli/src/utilities/json-file";
import {map} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'CVAnoniem-app';
  test : any = "overwrite me";
  constructor(private http: HttpClient) {

  }

  ngOnInit() {
    this.http.get<Offer[]>("https://localhost:7229/api/offer/all-offers-list").subscribe(data =>{
      data.forEach( function (value) {
        alert(value.OfferID + "\n" + value.Description + "\n" + value.WorkField + "\n" + value.Province + "\n" + value.JobSeekerID);
      });
    })

  }
}

export interface Offer {
  OfferID : number;
  WorkField: string;
  Description : string;
  Province: string;
  JobSeekerID : number;
}
