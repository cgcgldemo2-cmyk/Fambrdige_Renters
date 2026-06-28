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

type RentalReferenceStatus = 'Provided' | 'Verified' | 'Needs Review';

type RentalReferencePlatform = 'Facebook' | 'Instagram' | 'TikTok' | 'Manual';

interface RenterDocumentUpload {
  id: number;
  documentTypeId: number;
  documentTypeCode: string;
  documentLabel: string;
  status: DocumentStatus;
  uploadedAt?: string;
  uploadedBy: string;
  fileUrl?: string;
  thumbnailUrl?: string;
  remarks?: string;
  reviewedBy?: string;
  reviewedAt?: string;
}

interface DocumentRequirementGroup {
  requirementId: number;
  requirementCode: string;
  label: string;
  description: string;
  icon: string;
  acceptedDocumentTypeCodes: string[];
  uploads: RenterDocumentUpload[];
  isExpanded?: boolean;
}

interface RenterNote {
  source: NoteSource;
  createdBy: string;
  createdAt: string;
  message: string;
}

interface RentalReference {
  companyName: string;
  platform: RentalReferencePlatform;
  url: string;
  status: RentalReferenceStatus;
}

interface RequestDocumentOption {
  requirementId: number;
  requirementCode: string;
  label: string;
  description: string;
  icon: string;
  acceptedDocumentTypeCodes: string[];
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
  documentGroups: DocumentRequirementGroup[];
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

