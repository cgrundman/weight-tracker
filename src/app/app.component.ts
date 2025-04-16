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

  goal_weight = 85.0;

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
            yMin: this.goal_weight, // your goal weight
            yMax: this.goal_weight,
            borderColor: '#fa2c05',
            borderWidth: 2,
            borderDash: [6, 6],
            label: {
              position: 'start',
              backgroundColor: '#fa2c05',
              color: 'red',
            } 
          },
          targetZone: {
            type: 'box',
            yMin: this.goal_weight - 0.01*this.goal_weight,     // Lower bound
            yMax: this.goal_weight + 0.01*this.goal_weight,     // Upper bound
            backgroundColor: 'rgba(255, 77, 6, 0.3)', // Light green fill
            borderColor: 'rgba(255, 77, 6, 0.5)',
            borderWidth: 1,
            label: {
              content: 'Target Zone',
              position: 'center',
              color: 'green',
              // backgroundColor: 'rgba(0, 255, 0, 0.2)'
            }
          }
        }
      },
    },
    scales: {
      x: {
        title: {
          display: false,
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
        borderColor: '#0546ff',
        pointRadius: 0.0,
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
        borderColor: '#0546ff',
        pointRadius: 0.0,
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
        borderColor: '#0546ff',
        pointBackgroundColor: '#8514f5',
        tension: 0.3,
      },
    ];
    this.twoWeekChartLabels = twoWeeksData.map((_, i) => `Day ${i + 1}`);
  }
}
