import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: "app-linkedin-response",
  templateUrl: "./linkedin-response.component.html",
  styleUrls: ["./linkedin-response.component.css"]
})
export class LinkedinResponseComponent implements OnInit {

  linkedInToken = "";

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.linkedInToken = this.route.snapshot.queryParams["code"];
  }

}
