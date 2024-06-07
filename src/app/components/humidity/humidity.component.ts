import { Component, OnInit } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { EspressifService } from '../../service/espressif.service';

@Component({
  selector: 'app-humidity',
  standalone: true,
  imports: [ChartModule],
  providers: [EspressifService],
  templateUrl: './humidity.component.html',
  styleUrls: ['./humidity.component.scss']
})
export class HumidityComponent implements OnInit {

  data: any;
  options: any;
  sensorData: any;

  constructor(private espressifService: EspressifService) { }

  ngOnInit(): void {
    this.espressifService.getEspressif().subscribe((res: any) => {
      this.sensorData = res;

      const labels = this.sensorData.map((item: any) => new Date(item.createdAt).toLocaleTimeString());
      const humidityData = this.sensorData.map((item: any) => item.humidity);

      this.data = {
        labels: labels,
        datasets: [
          {
            label: 'Umidade',
            data: humidityData,
            fill: true,
            borderColor: '#42A5F5',
            backgroundColor: 'rgba(66, 165, 245, 0.2)',
            tension: 0.4,
            pointRadius: 5,
            pointHoverRadius: 7,
            pointBackgroundColor: '#42A5F5',
            pointHoverBackgroundColor: '#42A5F5'
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
              text: 'Umidade (%)',
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
