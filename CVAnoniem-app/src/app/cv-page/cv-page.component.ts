import {Component, HostListener} from '@angular/core';

@Component({
  selector: 'app-cv-page',
  templateUrl: './cv-page.component.html',
  styleUrls: ['./cv-page.component.css']
})

export class CvPageComponent {

  public OfferID: number = 0;
  position : string = "static";

  @HostListener('window:scroll', ['$event.target']) // for window scroll events
  onScroll(event : any) {

    let e = event.scrollingElement.scrollTop;
    console.log(e);
    if (e >= 300){
      console.log("got here");
      this.position = "fixed";
    }
    if (e < 300){
      this.position = "static";
    }
  }

  onClickOffer(event: any) {
    this.OfferID = event;
    console.log(event + 1);
  }
}
