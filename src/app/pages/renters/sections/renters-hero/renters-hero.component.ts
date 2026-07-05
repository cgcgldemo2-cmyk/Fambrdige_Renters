import { AfterViewInit, Component, ElementRef, Input } from '@angular/core';
import gsap from 'gsap';

@Component({
  selector: 'app-renters-hero',
  standalone: true,
  templateUrl: './renters-hero.component.html',
  styleUrls: ['./renters-hero.component.scss']
})
export class RentersHeroComponent implements AfterViewInit {
  @Input() store: any;

  get heroBackground(): string {
    return `
      linear-gradient(90deg, rgba(0, 22, 33, 0.96), rgba(0, 22, 33, 0.5)),
      url('${this.store?.heroImage}')
    `;
  }

  constructor(private el: ElementRef) {}

  ngAfterViewInit(): void {
    gsap.from(this.el.nativeElement.querySelectorAll('.animate-item'), {
      opacity: 0,
      y: 40,
      duration: 0.9,
      stagger: 0.15,
      ease: 'power3.out'
    });
  }
}
