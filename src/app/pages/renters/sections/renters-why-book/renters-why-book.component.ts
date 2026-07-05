import { AfterViewInit, Component, ElementRef, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import gsap from 'gsap';

@Component({
  selector: 'app-renters-why-book',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './renters-why-book.component.html',
  styleUrls: ['./renters-why-book.component.scss']
})
export class RentersWhyBookComponent implements AfterViewInit {
  @Input() store: any;
  constructor(private el: ElementRef) {}
  ngAfterViewInit(): void { gsap.from(this.el.nativeElement.querySelectorAll('.why-card'), { opacity: 0, y: 30, stagger: 0.12, duration: 0.7, ease: 'power3.out' }); }
}
