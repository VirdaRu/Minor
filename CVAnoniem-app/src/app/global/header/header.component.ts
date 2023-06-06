import {Component} from '@angular/core';
import {SessionHandler} from "../../account/SessionHandler";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  loggedInUser! : number;

  constructor()
  {
    this.loggedInUser = SessionHandler.getSession();
  }
}
