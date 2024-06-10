import { Component, OnInit } from '@angular/core';
import { EspressifService } from '../service/espressif.service';
import { SensorData } from '../sensor-data';


@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss'],
})
export class GeneralComponent implements OnInit {

  data: any;
  options: any;
  sensorData: SensorData[] | undefined;

  constructor(private espressifService: EspressifService) { }

  ngOnInit(): void {

    this.espressifService.getEspressif().subscribe((res: any) => {
      this.sensorData = res;

      const labels = this.sensorData!.map(item => new Date(item.createdAt).toLocaleTimeString());
      const temperatureData = this.sensorData!.map(item => item.temperature);
      const humidityData = this.sensorData!.map(item => item.humidity);
      const luminosityData = this.sensorData!.map(item => item.luminosity);

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
            
          },
          {
            label: 'Umidade',
            data: humidityData,
            fill: true,
            borderColor: '#42A5F5',
            backgroundColor: 'rgba(66, 165, 245, 0.2)',
            tension: 0.4
          },
          {
            label: 'Luminosidade',
            data: luminosityData,
            fill: true,
            borderColor: '#FFEB3B',
            backgroundColor: 'rgba(255, 235, 59, 0.2)',
            tension: 0.4,
          }
        ]
      };

      this.options = {
        maintainAspectRatio: false,
        aspectRatio: 0.6,
        plugins: {
          legend: {
            labels: {
              color: '#ffffff'
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