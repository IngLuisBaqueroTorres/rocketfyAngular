import { Component } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { SensorService } from '../../../../core/services/sensor.service';
import { DecimalPipe } from '@angular/common';


@Component({
  selector: 'app-meteo-container',
  standalone: true,
  imports: [ChartModule, DecimalPipe],
  templateUrl: './meteo-container.component.html',
  styleUrl: './meteo-container.component.scss'
})
export class MeteoContainerComponent {
    chartDataPressure: any;
    chartDataWind: any;
    options: any;
    RawData: any;

    averages: any;
    deviation:any;
    trend:any;

    constructor(private service: SensorService) {
    }

    ngOnInit() {

        this.service.getSensor('2').subscribe((data) => {
            this.RawData = data;

            this.averages = data.averages;
            this.deviation = data.standardDeviation;
            this.trend = data.trend;

            this.setChartData();
        });

    }

    setChartData() {
        
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        const labels = this.RawData.data.data.map((item:any) => new Date(item.timestamp).toLocaleTimeString());
        const valuesPressure = this.RawData.data.data.map((item:any) => item.pressure);
        const valuesWind= this.RawData.data.data.map((item:any) => item.wind_speed);

        this.chartDataPressure = {
            labels: labels,
            datasets: [
                {
                    label: 'Presión atmosférica',
                    data: valuesPressure,
                    fill: true,
                    borderColor: documentStyle.getPropertyValue('--blue-500'),
                    tension: 0.4
                }
            ]
        };

        this.chartDataWind = {
            labels: labels,
            datasets: [
                {
                    label: 'Velocidad del viento',
                    data: valuesWind,
                    fill: true,
                    borderColor: documentStyle.getPropertyValue('--blue-500'),
                    tension: 0.4
                }
            ]
        };

        this.options = {
            maintainAspectRatio: false,
            aspectRatio: 0.6,
            heigh: 400,
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                }
            }
        };
    }
}
