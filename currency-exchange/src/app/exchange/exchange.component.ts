import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-exchange',
  templateUrl: './exchange.component.html',
  styleUrls: ['./exchange.component.css']
})
export class ExchangeComponent implements OnInit {
  show = false;

  constructor() {}

  switch() {
    console.log('dsfsdfds');
    if (this.show) {
      this.show = false;
    } else {
      this.show = true;
    }
  }

  ngOnInit() {}
}
