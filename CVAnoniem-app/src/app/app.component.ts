import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Offer} from "../models/offer";
import {SessionHandler} from "./config/SessionHandler";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'CVAnoniem-app';

  ngOnInit() {
    SessionHandler.setUserSession(10);
    SessionHandler.setUsertypeSession("employee");
  }
}

