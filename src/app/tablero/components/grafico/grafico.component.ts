import { Component, Input, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { NgApexchartsModule } from 'ng-apexcharts';
import {
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexLegend,
  ApexStroke,
  ApexTooltip,
  ApexAxisChartSeries,
  ApexFill,
  ApexXAxis,
  ApexGrid
} from 'ng-apexcharts';

export interface activeusercardChartOptions {
  series: ApexAxisChartSeries;
  dataLabels: ApexDataLabels;
  chart: ApexChart;
  legend: ApexLegend;
  xaxis: ApexXAxis;
  grid: ApexGrid;
  stroke: ApexStroke;
  plotOptions: ApexPlotOptions;
  fill: ApexFill;
  tooltip: ApexTooltip;
}

@Component({
  selector: 'app-grafico',
  standalone: true,
  imports: [MatCardModule, NgApexchartsModule],
  templateUrl: './grafico.component.html',
  styleUrls: ['./grafico.component.scss']
})
export class GraficoComponent implements OnChanges {
  @Input() historial: number[] = [];

  @ViewChild("activeusercardchart") chart1: ChartComponent = Object.create(null);
  public activeusercardChartOptions!: Partial<activeusercardChartOptions> | any;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['historial'] && changes['historial'].currentValue) {
      this.actualizarGrafico();
    }
  }

  actualizarGrafico() {
    this.activeusercardChartOptions = {
      series: [
        {
          name: 'Historial de Alturas',
          data: this.historial,
          color: "#fb9678",
        }
      ],
      xaxis: {
        categories: this.historial.map((altura, index) => `Altura ${index + 1}`),
      },
      chart: {
        toolbar: {
          show: false,
        },
        type: 'bar',
        height: 300,
      },
      legend: {
        show: false,
      },
      tooltip: {
        theme: "dark"
      },
      grid: {
        show: false,
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 5,
        colors: ['none']
      },
      plotOptions: {
        bar: {
          columnWidth: '45%',
          borderRadius: 8,
        },
      },
    };
  }
}
