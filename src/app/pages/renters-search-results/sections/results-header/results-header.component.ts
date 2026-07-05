import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-results-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './results-header.component.html',
  styleUrls: ['./results-header.component.scss']
})
export class ResultsHeaderComponent {
  @Input() store: any;
}
