import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LessorSidebarComponent } from '../../shared/components/lessor-sidebar/lessor-sidebar.component';

type ApprovalStatus =
  | 'Pending Approval'
  | 'Approved'
  | 'Rejected'
  | 'Need More Documents';

type DocumentStatus =
  | 'Submitted'
  | 'Verified'
  | 'Rejected'
  | 'Missing';

type RenterDocumentCode =
  | 'driver_license'
  | 'government_id'
  | 'proof_of_address'
  | 'selfie_verification'
  | 'other_supporting_document';

type NoteSource = 'Renter' | 'System' | 'Lessor';

interface RenterDocument {
  id: number;
  documentTypeId: number;
  documentTypeCode: RenterDocumentCode;
  name: string;
  status: DocumentStatus;
  submittedDate?: string;
  fileUrl?: string;
  remarks?: string;
}

interface RequestDocumentOption {
  documentTypeId: number;
  documentTypeCode: RenterDocumentCode;
  label: string;
  description: string;
  icon: string;
}

interface RenterNote {
  source: NoteSource;
  createdBy: string;
  createdAt: string;
  message: string;
}

interface RentalReference {
  companyName: string;
  platform: 'Facebook' | 'Instagram' | 'TikTok' | 'Manual';
  url: string;
  status: 'Provided' | 'Verified' | 'Needs Review';
}

interface RenterApprovalRecord {
  id: number;
  trustId: string;
  renterName: string;
  email: string;
  mobile: string;
  trustScore: number;
  approvalStatus: ApprovalStatus;
  submittedDate: string;
  approvedDate?: string;
  approvedBy?: string;
  rejectedDate?: string;
  rejectedBy?: string;
  requestedMoreDocsDate?: string;
  requestedMoreDocsBy?: string;
  successfulRentals: number;
  previousRentalCount: number;
  documents: RenterDocument[];
  references: RentalReference[];
  notes: RenterNote[];
}

@Component({
  selector: 'app-renter-approval',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    LessorSidebarComponent
  ],
  templateUrl: './renter-approval.component.html',
  styleUrls: ['./renter-approval.component.scss']
})
export class RenterApprovalComponent {
  searchText = '';
  selectedStatus = 'All';

  selectedRenter: RenterApprovalRecord | null = null;

  showRejectBox = false;
  showRequestDocsBox = false;

  rejectReason = '';
  requestDocsReason = '';
  selectedRequestDocumentCodes: RenterDocumentCode[] = [];

  selectedDocument: RenterDocument | null = null;
  documentZoom = 1;
  documentPanX = 0;
  documentPanY = 0;
  isPanningDocument = false;

  private lastDocumentPointerX = 0;
  private lastDocumentPointerY = 0;
  private readonly minDocumentZoom = 0.6;
  private readonly maxDocumentZoom = 3;
  private readonly documentZoomStep = 0.25;

  requestDocumentOptions: RequestDocumentOption[] = [
    {
      documentTypeId: 1,
      documentTypeCode: 'driver_license',
      label: 'Driver License',
      description: 'Front and back, clear and readable',
      icon: '🚘'
    },
    {
      documentTypeId: 2,
      documentTypeCode: 'government_id',
      label: 'Government ID',
      description: 'Clear and valid government ID',
      icon: '🪪'
    },
    {
      documentTypeId: 3,
      documentTypeCode: 'proof_of_address',
      label: 'Proof of Address',
      description: 'Recent utility bill or similar proof',
      icon: '🏠'
    },
    {
      documentTypeId: 4,
      documentTypeCode: 'selfie_verification',
      label: 'Selfie Verification',
      description: 'Clear selfie for identity checking',
      icon: '🤳'
    },
    {
      documentTypeId: 5,
      documentTypeCode: 'other_supporting_document',
      label: 'Other Supporting Document',
      description: 'Any other document requested by lessor',
      icon: '📎'
    }
  ];

  approvalStatuses = [
    'All',
    'Pending Approval',
    'Approved',
    'Rejected',
    'Need More Documents'
  ];

