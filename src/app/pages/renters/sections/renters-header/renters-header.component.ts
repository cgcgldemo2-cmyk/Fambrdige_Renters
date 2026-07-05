import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-renters-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './renters-header.component.html',
  styleUrls: ['./renters-header.component.scss']
})
export class RentersHeaderComponent {
  @Input() store: any;
}
