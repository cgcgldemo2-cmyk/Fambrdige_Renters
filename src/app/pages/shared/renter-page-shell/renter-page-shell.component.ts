import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { StoreHeaderComponent } from '../store-header/store-header.component';

@Component({
  selector: 'app-renter-page-shell',
  standalone: true,
  imports: [CommonModule, RouterLink, StoreHeaderComponent],
  template: `
    <app-store-header [store]="store"></app-store-header>
    <main class="renter-portal-main"><ng-content></ng-content></main>
    <footer class="renter-portal-footer">
      <div class="page-container">
        <strong>{{ store.name }}</strong>
        <span>Business-owned rental website ? Powered by FamBridge</span>
        <a routerLink="/delete-account">Account deletion information</a>
      </div>
    </footer>
  `
})
export class RenterPageShellComponent {
  readonly store = environment.storefront;
}