  renters: RenterApprovalRecord[] = [
    {
      id: 1,
      trustId: 'TR-A92X7KQ4',
      renterName: 'Juan Dela Cruz',
      email: 'juan.delacruz@email.com',
      mobile: '+63 917 123 4567',
      trustScore: 82,
      approvalStatus: 'Pending Approval',
      submittedDate: 'Jul 18, 2026 08:42 AM',
      successfulRentals: 12,
      previousRentalCount: 3,
      documents: [
        {
          id: 1,
          documentTypeId: 1,
          documentTypeCode: 'driver_license',
          name: 'Driver License',
          status: 'Submitted',
          submittedDate: 'Jul 18, 2026 08:30 AM',
          remarks: 'Clear image uploaded.'
        },
        {
          id: 2,
          documentTypeId: 2,
          documentTypeCode: 'government_id',
          name: 'Government ID',
          status: 'Submitted',
          submittedDate: 'Jul 18, 2026 08:31 AM',
          remarks: 'Needs manual review.'
        },
        {
          id: 3,
          documentTypeId: 3,
          documentTypeCode: 'proof_of_address',
          name: 'Proof of Address',
          status: 'Submitted',
          submittedDate: 'Jul 18, 2026 08:33 AM',
          remarks: 'Utility bill uploaded.'
        },
        {
          id: 4,
          documentTypeId: 4,
          documentTypeCode: 'selfie_verification',
          name: 'Selfie Verification',
          status: 'Submitted',
          submittedDate: 'Jul 18, 2026 08:35 AM',
          remarks: 'Face is visible.'
        }
      ],
      references: [
        {
          companyName: 'Palawan Wheels Rental',
          platform: 'Facebook',
          url: 'https://facebook.com/sample-rental',
          status: 'Provided'
        },
        {
          companyName: 'Island Ride PH',
          platform: 'Instagram',
          url: 'https://instagram.com/sample-rental',
          status: 'Needs Review'
        }
      ],
      notes: [
        {
          source: 'Renter',
          createdBy: 'Juan Dela Cruz',
          createdAt: 'Jul 18, 2026 08:42 AM',
          message: 'I uploaded my documents and previous rental references.'
        },
        {
          source: 'System',
          createdBy: 'FamBridge API',
          createdAt: 'Jul 18, 2026 08:43 AM',
          message: 'Renter approval request was submitted for lessor review.'
        }
      ]
    },
    {
      id: 2,
      trustId: 'TR-K81P2LM9',
      renterName: 'Maria Santos',
      email: 'maria.santos@email.com',
      mobile: '+63 918 555 2211',
      trustScore: 91,
      approvalStatus: 'Approved',
      submittedDate: 'Jul 16, 2026 10:12 AM',
      approvedDate: 'Jul 16, 2026 11:05 AM',
      approvedBy: 'Admin User',
      successfulRentals: 18,
      previousRentalCount: 5,
      documents: [
        {
          id: 1,
          documentTypeId: 1,
          documentTypeCode: 'driver_license',
          name: 'Driver License',
          status: 'Verified',
          submittedDate: 'Jul 16, 2026 10:00 AM',
          remarks: 'Verified by lessor.'
        },
        {
          id: 2,
          documentTypeId: 2,
          documentTypeCode: 'government_id',
          name: 'Government ID',
          status: 'Verified',
          submittedDate: 'Jul 16, 2026 10:01 AM',
          remarks: 'Verified by lessor.'
        },
        {
          id: 3,
          documentTypeId: 3,
          documentTypeCode: 'proof_of_address',
          name: 'Proof of Address',
          status: 'Verified',
          submittedDate: 'Jul 16, 2026 10:04 AM',
          remarks: 'Verified by lessor.'
        }
      ],
      references: [
        {
          companyName: 'Cebu City Car Rentals',
          platform: 'Facebook',
          url: 'https://facebook.com/sample',
          status: 'Verified'
        }
      ],
      notes: [
        {
          source: 'System',
          createdBy: 'FamBridge API',
          createdAt: 'Jul 16, 2026 10:12 AM',
          message: 'Renter approval request was submitted.'
        },
        {
          source: 'Lessor',
          createdBy: 'Admin User',
          createdAt: 'Jul 16, 2026 11:05 AM',
          message: 'Renter approved. Documents and rental references look valid.'
        }
      ]
    },
    {
      id: 3,
      trustId: 'TR-M22RTY8',
      renterName: 'Mark Reyes',
      email: 'mark.reyes@email.com',
      mobile: '+63 919 222 8844',
      trustScore: 58,
      approvalStatus: 'Need More Documents',
      submittedDate: 'Jul 20, 2026 03:20 PM',
      requestedMoreDocsDate: 'Jul 20, 2026 04:15 PM',
      requestedMoreDocsBy: 'Admin User',
      successfulRentals: 1,
      previousRentalCount: 0,
      documents: [
        {
          id: 1,
          documentTypeId: 1,
          documentTypeCode: 'driver_license',
          name: 'Driver License',
          status: 'Submitted',
          submittedDate: 'Jul 20, 2026 03:10 PM',
          remarks: 'Image is slightly blurry.'
        },
        {
          id: 2,
          documentTypeId: 2,
          documentTypeCode: 'government_id',
          name: 'Government ID',
          status: 'Missing',
          remarks: 'Required document not uploaded.'
        },
        {
          id: 3,
          documentTypeId: 3,
          documentTypeCode: 'proof_of_address',
          name: 'Proof of Address',
          status: 'Missing',
          remarks: 'Required document not uploaded.'
        }
      ],
      references: [],
      notes: [
        {
          source: 'System',
          createdBy: 'FamBridge API',
          createdAt: 'Jul 20, 2026 03:20 PM',
          message: 'Renter approval request was submitted with incomplete documents.'
        },
        {
          source: 'Lessor',
          createdBy: 'Admin User',
          createdAt: 'Jul 20, 2026 04:15 PM',
          message: 'More documents requested: Government ID and proof of address are missing.'
        }
      ]
    },
    {
      id: 4,
      trustId: 'TR-X70LPA2',
      renterName: 'Ana Lim',
      email: 'ana.lim@email.com',
      mobile: '+63 916 777 3312',
      trustScore: 42,
      approvalStatus: 'Rejected',
      submittedDate: 'Jul 22, 2026 01:15 PM',
      rejectedDate: 'Jul 22, 2026 02:10 PM',
      rejectedBy: 'Admin User',
      successfulRentals: 0,
      previousRentalCount: 0,
      documents: [
        {
          id: 1,
          documentTypeId: 1,
          documentTypeCode: 'driver_license',
          name: 'Driver License',
          status: 'Rejected',
          submittedDate: 'Jul 22, 2026 01:10 PM',
          remarks: 'Document does not match renter information.'
        }
      ],
      references: [],
      notes: [
        {
          source: 'System',
          createdBy: 'FamBridge API',
          createdAt: 'Jul 22, 2026 01:15 PM',
          message: 'Renter approval request was submitted.'
        },
        {
          source: 'Lessor',
          createdBy: 'Admin User',
          createdAt: 'Jul 22, 2026 02:10 PM',
          message: 'Renter rejected: Submitted document does not match the renter profile.'
        }
      ]
    }
  ];

