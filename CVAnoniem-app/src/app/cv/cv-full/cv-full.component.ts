import {Component, Input} from '@angular/core';


@Component({
  selector: 'app-cv-full',
  templateUrl: './cv-full.component.html',
  styleUrls: ['./cv-full.component.css']
})
export class CvFullComponent {
  @Input() showOptions: boolean = false;

  public SendRequest() : void {
    alert("Request sent to person");
  }

  public BookmarkResume() : void {
    alert("Resume added to favourites.")
  }
}
