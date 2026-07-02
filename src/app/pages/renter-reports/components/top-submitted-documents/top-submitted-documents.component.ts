import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface SubmittedDocument {
  name: string;
  count: number;
}

@Component({
  selector: 'app-top-submitted-documents',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './top-submitted-documents.component.html',
  styleUrls: ['./top-submitted-documents.component.scss']
})
export class TopSubmittedDocumentsComponent {
  documents: SubmittedDocument[] = [
    { name: 'Government ID', count: 1652 },
    { name: 'Driver License', count: 1238 },
    { name: 'Proof of Billing', count: 974 },
    { name: 'Selfie Verification', count: 682 },
    { name: 'Rental Agreement', count: 561 }
  ];

  maxCount = Math.max(...this.documents.map(item => item.count));

  getBarWidth(count: number): string {
    return `${Math.max((count / this.maxCount) * 100, 6)}%`;
  }
}
