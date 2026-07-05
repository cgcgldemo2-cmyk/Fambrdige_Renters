import { AfterViewInit, Component, ElementRef, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import gsap from 'gsap';

@Component({
  selector: 'app-renters-reviews',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './renters-reviews.component.html',
  styleUrls: ['./renters-reviews.component.scss']
})
export class RentersReviewsComponent implements AfterViewInit {
  @Input() reviews: any[] = [];
  constructor(private el: ElementRef) {}
  ngAfterViewInit(): void { gsap.from(this.el.nativeElement.querySelectorAll('.review-card'), { opacity: 0, y: 35, stagger: 0.12, duration: 0.75, ease: 'power3.out' }); }
}
