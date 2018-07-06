import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'app-stat',
  templateUrl: './stat.component.html',
  styleUrls: ['./stat.component.css']
})
export class StatComponent implements OnInit {
  public conversionsCount;
  public conversionsSum;
  public favouriteDest = '-';

  constructor(public http: Http) {
    this.updateStat();
  }

  findMode(currencies) {
    if (currencies.length > 0) {
      let counted = currencies.reduce((acc, curr) => {
        if (curr in acc) {
          acc[curr]++;
        } else {
          acc[curr] = 1;
        }
        return acc;
      }, {});

      let mode = Object.keys(counted).reduce(
        (a, b) => (counted[a] > counted[b] ? a : b)
      );
      return mode;
    } else {
      return '-';
    }
  }

  public updateStat() {
    var link = '/conversions';
    var response = '';
    this.http.get(link).subscribe(
      data => {
        response = JSON.parse(data['_body']);
        this.conversionsCount = response.length;
        var sum = 0;
        var currs = [];
        for (let conversion of response) {
          if (conversion['amountUSD']) {
            sum += conversion['amountUSD'];
          }
          if (conversion['currencyB']) {
            currs.push(conversion['currencyB']);
          }
        }
        this.conversionsSum = Math.round(sum * 100) / 100;
        this.favouriteDest = this.findMode(currs);
        console.log(this.favouriteDest);
      },
      error => {
        response = JSON.parse(error['_body']);
        console.log(error);
      }
    );
  }

  ngOnInit() {}
}
