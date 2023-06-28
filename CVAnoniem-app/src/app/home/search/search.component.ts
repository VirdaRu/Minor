import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CvListComponent} from "../../cv/cv-list/cv-list.component";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  // @Output() offers : Offer[] = [];

  constructor(private http : HttpClient) {

  }

  public OnClickSearch(query: string) {
    CvListComponent.query = query;
  }
}

