import { Component } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { SensorService } from '../../../../core/services/sensor.service';
import { DecimalPipe } from '@angular/common';

@Component({
    selector: 'main-container',
    standalone: true,
    imports: [ChartModule, DecimalPipe],
    templateUrl: './climate-container.component.html',
    styleUrl: './climate-container.component.scss'
})
export class ClimateContainerComponent {
    chartDataTemperature: any;
    chartDataHumidity: any;
    options: any;
    RawData: any;

    averages: any;
    deviation:any;
    trend:any;

    constructor(private service: SensorService) {
    }

    ngOnInit() {

        this.service.getSensor('1').subscribe((data) => {
            this.RawData = data;
            this.averages = data.averages;
            this.deviation = data.standardDeviation;
            this.trend = data.trend;
            this.setChartData();
            console.log(data);
        });

    }

    setChartData() {
        
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        const labels = this.RawData.data.data.map((item:any) => new Date(item.timestamp).toLocaleTimeString());
        const valuesTemperature = this.RawData.data.data.map((item:any) => item.temperature);
        const valuesHumidity= this.RawData.data.data.map((item:any) => item.humidity);


        
        console.log(labels);
        this.chartDataTemperature = {
            labels: labels,
            datasets: [
                {
                    label: 'Temperatura',
                    data: valuesTemperature,
                    fill: true,
                    borderColor: documentStyle.getPropertyValue('--blue-500'),
                    tension: 0.4
                }
            ]
        };

        this.chartDataHumidity = {
            labels: labels,
            datasets: [
                {
                    label: 'Humedad',
                    data: valuesHumidity,
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
