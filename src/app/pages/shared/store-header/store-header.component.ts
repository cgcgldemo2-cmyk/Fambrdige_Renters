import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

export interface StoreHeaderDetails {
  name: string;
  domain: string;
  phone: string;
}

@Component({
  selector: 'app-store-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './store-header.component.html',
  styleUrls: ['./store-header.component.scss']
})
export class StoreHeaderComponent {
  @Input({ required: true }) store!: StoreHeaderDetails;
}
