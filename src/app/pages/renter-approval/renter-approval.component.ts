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

type NoteSource = 'Renter' | 'System' | 'Lessor';

interface RenterDocument {
  id: number;
  documentTypeId: number;
  documentTypeCode: string;
  name: string;
  status: DocumentStatus;
  submittedDate?: string;
  fileUrl?: string;
  remarks?: string;
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

interface RequestDocumentOption {
  documentTypeId: number;
  documentTypeCode: string;
  label: string;
  description: string;
  icon: string;
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

  selectedRequestDocuments: RequestDocumentOption[] = [];

  selectedDocument: RenterDocument | null = null;
  documentZoom = 1;
  documentPanX = 0;
  documentPanY = 0;
  isPanning = false;
  panStartX = 0;
  panStartY = 0;

  showDocumentRejectBox = false;
  documentRejectReason = '';

  approvalStatuses = [
    'All',
    'Pending Approval',
    'Approved',
    'Rejected',
    'Need More Documents'
  ];

  requestDocumentOptions: RequestDocumentOption[] = [
    {
      documentTypeId: 1,
      documentTypeCode: 'DRIVER_LICENSE',
      label: 'Driver License',
      description: 'Valid driver license front/back copy.',
      icon: '🚗'
    },
    {
      documentTypeId: 2,
      documentTypeCode: 'GOVERNMENT_ID',
      label: 'Government ID',
      description: 'Valid government-issued identification.',
      icon: '🪪'
    },
    {
      documentTypeId: 3,
      documentTypeCode: 'PROOF_OF_ADDRESS',
      label: 'Proof of Address',
      description: 'Utility bill, billing statement, or barangay certificate.',
      icon: '🏠'
    },
    {
      documentTypeId: 4,
      documentTypeCode: 'SELFIE_VERIFICATION',
      label: 'Selfie Verification',
      description: 'Selfie photo used to match submitted documents.',
      icon: '🤳'
    },
    {
      documentTypeId: 5,
      documentTypeCode: 'RENTAL_REFERENCE',
      label: 'Rental Reference',
      description: 'Previous rental company or reference proof.',
      icon: '📌'
    }
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
          documentTypeCode: 'DRIVER_LICENSE',
          name: 'Driver License',
          status: 'Submitted',
          submittedDate: 'Jul 18, 2026 08:30 AM',
          fileUrl: '',
          remarks: 'Clear image uploaded.'
        },
        {
          id: 2,
          documentTypeId: 2,
          documentTypeCode: 'GOVERNMENT_ID',
          name: 'Government ID',
          status: 'Submitted',
          submittedDate: 'Jul 18, 2026 08:31 AM',
          fileUrl: '',
          remarks: 'Needs manual review.'
        },
        {
          id: 3,
          documentTypeId: 3,
          documentTypeCode: 'PROOF_OF_ADDRESS',
          name: 'Proof of Address',
          status: 'Submitted',
          submittedDate: 'Jul 18, 2026 08:33 AM',
          fileUrl: '',
          remarks: 'Utility bill uploaded.'
        },
        {
          id: 4,
          documentTypeId: 4,
          documentTypeCode: 'SELFIE_VERIFICATION',
          name: 'Selfie Verification',
          status: 'Submitted',
          submittedDate: 'Jul 18, 2026 08:35 AM',
          fileUrl: '',
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
          documentTypeCode: 'DRIVER_LICENSE',
          name: 'Driver License',
          status: 'Verified',
          submittedDate: 'Jul 16, 2026 10:00 AM',
          fileUrl: '',
          remarks: 'Verified by lessor.'
        },
        {
          id: 2,
          documentTypeId: 2,
          documentTypeCode: 'GOVERNMENT_ID',
          name: 'Government ID',
          status: 'Verified',
          submittedDate: 'Jul 16, 2026 10:01 AM',
          fileUrl: '',
          remarks: 'Verified by lessor.'
        },
        {
          id: 3,
          documentTypeId: 3,
          documentTypeCode: 'PROOF_OF_ADDRESS',
          name: 'Proof of Address',
          status: 'Verified',
          submittedDate: 'Jul 16, 2026 10:04 AM',
          fileUrl: '',
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
          documentTypeCode: 'DRIVER_LICENSE',
          name: 'Driver License',
          status: 'Submitted',
          submittedDate: 'Jul 20, 2026 03:10 PM',
          fileUrl: '',
          remarks: 'Image is slightly blurry.'
        },
        {
          id: 2,
          documentTypeId: 2,
          documentTypeCode: 'GOVERNMENT_ID',
          name: 'Government ID',
          status: 'Missing',
          remarks: 'Required document not uploaded.'
        },
        {
          id: 3,
          documentTypeId: 3,
          documentTypeCode: 'PROOF_OF_ADDRESS',
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
          documentTypeCode: 'DRIVER_LICENSE',
          name: 'Driver License',
          status: 'Rejected',
          submittedDate: 'Jul 22, 2026 01:10 PM',
          fileUrl: '',
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

  get documentRejectCharacters(): number {
    return this.documentRejectReason.trim().length;
  }

  get canProceedDocumentReject(): boolean {
    return this.documentRejectCharacters >= 50;
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
    this.closeDocumentViewer();

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
    this.selectedRequestDocuments = [];
  }

  toggleRequestDocument(option: RequestDocumentOption): void {
    const exists = this.selectedRequestDocuments.some(
      item => item.documentTypeCode === option.documentTypeCode
    );

    if (exists) {
      this.removeRequestDocument(option.documentTypeCode);
      return;
    }

    this.selectedRequestDocuments = [
      ...this.selectedRequestDocuments,
      option
    ];
  }

  isRequestDocumentSelected(documentTypeCode: string): boolean {
    return this.selectedRequestDocuments.some(
      item => item.documentTypeCode === documentTypeCode
    );
  }

  removeRequestDocument(documentTypeCode: string): void {
    this.selectedRequestDocuments = this.selectedRequestDocuments.filter(
      item => item.documentTypeCode !== documentTypeCode
    );
  }

  proceedRequestMoreDocuments(): void {
    if (
      !this.selectedRenter ||
      !this.requestDocsReason.trim() ||
      this.selectedRequestDocuments.length === 0
    ) {
      return;
    }

    const record = this.renters.find(item => item.id === this.selectedRenter?.id);

    if (!record) {
      return;
    }

    const selectedLabels = this.selectedRequestDocuments
      .map(item => item.label)
      .join(', ');

    const selectedCodes = this.selectedRequestDocuments
      .map(item => item.documentTypeCode)
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
        message: `More documents requested: ${selectedLabels}. ${this.requestDocsReason.trim()}`
      },
      {
        source: 'System',
        createdBy: 'FamBridge API',
        createdAt: 'Today',
        message: `Document request created using document type codes: ${selectedCodes}.`
      }
    ];

