import {Component} from '@angular/core';

@Component({
  selector: 'app-cv-page',
  templateUrl: './cv-page.component.html',
  styleUrls: ['./cv-page.component.css']
})

export class CvPageComponent {

  public OfferID: number = 0;

  onClickOffer(event: any) {
    this.OfferID = event;
  }
}
