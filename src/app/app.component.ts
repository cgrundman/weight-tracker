import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { 
  Chart, 
  ChartConfiguration, 
  ChartOptions, 
  ChartType, 
  ChartDataset 
} from 'chart.js';
import { NgChartsModule } from 'ng2-charts';

import annotationPlugin from 'chartjs-plugin-annotation';
import { WEIGHT_DATA } from './data/weight-data';

Chart.register(annotationPlugin)

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgChartsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Weight Tracker';
  weightData = WEIGHT_DATA;

  public fullChartData: any[] = [];
  public fullChartLabels: string[] = [];

  public threeMonthChartData: any[] = [];
  public threeMonthChartLabels: string[] = [];

  public twoWeekChartData: any[] = [];
  public twoWeekChartLabels: string[] = [];

  // Test
  public chartOptions: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      annotation: {
        annotations: {
          goalLine: {
            type: 'line',
          yMin: 85, // your goal weight
          yMax: 85,
          borderColor: 'red',
          borderWidth: 2,
          borderDash: [6, 6],
          label: {
            content: 'Goal: 85 kg',
            position: 'start',
            backgroundColor: 'rgba(255,0,0,0.2)',
            color: 'red',
          } 
          }
        }
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Day',
        },
        ticks: {
          display: false,
        }
      },
      y: {
        title: {
          display: true,
          text: 'Weight (kg)',
        },
        beginAtZero: false,
      },
    },
  };

  constructor() {

    // Create important dates
    const today = new Date();
    const twoWeeksAgo = new Date();
    twoWeeksAgo.setDate(today.getDate() - 13);

    const twoWeeksData = this.weightData.filter((d) => {
      const entryDate = new Date(d.date);
      return entryDate >= twoWeeksAgo && entryDate <= today;
    });

    const threeMonthsAgo = new Date();
    threeMonthsAgo.setDate(today.getDate() - 89);

    const threeMonthData = this.weightData.filter((d) => {
      const entryDate = new Date(d.date);
      return entryDate >= threeMonthsAgo && entryDate <= today;
    });

    // Full  chart
    this.fullChartData = [
      {
        type: 'line',
        data: this.weightData.map((d) => d.weight),
        label: 'Weight (90 Days)',
        borderColor: 'blue',
        tension: 0.3,
      },
    ];
    this.fullChartLabels = this.weightData.map((_, i) => `Day ${i + 1}`);

    // Full 90-day chart
    this.threeMonthChartData = [
      {
        type: 'line',
        data: threeMonthData.map((d) => d.weight),
        label: 'Weight (90 Days)',
        borderColor: 'blue',
        tension: 0.3,
      },
    ];
    this.threeMonthChartLabels = threeMonthData.map((_, i) => `Day ${i + 1}`);

    // Last 14-day chart
    this.twoWeekChartData = [
      {
        type: 'line',
        data: twoWeeksData.map((d) => d.weight),
        label: 'Weight (Last 2 Weeks)',
        borderColor: 'green',
        tension: 0.3,
      },
    ];
    this.twoWeekChartLabels = twoWeeksData.map((_, i) => `Day ${i + 1}`);
  }
}