  get selectedRequestDocuments(): RequestDocumentOption[] {
    return this.requestDocumentOptions.filter(option =>
      this.selectedRequestDocumentCodes.includes(option.documentTypeCode)
    );
  }

  isRequestDocumentSelected(documentTypeCode: RenterDocumentCode): boolean {
    return this.selectedRequestDocumentCodes.includes(documentTypeCode);
  }

  toggleRequestDocument(option: RequestDocumentOption): void {
    if (this.isRequestDocumentSelected(option.documentTypeCode)) {
      this.removeRequestDocument(option.documentTypeCode);
      return;
    }

    this.selectedRequestDocumentCodes = [
      ...this.selectedRequestDocumentCodes,
      option.documentTypeCode
    ];
  }

  removeRequestDocument(documentTypeCode: RenterDocumentCode): void {
    this.selectedRequestDocumentCodes = this.selectedRequestDocumentCodes.filter(
      code => code !== documentTypeCode
    );
  }

  get documentZoomPercent(): number {
    return Math.round(this.documentZoom * 100);
  }

  get documentImageTransform(): string {
    return `translate(${this.documentPanX}px, ${this.documentPanY}px) scale(${this.documentZoom})`;
  }

  openDocument(document: RenterDocument): void {
    this.selectedDocument = document;
    this.resetDocumentViewer();
  }

  closeDocumentViewer(): void {
    this.selectedDocument = null;
    this.resetDocumentViewer();
  }

  zoomInDocument(): void {
    this.documentZoom = Math.min(
      this.maxDocumentZoom,
      this.roundZoom(this.documentZoom + this.documentZoomStep)
    );
  }

  zoomOutDocument(): void {
    this.documentZoom = Math.max(
      this.minDocumentZoom,
      this.roundZoom(this.documentZoom - this.documentZoomStep)
    );
  }

  resetDocumentViewer(): void {
    this.documentZoom = 1;
    this.documentPanX = 0;
    this.documentPanY = 0;
    this.isPanningDocument = false;
  }

