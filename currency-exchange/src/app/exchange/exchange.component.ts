import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-exchange',
  templateUrl: './exchange.component.html',
  styleUrls: ['./exchange.component.css']
})
export class ExchangeComponent implements OnInit {
  public resultClass = 'result-container';
  public exchangerId = 'main-panel-down';

  constructor() {}

  switch() {
    if (this.resultClass === 'result-show') {
      this.resultClass = 'result-hide';
      this.exchangerId = 'main-panel-down';
    } else {
      this.resultClass = 'result-show';
      this.exchangerId = 'main-panel-up';
    }
  }

  ngOnInit() {}
}
