import { Component, Input, OnChanges, SimpleChanges } from "@angular/core";
import { Student } from "../../models/student.model";
import { ApexAxisChartSeries, ApexChart, ApexXAxis, ApexTitleSubtitle, NgApexchartsModule } from "ng-apexcharts";

export type ChartOptions = {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    xaxis: ApexXAxis;
    title: ApexTitleSubtitle;
};

@Component({
    selector:'app-student-chart',
    standalone: true,
    template: `
    <div id="chart">
      <apx-chart
        [series]="chartOptions.series"
        [chart]="chartOptions.chart"
        [xaxis]="chartOptions.xaxis"
        [title]="chartOptions.title"
      ></apx-chart>
    </div>
    `,
    imports: [NgApexchartsModule],
    styleUrls: ['./student.chart.component.css']

})

export class StudentChart implements OnChanges {
    @Input() students: Student[] = [];
    chartOptions: ChartOptions = {
      series: [{ name: 'Notas', data: [] }],
      chart: { type: 'bar', height: 350 },
      xaxis: { categories: [] },
      title: { text: 'Notas de estudiantes' }
    };

  ngOnChanges(changes: SimpleChanges) {
    if (changes['students']) {
      this.updateChart();
    }
  }

  updateChart() {
    this.chartOptions = {
      ...this.chartOptions,
      series: [{
        name: 'Notas',
        data: this.students.map(s => s.score)
      }],
      xaxis: {
        categories: this.students.map(s => s.name)
      },
      chart: this.chartOptions.chart,
      title: this.chartOptions.title
    };
  }


}