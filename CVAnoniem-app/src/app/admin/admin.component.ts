import {Component} from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {

  PasswordCorrect: boolean = false;

  constructor() {
  }

  CheckPassword(input: any) {
    if (input === "Hello") {
      this.PasswordCorrect = true;
    }
  }
}
