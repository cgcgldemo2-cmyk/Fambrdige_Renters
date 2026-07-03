import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { NewsItem } from '../../models/renter-page.models';

@Component({
  selector: 'app-latest-from-cgic',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './latest-from-cgic.component.html',
  styleUrls: ['./latest-from-cgic.component.scss']
})
export class LatestFromCgicComponent {
  @Input() items: NewsItem[] = [];
}
