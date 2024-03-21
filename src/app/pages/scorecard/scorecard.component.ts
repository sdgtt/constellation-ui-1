import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-scorecard',
  templateUrl: './scorecard.component.html',
  styleUrls: ['./scorecard.component.scss']
})
export class ScorecardComponent implements OnInit {

  scorecard ="The Scorecard generates the test results summary for the last 7 days, by default, to show trends of issues and failures of the test stages.";

  loadingMain: boolean = false;
  loadingMainText: string = "Loading...";

  constructor() { }

  // loadingIndicator() {
  //   this.loadingMainText = "Loading...";
  //   this.loadingMain = true;
  // }
  ngOnInit(): void {
  }

}
