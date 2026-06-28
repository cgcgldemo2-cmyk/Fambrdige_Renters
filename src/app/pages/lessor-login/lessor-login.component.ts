import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  ViewChild
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { gsap } from 'gsap';

@Component({
  selector: 'app-lessor-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './lessor-login.component.html',
  styleUrls: ['./lessor-login.component.scss']
})
export class LessorLoginComponent implements AfterViewInit {
  @ViewChild('visualPanel') visualPanel!: ElementRef<HTMLElement>;
  @ViewChild('loginCard') loginCard!: ElementRef<HTMLElement>;

  email = '';
  password = '';
  rememberMe = false;
  showPassword = false;
  isLoading = false;

  ngAfterViewInit(): void {
    this.animatePage();
  }

  login(): void {
    if (!this.email || !this.password) {
      return;
    }

    this.isLoading = true;

    console.log('Lessor login', {
      email: this.email,
      password: this.password,
      rememberMe: this.rememberMe
    });

    setTimeout(() => {
      this.isLoading = false;
    }, 900);
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  forgotPassword(): void {
    console.log('Forgot password');
  }

  private animatePage(): void {
    const visual = this.visualPanel.nativeElement;
    const login = this.loginCard.nativeElement;

    gsap.from(visual.querySelector('.brand-area'), {
      opacity: 0,
      y: -24,
      duration: 0.7,
      ease: 'power3.out'
    });

    gsap.from(visual.querySelector('.api-badge'), {
      opacity: 0,
      y: 22,
      duration: 0.55,
      delay: 0.15,
      ease: 'power2.out'
    });

    gsap.from(visual.querySelector('.hero-content h2'), {
      opacity: 0,
      y: 38,
      duration: 0.75,
      delay: 0.25,
      ease: 'power3.out'
    });

    gsap.from(visual.querySelector('.hero-content p'), {
      opacity: 0,
      y: 24,
      duration: 0.65,
      delay: 0.38,
      ease: 'power3.out'
    });

    const featureCards = visual.querySelectorAll('.feature-card');

    gsap.set(featureCards, {
      opacity: 1,
      visibility: 'visible',
      x: 0
    });

    gsap.fromTo(
      featureCards,
      {
        opacity: 0,
        x: -34
      },
      {
        opacity: 1,
        x: 0,
        visibility: 'visible',
        duration: 0.5,
        delay: 0.55,
        stagger: 0.12,
        ease: 'power2.out',
        clearProps: 'transform'
      }
    );

    gsap.from(visual.querySelector('.booking-status-card'), {
      opacity: 0,
      y: -26,
      scale: 0.94,
      duration: 0.7,
      delay: 0.65,
      ease: 'back.out(1.7)'
    });

    gsap.from(login, {
      opacity: 0,
      x: 70,
      scale: 0.97,
      duration: 0.85,
      delay: 0.28,
      ease: 'power3.out'
    });

    gsap.to(visual.querySelector('.car-image'), {
      y: -10,
      duration: 2.6,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });

    gsap.to(visual.querySelector('.car-glow'), {
      scale: 1.12,
      opacity: 0.8,
      duration: 2.8,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });

    gsap.to(visual.querySelector('.road-line-one'), {
      x: -40,
      duration: 1.6,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });

    gsap.to(visual.querySelector('.road-line-two'), {
      x: 34,
      duration: 1.9,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });
  }
}