  selectedDocumentGroup: DocumentRequirementGroup | null = null;
  selectedDocument: RenterDocumentUpload | null = null;
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
      requirementId: 1,
      requirementCode: 'DRIVER_LICENSE',
      label: 'Driver License',
      description: 'Valid driver license. Multiple uploads are allowed if previous copy is blurry or rejected.',
      icon: '🚗',
      acceptedDocumentTypeCodes: ['DRIVER_LICENSE']
    },
    {
      requirementId: 2,
      requirementCode: 'GOVERNMENT_ID_GROUP',
      label: 'Any Government ID',
      description: 'SSS, GSIS, UMID, National ID, PRC, Passport, PhilHealth, Voter ID, or Postal ID.',
      icon: '🪪',
      acceptedDocumentTypeCodes: [
        'SSS_ID',
        'GSIS_ID',
        'UMID_ID',
        'NATIONAL_ID',
        'PRC_ID',
        'PASSPORT',
        'PHILHEALTH_ID',
        'VOTER_ID',
        'POSTAL_ID'
      ]
    },
    {
      requirementId: 3,
      requirementCode: 'PROOF_OF_ADDRESS',
      label: 'Proof of Address',
      description: 'Utility bill, billing statement, barangay certificate, or bank statement.',
      icon: '🏠',
      acceptedDocumentTypeCodes: [
        'UTILITY_BILL',
        'BILLING_STATEMENT',
        'BARANGAY_CERTIFICATE',
        'BANK_STATEMENT'
      ]
    },
    {
      requirementId: 4,
      requirementCode: 'SELFIE_VERIFICATION',
      label: 'Selfie Verification',
      description: 'Selfie photo used to match submitted IDs and renter profile.',
      icon: '🤳',
      acceptedDocumentTypeCodes: ['SELFIE_VERIFICATION']
    },
    {
      requirementId: 5,
      requirementCode: 'RENTAL_REFERENCE',
      label: 'Rental Reference',
      description: 'Previous rental company record or reference proof.',
      icon: '📌',
      acceptedDocumentTypeCodes: ['RENTAL_REFERENCE']
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
      documentGroups: [
        {
          requirementId: 1,
          requirementCode: 'DRIVER_LICENSE',
          label: 'Driver License',
          description: 'Required valid driver license.',
          icon: '🚗',
          acceptedDocumentTypeCodes: ['DRIVER_LICENSE'],
          uploads: [
            {
              id: 101,
              documentTypeId: 1,
              documentTypeCode: 'DRIVER_LICENSE',
              documentLabel: 'Driver License - First Upload',
              status: 'Rejected',
              uploadedAt: 'Jul 18, 2026 08:30 AM',
              uploadedBy: 'Juan Dela Cruz',
              fileUrl: '',
              thumbnailUrl: '',
              remarks: 'Image was blurry. License number was not readable.',
              reviewedBy: 'Admin User',
              reviewedAt: 'Jul 18, 2026 09:05 AM'
            },
            {
              id: 102,
              documentTypeId: 1,
              documentTypeCode: 'DRIVER_LICENSE',
              documentLabel: 'Driver License - Re-upload',
              status: 'Submitted',
              uploadedAt: 'Jul 18, 2026 09:20 AM',
              uploadedBy: 'Juan Dela Cruz',
              fileUrl: '',
              thumbnailUrl: '',
              remarks: 'Clearer re-upload for manual review.'
            }
          ]
        },
        {
          requirementId: 2,
          requirementCode: 'GOVERNMENT_ID_GROUP',
          label: 'Any Government ID',
          description: 'Accepts SSS, GSIS, UMID, National ID, PRC, Passport, PhilHealth, Voter ID, or Postal ID.',
          icon: '🪪',
          acceptedDocumentTypeCodes: [
            'SSS_ID',
            'GSIS_ID',
            'UMID_ID',
            'NATIONAL_ID',
            'PRC_ID',
            'PASSPORT',
            'PHILHEALTH_ID',
            'VOTER_ID',
            'POSTAL_ID'
          ],
          uploads: [
            {
              id: 201,
              documentTypeId: 2,
              documentTypeCode: 'NATIONAL_ID',
              documentLabel: 'National ID',
              status: 'Submitted',
              uploadedAt: 'Jul 18, 2026 08:31 AM',
              uploadedBy: 'Juan Dela Cruz',
              fileUrl: '',
              thumbnailUrl: '',
              remarks: 'Needs manual review.'
            }
          ]
        },
        {
          requirementId: 3,
          requirementCode: 'PROOF_OF_ADDRESS',
          label: 'Proof of Address',
          description: 'Utility bill, billing statement, barangay certificate, or bank statement.',
          icon: '🏠',
          acceptedDocumentTypeCodes: [
            'UTILITY_BILL',
            'BILLING_STATEMENT',
            'BARANGAY_CERTIFICATE',
            'BANK_STATEMENT'
          ],
          uploads: [
            {
              id: 301,
              documentTypeId: 3,
              documentTypeCode: 'UTILITY_BILL',
              documentLabel: 'Utility Bill',
              status: 'Submitted',
              uploadedAt: 'Jul 18, 2026 08:33 AM',
              uploadedBy: 'Juan Dela Cruz',
              fileUrl: '',
              thumbnailUrl: '',
              remarks: 'Utility bill uploaded.'
            }
          ]
        },
        {
          requirementId: 4,
          requirementCode: 'SELFIE_VERIFICATION',
          label: 'Selfie Verification',
          description: 'Selfie photo used to match submitted documents.',
          icon: '🤳',
          acceptedDocumentTypeCodes: ['SELFIE_VERIFICATION'],
          uploads: [
            {
              id: 401,
              documentTypeId: 4,
              documentTypeCode: 'SELFIE_VERIFICATION',
              documentLabel: 'Selfie Verification',
              status: 'Submitted',
              uploadedAt: 'Jul 18, 2026 08:35 AM',
              uploadedBy: 'Juan Dela Cruz',
              fileUrl: '',
              thumbnailUrl: '',
              remarks: 'Face is visible.'
            }
          ]
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
      documentGroups: [
        {
          requirementId: 1,
          requirementCode: 'DRIVER_LICENSE',
          label: 'Driver License',
          description: 'Required valid driver license.',
          icon: '🚗',
          acceptedDocumentTypeCodes: ['DRIVER_LICENSE'],
          uploads: [
            {
              id: 501,
              documentTypeId: 1,
              documentTypeCode: 'DRIVER_LICENSE',
              documentLabel: 'Driver License',
              status: 'Verified',
              uploadedAt: 'Jul 16, 2026 10:00 AM',
              uploadedBy: 'Maria Santos',
              fileUrl: '',
              thumbnailUrl: '',
              remarks: 'Verified by lessor.',
              reviewedBy: 'Admin User',
              reviewedAt: 'Jul 16, 2026 10:30 AM'
            }
          ]
        },
        {
          requirementId: 2,
          requirementCode: 'GOVERNMENT_ID_GROUP',
          label: 'Any Government ID',
          description: 'Accepts SSS, GSIS, UMID, National ID, PRC, Passport, PhilHealth, Voter ID, or Postal ID.',
          icon: '🪪',
          acceptedDocumentTypeCodes: [
            'SSS_ID',
            'GSIS_ID',
            'UMID_ID',
            'NATIONAL_ID',
            'PRC_ID',
            'PASSPORT',
            'PHILHEALTH_ID',
            'VOTER_ID',
            'POSTAL_ID'
          ],
          uploads: [
            {
              id: 601,
              documentTypeId: 2,
              documentTypeCode: 'UMID_ID',
              documentLabel: 'UMID ID',
              status: 'Verified',
              uploadedAt: 'Jul 16, 2026 10:01 AM',
              uploadedBy: 'Maria Santos',
              fileUrl: '',
              thumbnailUrl: '',
              remarks: 'Verified by lessor.',
              reviewedBy: 'Admin User',
              reviewedAt: 'Jul 16, 2026 10:34 AM'
            }
          ]
        },
        {
          requirementId: 3,
          requirementCode: 'PROOF_OF_ADDRESS',
          label: 'Proof of Address',
          description: 'Utility bill, billing statement, barangay certificate, or bank statement.',
          icon: '🏠',
          acceptedDocumentTypeCodes: [
            'UTILITY_BILL',
            'BILLING_STATEMENT',
            'BARANGAY_CERTIFICATE',
            'BANK_STATEMENT'
          ],
          uploads: [
            {
              id: 701,
              documentTypeId: 3,
              documentTypeCode: 'BANK_STATEMENT',
              documentLabel: 'Bank Statement',
              status: 'Verified',
              uploadedAt: 'Jul 16, 2026 10:04 AM',
              uploadedBy: 'Maria Santos',
              fileUrl: '',
              thumbnailUrl: '',
              remarks: 'Verified by lessor.',
              reviewedBy: 'Admin User',
              reviewedAt: 'Jul 16, 2026 10:38 AM'
            }
          ]
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
      documentGroups: [
        {
          requirementId: 1,
          requirementCode: 'DRIVER_LICENSE',
          label: 'Driver License',
          description: 'Required valid driver license.',
          icon: '🚗',
          acceptedDocumentTypeCodes: ['DRIVER_LICENSE'],
          uploads: [
            {
              id: 801,
              documentTypeId: 1,
              documentTypeCode: 'DRIVER_LICENSE',
              documentLabel: 'Driver License',
              status: 'Submitted',
              uploadedAt: 'Jul 20, 2026 03:10 PM',
              uploadedBy: 'Mark Reyes',
              fileUrl: '',
              thumbnailUrl: '',
              remarks: 'Image is slightly blurry.'
            }
          ]
        },
        {
          requirementId: 2,
          requirementCode: 'GOVERNMENT_ID_GROUP',
          label: 'Any Government ID',
          description: 'Accepts SSS, GSIS, UMID, National ID, PRC, Passport, PhilHealth, Voter ID, or Postal ID.',
          icon: '🪪',
          acceptedDocumentTypeCodes: [
            'SSS_ID',
            'GSIS_ID',
            'UMID_ID',
            'NATIONAL_ID',
            'PRC_ID',
            'PASSPORT',
            'PHILHEALTH_ID',
            'VOTER_ID',
            'POSTAL_ID'
          ],
          uploads: []
        },
        {
          requirementId: 3,
          requirementCode: 'PROOF_OF_ADDRESS',
          label: 'Proof of Address',
          description: 'Utility bill, billing statement, barangay certificate, or bank statement.',
          icon: '🏠',
          acceptedDocumentTypeCodes: [
            'UTILITY_BILL',
            'BILLING_STATEMENT',
            'BARANGAY_CERTIFICATE',
            'BANK_STATEMENT'
          ],
          uploads: []
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
      documentGroups: [
        {
          requirementId: 1,
          requirementCode: 'DRIVER_LICENSE',
          label: 'Driver License',
          description: 'Required valid driver license.',
          icon: '🚗',
          acceptedDocumentTypeCodes: ['DRIVER_LICENSE'],
          uploads: [
            {
              id: 901,
              documentTypeId: 1,
              documentTypeCode: 'DRIVER_LICENSE',
              documentLabel: 'Driver License',
              status: 'Rejected',
              uploadedAt: 'Jul 22, 2026 01:10 PM',
              uploadedBy: 'Ana Lim',
              fileUrl: '',
              thumbnailUrl: '',
              remarks: 'Document does not match renter information.',
              reviewedBy: 'Admin User',
              reviewedAt: 'Jul 22, 2026 02:10 PM'
            }
          ]
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

  getUploadedDocumentCount(renter: RenterApprovalRecord): number {
    return renter.documentGroups.reduce((total, group) => total + group.uploads.length, 0);
  }

  getVerifiedDocumentCount(renter: RenterApprovalRecord): number {
    return renter.documentGroups.reduce((total, group) => {
      return total + group.uploads.filter(upload => upload.status === 'Verified').length;
    }, 0);
  }

  getLatestDocument(group: DocumentRequirementGroup): RenterDocumentUpload | null {
    if (!group.uploads || group.uploads.length === 0) {
      return null;
    }

    return group.uploads[group.uploads.length - 1];
  }

  getGroupStatus(group: DocumentRequirementGroup): DocumentStatus {
    const latestDocument = this.getLatestDocument(group);
    return latestDocument?.status || 'Missing';
  }

  getGroupRemarks(group: DocumentRequirementGroup): string {
    const latestDocument = this.getLatestDocument(group);

    if (!latestDocument) {
      return 'No uploaded document yet.';
    }

    return latestDocument.remarks || 'No remarks.';
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
      item => item.requirementCode === option.requirementCode
    );

    if (exists) {
      this.removeRequestDocument(option.requirementCode);
      return;
    }

    this.selectedRequestDocuments = [
      ...this.selectedRequestDocuments,
      option
    ];
  }

  isRequestDocumentSelected(requirementCode: string): boolean {
    return this.selectedRequestDocuments.some(
      item => item.requirementCode === requirementCode
    );
  }

  removeRequestDocument(requirementCode: string): void {
    this.selectedRequestDocuments = this.selectedRequestDocuments.filter(
      item => item.requirementCode !== requirementCode
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
      .map(item => `${item.requirementCode} [${item.acceptedDocumentTypeCodes.join('|')}]`)
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
        message: `Document request created using requirement groups and accepted document type codes: ${selectedCodes}.`
      }
    ];

    this.selectedRenter = record;
    this.requestDocsReason = '';
    this.selectedRequestDocuments = [];
    this.showRequestDocsBox = false;
  }

  toggleDocumentGroup(group: DocumentRequirementGroup): void {
    group.isExpanded = !group.isExpanded;
  }

  openLatestDocumentViewer(group: DocumentRequirementGroup): void {
    const latestDocument = this.getLatestDocument(group);

    if (!latestDocument) {
      return;
    }

    this.openDocumentViewer(group, latestDocument);
  }

  openDocumentViewer(group: DocumentRequirementGroup, doc: RenterDocumentUpload): void {
    this.selectedDocumentGroup = group;
    this.selectedDocument = doc;
    this.documentZoom = 1;
    this.documentPanX = 0;
    this.documentPanY = 0;
    this.isPanning = false;
    this.showDocumentRejectBox = false;
    this.documentRejectReason = '';
  }

  closeDocumentViewer(): void {
    this.selectedDocumentGroup = null;
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
    this.selectedDocument.reviewedBy = 'Current User';
    this.selectedDocument.reviewedAt = 'Today';
    this.selectedDocument.remarks = 'Document verified by lessor.';

    this.selectedRenter.notes = [
      ...this.selectedRenter.notes,
      {
        source: 'Lessor',
        createdBy: 'Current User',
        createdAt: 'Today',
        message: `Document verified: ${this.selectedDocument.documentLabel} (${this.selectedDocument.documentTypeCode}).`
      },
      {
        source: 'System',
        createdBy: 'FamBridge API',
        createdAt: 'Today',
        message: `Document upload ${this.selectedDocument.id} status changed to Verified for ${this.selectedDocument.documentTypeCode}.`
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
    this.selectedDocument.reviewedBy = 'Current User';
    this.selectedDocument.reviewedAt = 'Today';
    this.selectedDocument.remarks = reason;

    this.selectedRenter.notes = [
      ...this.selectedRenter.notes,
      {
        source: 'Lessor',
        createdBy: 'Current User',
        createdAt: 'Today',
        message: `Document rejected: ${this.selectedDocument.documentLabel} (${this.selectedDocument.documentTypeCode}). Reason: ${reason}`
      },
      {
        source: 'System',
        createdBy: 'FamBridge API',
        createdAt: 'Today',
        message: `Document upload ${this.selectedDocument.id} status changed to Rejected. Rejection reason met the minimum 50-character requirement.`
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
