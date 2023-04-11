import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-cv',
  templateUrl: './cv.component.html',
  styleUrls: ['./cv.component.css']
})
export class CvComponent{
  @Input() Branche: string = "";
  @Input() Beschrijving: string = "";
  @Input() Provincie: string = "";

}
