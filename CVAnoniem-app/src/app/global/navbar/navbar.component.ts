import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';

let isLoggedin : boolean = true;

declare function openNav(): void;
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

    if(isLoggedin){
      this.router.navigateByUrl('/Account')
    }else{
      this.router.navigateByUrl('/Login')
    }
  }

  public ChangeNav(){
    openNav()
  }
}
