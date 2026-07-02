import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface RenterInsight {
  icon: string;
  label: string;
  value: string;
  note: string;
  tone: 'blue' | 'orange' | 'purple';
}

@Component({
  selector: 'app-renter-insights',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './renter-insights.component.html',
  styleUrls: ['./renter-insights.component.scss']
})
export class RenterInsightsComponent {
  insights: RenterInsight[] = [
    {
      icon: '⏱',
      label: 'Average Approval Time',
      value: '22h 45m',
      note: '↓ 12.4% vs Apr 1 – Apr 30',
      tone: 'blue'
    },
    {
      icon: '🏙',
      label: 'Top Source City',
      value: 'Manila',
      note: '28.6% of total applications',
      tone: 'orange'
    },
    {
      icon: '👥',
      label: 'Repeat Renters',
      value: '32.7%',
      note: '↑ 6.8% vs Apr 1 – Apr 30',
      tone: 'purple'
    }
  ];
}
