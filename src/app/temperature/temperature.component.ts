import { Component, OnInit } from '@angular/core';
import { EspressifService } from '../service/espressif.service';

@Component({
  selector: 'app-temperature',
  templateUrl: './temperature.component.html',
  styleUrls: ['./temperature.component.scss']
})
export class TemperatureComponent implements OnInit {

  data: any;
  options: any;
  sensorData: any;

  constructor(private espressifService: EspressifService) { }

  ngOnInit(): void {
    this.espressifService.getEspressif().subscribe((res: any) => {
      this.sensorData = res;

      const labels = this.sensorData.map((item: any) => new Date(item.createdAt).toLocaleTimeString());
      const temperatureData = this.sensorData.map((item: any) => item.temperature);

      this.data = {
        labels: labels,
        datasets: [
          {
            label: 'Temperatura',
            data: temperatureData,
            fill: true,
            borderColor: '#FF5722',
            backgroundColor: 'rgba(255, 87, 34, 0.2)',
            tension: 0.4,
            pointRadius: 5,
            pointHoverRadius: 7,
            pointBackgroundColor: '#FF5722',
            pointHoverBackgroundColor: '#FF5722'
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
              color: '#ffffff',
              font: {
                size: 12
              }
            },
            grid: {
              color: 'rgba(255, 255, 255, 0.2)',
              drawBorder: false
            },
            title: {
              display: true,
              text: 'Tempo',
              color: '#ffffff',
              font: {
                size: 14
              }
            }
          },
          y: {
            ticks: {
              color: '#ffffff',
              font: {
                size: 12
              }
            },
            grid: {
              color: 'rgba(255, 255, 255, 0.2)',
              drawBorder: false
            },
            title: {
              display: true,
              text: 'Temperatura (°C)',
              color: '#ffffff',
              font: {
                size: 14
              }
            }
          }
        }
      };
    });
  }

}
