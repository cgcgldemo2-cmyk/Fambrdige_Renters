import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FaqItem } from '../../models/renter-page.models';

@Component({
  selector: 'app-renter-faq',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './renter-faq.component.html',
  styleUrls: ['./renter-faq.component.scss']
})
export class RenterFaqComponent {
  @Input() faqs: FaqItem[] = [];
  @Output() faqToggle = new EventEmitter<number>();
}
