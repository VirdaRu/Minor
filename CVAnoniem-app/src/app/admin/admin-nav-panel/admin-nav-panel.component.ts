import {Component} from '@angular/core';

@Component({
  selector: 'app-admin-nav-panel',
  templateUrl: './admin-nav-panel.component.html',
  styleUrls: ['./admin-nav-panel.component.css']
})
export class AdminNavPanelComponent {

  static chosenPage: string = "user";

  public ButtonPressed(page: string) {
    AdminNavPanelComponent.chosenPage = page;
    alert(page);
  }
}
