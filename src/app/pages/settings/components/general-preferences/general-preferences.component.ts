import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-general-preferences',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './general-preferences.component.html',
  styleUrls: ['./general-preferences.component.scss']
})
export class GeneralPreferencesComponent {
  emailNotifications = true;
  publicBookingSite = true;
  displayBusinessName = 'Your Business Inc.';

  toggleEmailNotifications(): void {
    this.emailNotifications = !this.emailNotifications;
  }

  togglePublicBookingSite(): void {
    this.publicBookingSite = !this.publicBookingSite;
  }
}
