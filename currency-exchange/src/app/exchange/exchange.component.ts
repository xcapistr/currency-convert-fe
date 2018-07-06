import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Http } from '@angular/http';

import { currencies } from './mock-currencies';
import { StatComponent } from '../stat/stat.component';

@Component({
  selector: 'app-exchange',
  templateUrl: './exchange.component.html',
  styleUrls: ['./exchange.component.css']
})
export class ExchangeComponent implements OnInit {
  @Output() myEvent = new EventEmitter();

  public resultClass = 'result-container';
  public exchangerId = 'main-panel-down';
  public isPanelOpened = false;

  public curr = currencies;

  public currencyA;
  public currencyB;
  public amount;
  public result;
  public msg;

  constructor(public http: Http) {}

  checkInput() {
    if (!this.currencyA || !this.currencyB) {
      this.msg = 'Currencies must be defined.';
      return false;
    }
    if (!this.amount) {
      this.msg = 'Amount must be defined.';
      return false;
    } else if (String(this.amount).length > 16) {
      this.msg = 'Max length of amount value is 16 digits.';
      return false;
    }
    return true;
  }

  swapCurrencies() {
    var pom = this.currencyA;
    this.currencyA = this.currencyB;
    this.currencyB = pom;
  }

  openPanel() {
    if (!this.isPanelOpened) {
      this.resultClass = 'result-show';
      this.exchangerId = 'main-panel-up';
    }
    this.isPanelOpened = true;
  }

  closePanel() {
    if (this.isPanelOpened) {
      this.resultClass = 'result-hide';
      this.exchangerId = 'main-panel-down';
      this.isPanelOpened = false;
    }
  }

  convert() {
    this.result = undefined;
    this.msg = undefined;

    if (this.checkInput()) {
      var link = '/conversions';
      var myData = {
        currencyA: this.currencyA,
        currencyB: this.currencyB,
        amountA: this.amount
      };
      var response = '';
      this.http.post(link, myData).subscribe(
        data => {
          response = JSON.parse(data['_body']);
          console.log(response);
          console.log(response['conversion']);
          this.result =
            Math.round(response['conversion']['amountB'] * 10000) / 10000;
          // message about change for stat component
          this.openPanel();
          this.myEvent.emit(null);
        },
        error => {
          response = JSON.parse(error['_body']);
          this.msg = 'Error: ' + response['message'];
          console.log(this.msg);
          this.openPanel();
        }
      );
    } else {
      this.openPanel();
    }
  }

  ngOnInit() {}
}
