import {Component, HostListener} from '@angular/core';

@Component({
  selector: 'app-cv-page',
  templateUrl: './cv-page.component.html',
  styleUrls: ['./cv-page.component.css']
})

export class CvPageComponent {

  public OfferID: number = 0;

  /// manier om het getoonde cv fixed te houden, was niet erg compatible met andere schermen en browsers, gebruikte [style.position]="position" in de html
  //position : string = "static";
  // @HostListener('window:scroll', ['$event.target']) // for window scroll events
  // onScroll(event : any) {
  //   let e = event.scrollingElement.scrollTop;
  //   console.log(e);
  //   if (e >= 300){
  //     this.position = "fixed";
  //   }
  //   if (e < 300){
  //     this.position = "static";
  //   }
  // }

  onClickOffer(event: any) {
    this.OfferID = event;
  }
}
