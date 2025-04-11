import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ChartConfiguration } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';

import { WEIGHT_DATA } from './data/weight-data';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgFor, NgChartsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'weight-tracker';
  weightData = WEIGHT_DATA;

  // Loop through date data and format
  public chartData: ChartConfiguration<'line'>['data'] = {
    labels: this.weightData.map((_, i) => `Day ${i + 1}`),
    datasets: [
      {
        label: 'Weight (kg)',
        data: this.weightData.map(entry => entry.weight),
        borderColor: 'blue',
        fill: false,
        tension: 0.3
      }
    ]
  };

  public chartOptions: ChartConfiguration<'line'>['options'] = {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Day'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Weight (kg)'
        },
        beginAtZero: false
      }
    }
  };
}
