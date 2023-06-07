import {Component} from '@angular/core';
import {GoogleApiService} from "./user/social-login/google-login/google-api.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'CVAnoniem-app';

  constructor(private readonly google: GoogleApiService) {
  }
}
