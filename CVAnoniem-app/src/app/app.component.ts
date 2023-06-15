import {Component, OnInit} from '@angular/core';
import {SessionHandler} from "./config/SessionHandler";
import {GoogleApiService} from "./user/social-login/google-login/google-api.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'CVAnoniem-app';

  ngOnInit() {
    SessionHandler.setUserSession(10);
    SessionHandler.setUsertypeSession("employee");
  }

  constructor(private readonly google: GoogleApiService) {
  }
}

