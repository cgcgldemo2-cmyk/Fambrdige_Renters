import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: true,
  template: `
    <div class="card" [class.card-hover]="hoverable">
      <ng-content></ng-content>
    </div>
  `,
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() hoverable: boolean = false;
}
