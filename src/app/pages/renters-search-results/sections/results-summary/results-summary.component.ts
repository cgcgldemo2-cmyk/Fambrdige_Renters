import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-results-summary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './results-summary.component.html',
  styleUrls: ['./results-summary.component.scss']
})
export class ResultsSummaryComponent {
  @Input() search: any;
}
