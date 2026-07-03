import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

type DomainMode = 'subdomain' | 'custom';

@Component({
  selector: 'app-domain-website',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './domain-website.component.html',
  styleUrls: ['./domain-website.component.scss']
})
export class DomainWebsiteComponent {
  domainMode: DomainMode = 'subdomain';
  subdomain = 'yourbusiness';
  customDomain = 'www.yourbusiness.com';

  readonly rootDomain = '.cgicsoftwaresolution.com';

  selectDomainMode(mode: DomainMode): void {
    this.domainMode = mode;
  }

  saveDomain(): void {
    console.log('Saving domain config:', {
      domainMode: this.domainMode,
      subdomain: this.subdomain,
      customDomain: this.customDomain
    });
  }
}
