import { Component } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { SensorService } from '../../../../core/services/sensor.service';
import { DecimalPipe } from '@angular/common';
import { TableModule } from 'primeng/table';
import { timestamp } from 'rxjs';


@Component({
  selector: 'app-atmosphere-container',
  standalone: true,
  imports: [ChartModule, DecimalPipe, TableModule],
  templateUrl: './atmosphere-container.component.html',
  styleUrl: './atmosphere-container.component.scss'
})
export class AtmosphereContainerComponent {
    chartDataNoise: any;
    chartDataAirQuality: any;

    dataAirQuality: any;
    dataColumnsAirQuality: any;

    options: any;
    optionsAir: any;
    RawData: any;

    averages: any;
    deviation:any;
    trend:any;

    constructor(private service: SensorService) {
    }

    ngOnInit() {

        this.service.getSensor('3').subscribe((data) => {
            this.RawData = data;
            this.averages = data.averages;
            this.deviation = data.standardDeviation;
            this.trend = data.trend;
            this.setChartData();

            this.setTableData();
            console.log(data);
        });

    }

    setTableData(){
        this.dataAirQuality = this.RawData.data.data.map((item:any) => { return {air_quality:item.air_quality,timestamp:item.timestamp}});
        this.dataColumnsAirQuality = ['Calidad del aire', 'Tiempo'];
        console.log(this.dataAirQuality);
    }

    setChartData() {
        
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        const labels = this.RawData.data.data.map((item:any) => new Date(item.timestamp).toLocaleTimeString());
        const valuesNoise = this.RawData.data.data.map((item:any) => item.noise_level);

        const labelsAir = ['Buena', 'Mala', 'Moderada'];
        const valuesQuality = this.RawData.data.data.reduce((acc:any, item:any) => {
            if(item.air_quality == 'Buena') acc.buena++;
            if(item.air_quality == 'Mala') acc.mala++;
            if(item.air_quality == 'Moderada') acc.moderada++;

            return acc;
        }, { buena: 0, mala: 0, moderada: 0 });

        this.chartDataNoise = {
            labels: labels,
            datasets: [
                {
                    label: 'Nivel de ruido',
                    data: valuesNoise,
                    fill: true,
                    borderColor: documentStyle.getPropertyValue('--blue-500'),
                    tension: 0.4
                }
            ]
        };

        this.chartDataAirQuality = {
            labels: labelsAir,
            datasets: [
                {
                    data: Object.values(valuesQuality),
                    backgroundColor: [documentStyle.getPropertyValue('--green-500'), documentStyle.getPropertyValue('--red-500'), documentStyle.getPropertyValue('--yellow-500')],
                    hoverBackgroundColor: [documentStyle.getPropertyValue('--green-400'), documentStyle.getPropertyValue('--red-400'), documentStyle.getPropertyValue('--yellow-400')]
                
                }
            ]
        };

        this.optionsAir = {
            cutout: '60%',
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            }
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
