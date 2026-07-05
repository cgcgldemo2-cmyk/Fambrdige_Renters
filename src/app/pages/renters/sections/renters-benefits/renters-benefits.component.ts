import { AfterViewInit, Component, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import gsap from 'gsap';

@Component({
  selector: 'app-renters-benefits',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './renters-benefits.component.html',
  styleUrls: ['./renters-benefits.component.scss']
})
export class RentersBenefitsComponent implements AfterViewInit {
  benefits = [
    { icon: '🚗', title: 'Wide Selection', text: 'Choose from a variety of well-maintained cars.' },
    { icon: '🏷️', title: 'Transparent Pricing', text: 'No hidden fees. What you see is what you pay.' },
    { icon: '🛡️', title: 'Verified & Trusted', text: 'All renters are verified for a safer experience.' },
    { icon: '🎧', title: '24/7 Support', text: 'We’re here to help before, during, and after your trip.' }
  ];
  constructor(private el: ElementRef) {}
  ngAfterViewInit(): void { gsap.from(this.el.nativeElement.querySelectorAll('.benefit-card'), { opacity: 0, y: 30, stagger: 0.12, duration: 0.7, ease: 'power3.out' }); }
}
