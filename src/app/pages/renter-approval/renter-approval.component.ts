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
