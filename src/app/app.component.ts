import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { WEIGHT_DATA } from './data/weight-data';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgFor],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'weight-tracker';
  weightData = WEIGHT_DATA;
}
