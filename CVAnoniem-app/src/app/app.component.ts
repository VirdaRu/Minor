import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'CVAnoniem-app';

  ngOnInit() {
    //SessionHandler.setUserSession(10);
    //SessionHandler.setUsertypeSession("employee");
  }

}

