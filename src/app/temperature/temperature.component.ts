import { Component, OnInit } from '@angular/core';
import { EspressifService } from '../service/espressif.service';
import { Observable, Subscription } from 'rxjs';
import { SensorData } from '../sensor-data';
import { selectSensorData } from '../state/sensor.selectors';
import { Store } from '@ngrx/store';
import { loadSensorData } from '../state/sensor.actions';

@Component({
  selector: 'app-temperature',
  templateUrl: './temperature.component.html',
  styleUrls: ['./temperature.component.scss']
})
export class TemperatureComponent implements OnInit {

  data: any;
  userId: any;
  options: any;
  sensorData$: Observable<SensorData[]>;
  private subscription: Subscription | undefined;
  private intervalId: any;

  constructor(private espressifService: EspressifService, private store: Store) {
    this.sensorData$ = this.store.select(selectSensorData);
    this.userId = JSON.parse(sessionStorage.getItem('session') || '{}');
  }

  ngOnInit(): void {
    this.store.dispatch(loadSensorData());
    this.intervalId = setInterval(() => {
      this.store.dispatch(loadSensorData());
    }, 5000); // Atualiza a cada 5 segundos

    this.subscription = this.sensorData$.subscribe((sensorData) => {
      if (sensorData) {
        const labels = sensorData.map(item => new Date(item.createdAt).toLocaleTimeString());
        const temperatureData = sensorData.map(item => item.temperature);
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
          ]
        };

        this.options = {
          animation: false,
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
                color: '#ffffff',
                maxTicksLimit: 10
              },
              grid: {
                color: 'rgba(255, 255, 255, 0.2)',
                drawBorder: false
              }
            },
            y: {
              ticks: {
                color: '#ffffff',
                maxTicksLimit: 10
              },
              grid: {
                color: 'rgba(255, 255, 255, 0.2)',
                drawBorder: false
              }
            }
          }
        };
      }
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
