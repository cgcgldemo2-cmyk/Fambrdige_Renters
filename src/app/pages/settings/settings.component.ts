import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BusinessBrandingComponent } from './components/business-branding/business-branding.component';
import { DomainWebsiteComponent } from './components/domain-website/domain-website.component';
import { ApiKeyGenerationComponent } from './components/api-key-generation/api-key-generation.component';
import { PaymentMethodsComponent } from './components/payment-methods/payment-methods.component';
import { GeneralPreferencesComponent } from './components/general-preferences/general-preferences.component';
import { LessorSidebarComponent } from '../../shared/components/lessor-sidebar/lessor-sidebar.component';

interface SidebarItem {
  label: string;
  icon: string;
  route: string;
  active?: boolean;
}

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    CommonModule,
    BusinessBrandingComponent,
    DomainWebsiteComponent,
    ApiKeyGenerationComponent,
    PaymentMethodsComponent,
    GeneralPreferencesComponent,
    LessorSidebarComponent
  ],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {
  sidebarItems: SidebarItem[] = [
    { label: 'Dashboard', icon: '▦', route: '/dashboard' },
    { label: 'Verifications', icon: '🛡', route: '/verifications' },
    { label: 'Applications', icon: '▥', route: '/applications' },
    { label: 'Documents', icon: '📁', route: '/documents' },
    { label: 'Verification Credits', icon: '💳', route: '/verification-credits' },
    { label: 'Reports', icon: '📊', route: '/reports/renters' },
    { label: 'Settings', icon: '⚙', route: '/settings', active: true },
    { label: 'Support', icon: '🎧', route: '/support' }
  ];

  saveAllSettings(): void {
    console.log('Save settings clicked');
  }
}
