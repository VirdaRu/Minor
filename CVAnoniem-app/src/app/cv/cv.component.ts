import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-cv',
  templateUrl: './cv.component.html',
  styleUrls: ['./cv.component.css']
})
export class CvComponent{
  @Input() ResumeID: string = "";
  @Input() PDFPath: string = "";
  @Input() Title: string = "";
  @Input() Branche: string = "";
  @Input() Beschrijving: string = "";
  @Input() Provincie: string = "";



  public displayResume(){
    alert(`A ${this.Title}, would like to know your location`);
  }
}


