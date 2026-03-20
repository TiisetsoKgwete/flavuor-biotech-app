import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false,
})
export class HomePage {
  widgetLoaded = {
    hunger: false,
    waste: false,
  };

  onWidgetLoad(widget: 'hunger' | 'waste') {
    this.widgetLoaded[widget] = true;
  }
}

