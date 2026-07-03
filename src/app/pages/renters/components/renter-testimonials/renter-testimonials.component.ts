import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TestimonialItem } from '../../models/renter-page.models';

@Component({
  selector: 'app-renter-testimonials',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './renter-testimonials.component.html',
  styleUrls: ['./renter-testimonials.component.scss']
})
export class RenterTestimonialsComponent {
  @Input() testimonials: TestimonialItem[] = [];
}
