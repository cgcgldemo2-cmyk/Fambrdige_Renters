import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface TrendPoint {
  month: string;
  value: number;
}

interface ChartPoint extends TrendPoint {
  x: number;
  y: number;
  labelY: number;
}

@Component({
  selector: 'app-renter-application-trend',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './renter-application-trend.component.html',
  styleUrls: ['./renter-application-trend.component.scss']
})
export class RenterApplicationTrendComponent {
  trend: TrendPoint[] = [
    { month: "Jan '25", value: 2230 },
    { month: "Feb '25", value: 1287 },
    { month: "Mar '25", value: 150 },
    { month: "Apr '25", value: 1673 },
    { month: "May '25", value: 4325 }
  ];

  private chartStartX = 40;
  private chartEndX = 500;
  private chartTopY = 24;
  private chartBottomY = 205;

  get maxValue(): number {
    const max = Math.max(...this.trend.map(item => item.value));
    return max > 0 ? max : 1;
  }

  get chartPoints(): ChartPoint[] {
    const totalPoints = this.trend.length;
    const gap = totalPoints > 1
      ? (this.chartEndX - this.chartStartX) / (totalPoints - 1)
      : 0;

    return this.trend.map((item, index) => {
      const x = this.chartStartX + index * gap;
      const percentage = item.value / this.maxValue;

      const y =
        this.chartBottomY -
        percentage * (this.chartBottomY - this.chartTopY);

      return {
        ...item,
        x,
        y,
        labelY: Math.max(y - 14, 14)
      };
    });
  }

  get linePoints(): string {
    return this.chartPoints
      .map(point => `${point.x},${point.y}`)
      .join(' ');
  }

  get areaPoints(): string {
    return `${this.linePoints} ${this.chartEndX},${this.chartBottomY} ${this.chartStartX},${this.chartBottomY}`;
  }
}
