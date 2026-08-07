import { CommonModule } from '@angular/common';
import { Component, DestroyRef, ElementRef, HostListener, Input, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { filter, Observable } from 'rxjs';
import { RenterAuthService } from '../../../services/renter-auth.service';

export interface StoreHeaderDetails {
  name: string;
  domain: string;
  phone: string;
}

@Component({
  selector: 'app-store-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './store-header.component.html',
  styleUrls: ['./store-header.component.scss']
})
export class StoreHeaderComponent implements OnInit {
  @Input({ required: true }) store!: StoreHeaderDetails;

  readonly isAuthenticated$: Observable<boolean>;
  isMenuOpen = false;

  constructor(
    private readonly authService: RenterAuthService,
    private readonly router: Router,
    private readonly elementRef: ElementRef<HTMLElement>,
    private readonly destroyRef: DestroyRef
  ) {
    this.isAuthenticated$ = this.authService.authState$;
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(() => this.closeMenu());
  }

  ngOnInit(): void {
    this.authService.refreshAuthState();
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }

  signOut(): void {
    this.authService.logout();
    this.closeMenu();
    this.router.navigate(['/']);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    if (this.isMenuOpen && !this.elementRef.nativeElement.contains(event.target as Node)) this.closeMenu();
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.closeMenu();
  }
}