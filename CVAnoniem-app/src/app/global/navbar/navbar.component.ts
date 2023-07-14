import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {SessionHandler} from "../../config/SessionHandler";

let isLoggedin: number = SessionHandler.getUserSession();

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent {
  constructor(
    public router : Router
  ) { }


  //Check which page to navigate to based on login status
  public isLoggedIn() {
    if (isLoggedin != 0) {
      this.router.navigateByUrl('/Account')
    } else {
      this.router.navigateByUrl('/Login')
    }
  }

}
