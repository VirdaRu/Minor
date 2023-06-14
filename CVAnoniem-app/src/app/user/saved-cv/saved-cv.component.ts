import { Component } from '@angular/core';
import { Injectable} from "@angular/core";
import { HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-saved-cv',
  templateUrl: './saved-cv.component.html',
  styleUrls: ['./saved-cv.component.css']
})

@Injectable()
export class SavedCvComponent {
  constructor(private http : HttpClient) {

  }
}
