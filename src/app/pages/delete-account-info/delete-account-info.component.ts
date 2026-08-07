import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { environment } from '../../../environments/environment';
import { RenterPageShellComponent } from '../shared/renter-page-shell/renter-page-shell.component';
@Component({ selector: 'app-delete-account-info', standalone: true, imports: [CommonModule, RouterLink, RenterPageShellComponent], templateUrl: './delete-account-info.component.html' })
export class DeleteAccountInfoComponent { readonly store = environment.storefront; }