import {Component, EventEmitter, Injectable, Output} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable, tap} from "rxjs";
import {query} from "@angular/animations";
import {Offer} from "../../../models/offer";
import {CvListComponent} from "../../cv/cv-list/cv-list.component";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent  {

  @Output() offers : Offer[] = [];

  constructor(private http : HttpClient) {

  }

  public getResumes(userInput :string)
  {
    this.getResultsBySearch(userInput);

  }

  public getResultsBySearch(query : string)
  {
    CvListComponent.query = query;
    /*
    return this.http.get<Offer[]>("https://localhost:7229/api/offer/search-offers",
      { params : new HttpParams().set('query',query)}).pipe(
        tap(response => this.offers = response));*/
  }
}

