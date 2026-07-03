import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-renter-public-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './renter-public-header.component.html',
  styleUrls: ['./renter-public-header.component.scss']
})
export class RenterPublicHeaderComponent {
  isMenuOpen = false;

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }
}