  startDocumentPan(event: PointerEvent): void {
    if (!this.selectedDocument) {
      return;
    }

    this.isPanningDocument = true;
    this.lastDocumentPointerX = event.clientX;
    this.lastDocumentPointerY = event.clientY;

    const target = event.currentTarget as HTMLElement;
    target.setPointerCapture?.(event.pointerId);

    event.preventDefault();
  }

  panDocument(event: PointerEvent): void {
    if (!this.isPanningDocument) {
      return;
    }

    const deltaX = event.clientX - this.lastDocumentPointerX;
    const deltaY = event.clientY - this.lastDocumentPointerY;

    this.documentPanX += deltaX;
    this.documentPanY += deltaY;

    this.lastDocumentPointerX = event.clientX;
    this.lastDocumentPointerY = event.clientY;

    event.preventDefault();
  }

  endDocumentPan(): void {
    this.isPanningDocument = false;
  }

  getDocumentImageUrl(document: RenterDocument): string {
    if (document.fileUrl) {
      return document.fileUrl;
    }

    const title = this.escapeSvgText(document.name);
    const status = this.escapeSvgText(document.status);
    const code = this.escapeSvgText(document.documentTypeCode);

    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="900" height="1200" viewBox="0 0 900 1200">
        <rect width="900" height="1200" fill="#f8fafc"/>
        <rect x="70" y="80" width="760" height="1040" rx="28" fill="#ffffff" stroke="#e5eaf2" stroke-width="4"/>
        <rect x="120" y="150" width="660" height="70" rx="14" fill="#ff4104" opacity="0.12"/>
        <text x="450" y="195" text-anchor="middle" font-family="Arial, sans-serif" font-size="32" font-weight="700" fill="#001621">${title}</text>
        <text x="450" y="260" text-anchor="middle" font-family="Arial, sans-serif" font-size="18" fill="#667085">${code}</text>
        <rect x="140" y="330" width="620" height="360" rx="20" fill="#f1f5f9" stroke="#cbd5e1" stroke-dasharray="14 14" stroke-width="3"/>
        <text x="450" y="500" text-anchor="middle" font-family="Arial, sans-serif" font-size="86" fill="#94a3b8">📄</text>
        <text x="450" y="575" text-anchor="middle" font-family="Arial, sans-serif" font-size="28" font-weight="700" fill="#001621">Document Preview</text>
        <text x="450" y="625" text-anchor="middle" font-family="Arial, sans-serif" font-size="18" fill="#667085">Actual uploaded file will display here from secure storage.</text>
        <text x="450" y="780" text-anchor="middle" font-family="Arial, sans-serif" font-size="22" font-weight="700" fill="#001621">Status: ${status}</text>
        <g opacity="0.11" transform="rotate(-28 450 600)">
          <text x="450" y="610" text-anchor="middle" font-family="Arial, sans-serif" font-size="78" font-weight="900" fill="#ff4104">WATERMARKED</text>
        </g>
        <text x="450" y="1030" text-anchor="middle" font-family="Arial, sans-serif" font-size="18" fill="#94a3b8">FamBridge Protected Document Viewer</text>
      </svg>
    `;

    return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
  }

  private roundZoom(value: number): number {
    return Math.round(value * 100) / 100;
  }

  private escapeSvgText(value: string): string {
    return value
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  get filteredRenters(): RenterApprovalRecord[] {
    const keyword = this.searchText.toLowerCase().trim();

    return this.renters.filter(renter => {
      const matchSearch =
        !keyword ||
        renter.renterName.toLowerCase().includes(keyword) ||
        renter.trustId.toLowerCase().includes(keyword) ||
        renter.email.toLowerCase().includes(keyword) ||
        renter.mobile.toLowerCase().includes(keyword);

      const matchStatus =
        this.selectedStatus === 'All' ||
        renter.approvalStatus === this.selectedStatus;

      return matchSearch && matchStatus;
    });
  }

  get visibleRenters(): RenterApprovalRecord[] {
    if (this.selectedRenter) {
      return [this.selectedRenter];
    }

    return this.filteredRenters;
  }

  get pendingCount(): number {
    return this.renters.filter(item => item.approvalStatus === 'Pending Approval').length;
  }

  get approvedCount(): number {
    return this.renters.filter(item => item.approvalStatus === 'Approved').length;
  }

  get needMoreDocsCount(): number {
    return this.renters.filter(item => item.approvalStatus === 'Need More Documents').length;
  }

  get rejectedCount(): number {
    return this.renters.filter(item => item.approvalStatus === 'Rejected').length;
  }

  openRenter(renter: RenterApprovalRecord): void {
    this.selectedRenter = renter;
    this.resetActionBoxes();

    setTimeout(() => {
      document
        .getElementById('renterDetailSection')
        ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  }

  backToList(): void {
    this.selectedRenter = null;
    this.resetActionBoxes();

    setTimeout(() => {
      document
        .getElementById('renterApprovalList')
        ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  }

  approveRenter(renter: RenterApprovalRecord): void {
    const record = this.renters.find(item => item.id === renter.id);

    if (!record) {
      return;
    }

    record.approvalStatus = 'Approved';
    record.approvedDate = 'Today';
    record.approvedBy = 'Current User';

    record.notes = [
      ...record.notes,
      {
        source: 'Lessor',
        createdBy: 'Current User',
        createdAt: 'Today',
        message: 'Renter approved by lessor.'
      },
      {
        source: 'System',
        createdBy: 'FamBridge API',
        createdAt: 'Today',
        message: 'Renter approval status changed to Approved.'
      }
    ];

    this.selectedRenter = record;
    this.resetActionBoxes();
  }

  startRejectRenter(renter: RenterApprovalRecord): void {
    this.selectedRenter = renter;
    this.showRejectBox = true;
    this.showRequestDocsBox = false;
    this.rejectReason = '';
  }

  proceedRejectRenter(): void {
    if (!this.selectedRenter || !this.rejectReason.trim()) {
      return;
    }

    const record = this.renters.find(item => item.id === this.selectedRenter?.id);

    if (!record) {
      return;
    }

    record.approvalStatus = 'Rejected';
    record.rejectedDate = 'Today';
    record.rejectedBy = 'Current User';

    record.notes = [
      ...record.notes,
      {
        source: 'Lessor',
        createdBy: 'Current User',
        createdAt: 'Today',
        message: `Renter rejected: ${this.rejectReason.trim()}`
      },
      {
        source: 'System',
        createdBy: 'FamBridge API',
        createdAt: 'Today',
        message: 'Renter approval request was rejected by the lessor.'
      }
    ];

    this.selectedRenter = record;
    this.rejectReason = '';
    this.showRejectBox = false;
  }

  startRequestMoreDocuments(renter: RenterApprovalRecord): void {
    this.selectedRenter = renter;
    this.showRequestDocsBox = true;
    this.showRejectBox = false;
    this.requestDocsReason = '';

    const suggestedDocumentCodes = renter.documents
      .filter(document => document.status === 'Missing' || document.status === 'Rejected')
      .map(document => document.documentTypeCode);

    this.selectedRequestDocumentCodes = Array.from(new Set(suggestedDocumentCodes));
  }

  proceedRequestMoreDocuments(): void {
    if (
      !this.selectedRenter ||
      !this.requestDocsReason.trim() ||
      this.selectedRequestDocumentCodes.length === 0
    ) {
      return;
    }

    const record = this.renters.find(item => item.id === this.selectedRenter?.id);

    if (!record) {
      return;
    }

    const requestedDocuments = this.selectedRequestDocuments
      .map(document => document.label)
      .join(', ');

    record.approvalStatus = 'Need More Documents';
    record.requestedMoreDocsDate = 'Today';
    record.requestedMoreDocsBy = 'Current User';

    record.notes = [
      ...record.notes,
      {
        source: 'Lessor',
        createdBy: 'Current User',
        createdAt: 'Today',
        message: `More documents requested (${requestedDocuments}): ${this.requestDocsReason.trim()}`
      },
      {
        source: 'System',
        createdBy: 'FamBridge API',
        createdAt: 'Today',
        message: `Document request created with document type codes: ${this.selectedRequestDocumentCodes.join(', ')}.`
      }
    ];

    this.selectedRenter = record;
    this.requestDocsReason = '';
    this.selectedRequestDocumentCodes = [];
    this.showRequestDocsBox = false;
  }

  cancelAction(): void {
    this.resetActionBoxes();
  }

  private resetActionBoxes(): void {
    this.showRejectBox = false;
    this.showRequestDocsBox = false;
    this.rejectReason = '';
    this.requestDocsReason = '';
    this.selectedRequestDocumentCodes = [];
  }
}
