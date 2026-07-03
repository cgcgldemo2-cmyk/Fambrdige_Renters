import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { BookingStepItem } from '../../models/renter-page.models';

@Component({
  selector: 'app-why-choose-cgic',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './why-choose-cgic.component.html',
  styleUrls: ['./why-choose-cgic.component.scss']
})
export class WhyChooseCgicComponent {
  @Input() steps: BookingStepItem[] = [];
}
