import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { StoreHeaderDetails } from '../../../shared/store-header/store-header.component';

@Component({
  selector: 'app-renters-footer',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './renters-footer.component.html',
  styleUrls: ['./renters-footer.component.scss']
})
export class RentersFooterComponent {
  @Input() store?: StoreHeaderDetails;
  readonly currentYear = new Date().getFullYear();
}