    this.selectedRenter = record;
    this.requestDocsReason = '';
    this.selectedRequestDocuments = [];
    this.showRequestDocsBox = false;
  }

  openDocumentViewer(doc: RenterDocument): void {
    this.selectedDocument = doc;
    this.documentZoom = 1;
    this.documentPanX = 0;
    this.documentPanY = 0;
    this.isPanning = false;
    this.showDocumentRejectBox = false;
    this.documentRejectReason = '';
  }

  closeDocumentViewer(): void {
    this.selectedDocument = null;
    this.documentZoom = 1;
    this.documentPanX = 0;
    this.documentPanY = 0;
    this.isPanning = false;
    this.showDocumentRejectBox = false;
    this.documentRejectReason = '';
  }

  zoomInDocument(): void {
    this.documentZoom = Math.min(this.documentZoom + 0.2, 3);
  }

  zoomOutDocument(): void {
    this.documentZoom = Math.max(this.documentZoom - 0.2, 0.6);
  }

  resetDocumentView(): void {
    this.documentZoom = 1;
    this.documentPanX = 0;
    this.documentPanY = 0;
  }

  startDocumentPan(event: MouseEvent): void {
    if (!this.selectedDocument) {
      return;
    }

    event.preventDefault();
    this.isPanning = true;
    this.panStartX = event.clientX - this.documentPanX;
    this.panStartY = event.clientY - this.documentPanY;
  }

  moveDocumentPan(event: MouseEvent): void {
    if (!this.isPanning) {
      return;
    }

    this.documentPanX = event.clientX - this.panStartX;
    this.documentPanY = event.clientY - this.panStartY;
  }

  stopDocumentPan(): void {
    this.isPanning = false;
  }

  onDocumentWheel(event: WheelEvent): void {
    event.preventDefault();

    if (event.deltaY < 0) {
      this.zoomInDocument();
      return;
    }

    this.zoomOutDocument();
  }

  verifySelectedDocument(): void {
    if (!this.selectedDocument || !this.selectedRenter) {
      return;
    }

    if (this.selectedDocument.status === 'Missing') {
      return;
    }

    this.selectedDocument.status = 'Verified';
    this.selectedDocument.remarks = 'Document verified by lessor.';

    this.selectedRenter.notes = [
      ...this.selectedRenter.notes,
      {
        source: 'Lessor',
        createdBy: 'Current User',
        createdAt: 'Today',
        message: `Document verified: ${this.selectedDocument.name} (${this.selectedDocument.documentTypeCode}).`
      },
      {
        source: 'System',
        createdBy: 'FamBridge API',
        createdAt: 'Today',
        message: `Document status changed to Verified for documentTypeCode ${this.selectedDocument.documentTypeCode}.`
      }
    ];

    this.showDocumentRejectBox = false;
    this.documentRejectReason = '';
  }

  startRejectSelectedDocument(): void {
    if (!this.selectedDocument || this.selectedDocument.status === 'Missing') {
      return;
    }

    this.showDocumentRejectBox = true;
    this.documentRejectReason = '';
  }

  proceedRejectSelectedDocument(): void {
    if (
      !this.selectedDocument ||
      !this.selectedRenter ||
      !this.canProceedDocumentReject
    ) {
      return;
    }

    const reason = this.documentRejectReason.trim();

    this.selectedDocument.status = 'Rejected';
    this.selectedDocument.remarks = reason;

    this.selectedRenter.notes = [
      ...this.selectedRenter.notes,
      {
        source: 'Lessor',
        createdBy: 'Current User',
        createdAt: 'Today',
        message: `Document rejected: ${this.selectedDocument.name} (${this.selectedDocument.documentTypeCode}). Reason: ${reason}`
      },
      {
        source: 'System',
        createdBy: 'FamBridge API',
        createdAt: 'Today',
        message: `Document status changed to Rejected for documentTypeCode ${this.selectedDocument.documentTypeCode}. Rejection reason met the minimum 50-character requirement.`
      }
    ];

    this.showDocumentRejectBox = false;
    this.documentRejectReason = '';
  }

  cancelDocumentReject(): void {
    this.showDocumentRejectBox = false;
    this.documentRejectReason = '';
  }

  cancelAction(): void {
    this.resetActionBoxes();
  }

  private resetActionBoxes(): void {
    this.showRejectBox = false;
    this.showRequestDocsBox = false;
    this.rejectReason = '';
    this.requestDocsReason = '';
    this.selectedRequestDocuments = [];
  }
}
