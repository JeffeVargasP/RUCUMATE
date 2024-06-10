import { Component, OnInit } from '@angular/core';
import { EspressifService } from '../service/espressif.service';

@Component({
  selector: 'app-luminosity',
  templateUrl: './luminosity.component.html',
  styleUrls: ['./luminosity.component.scss']
})
export class LuminosityComponent implements OnInit {

  data: any;
  options: any;
  sensorData: any;

  constructor(private espressifService: EspressifService) { }

  ngOnInit(): void {
    this.espressifService.getEspressif().subscribe((res: any) => {
      this.sensorData = res;

      const labels = this.sensorData.map((item: any) => new Date(item.createdAt).toLocaleTimeString());
      const luminosityData = this.sensorData.map((item: any) => item.luminosity);

      this.data = {
        labels: labels,
        datasets: [
          {
            label: 'Luminosidade',
            data: luminosityData,
            fill: true,
            borderColor: '#FFEB3B',
            backgroundColor: 'rgba(255, 235, 59, 0.2)',
            tension: 0.4,
            pointRadius: 5,
            pointHoverRadius: 7,
            pointBackgroundColor: '#FFEB3B',
            pointHoverBackgroundColor: '#FFEB3B'
          }
        ]
      };

      this.options = {
        maintainAspectRatio: false,
        aspectRatio: 0.6,
        responsive: true,
        interaction: {
          mode: 'index',
          intersect: false
        },
        plugins: {
          legend: {
            display: true,
            labels: {
              color: '#ffffff',
              font: {
                size: 14
              }
            }
          },
          tooltip: {
            enabled: true,
            mode: 'index',
            intersect: false,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            titleFont: {
              size: 16
            },
            bodyFont: {
              size: 14
            },
            footerFont: {
              size: 12
            }
          }
        },
        scales: {
          x: {
            ticks: {
              color: '#ffffff'
            },
            grid: {
              color: 'rgba(255, 255, 255, 0.2)',
              drawBorder: false
            }
          },
          y: {
            ticks: {
              color: '#ffffff'
            },
            grid: {
              color: 'rgba(255, 255, 255, 0.2)',
              drawBorder: false
            }
          }
        }
      };
    });
  }
}