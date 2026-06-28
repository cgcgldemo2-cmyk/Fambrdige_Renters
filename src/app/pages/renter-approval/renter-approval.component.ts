import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LessorSidebarComponent } from '../../shared/components/lessor-sidebar/lessor-sidebar.component';

type ApprovalStatus = 'Pending Approval' | 'Approved' | 'Need More Documents' | 'Rejected';

type HistoryStatus = 'Uploaded' | 'Verified' | 'Rejected';
type NoteSource = 'Renter' | 'System' | 'Lessor';

type DetailTab = 'documents' | 'booking-history' | 'ratings' | 'driving-history' | 'notes';

interface UploadHistoryItem {
  id: number;
  thumbnail: string;
  fileUrl?: string;
  fileName: string;
  dateTime: string;
  status: HistoryStatus;
  user: string;
  remarks: string;
}

interface DocumentGroup {
  id: number;
  title: string;
  icon: string;
  description: string;
  acceptedTypes: string[];
  status: 'Submitted' | 'Verified' | 'Needs Review' | 'Rejected';
  latestFileName: string;
  latestUploadedAt: string;
  latestRemarks: string;
  latestThumbnail: string;
  history: UploadHistoryItem[];
}

interface BookingHistoryItem {
  bookingNo: string;
  vehicle: string;
  rentalDates: string;
  rentalForm: string;
  status: 'Completed' | 'Cancelled' | 'Rejected';
  feeStatus: 'Paid' | 'Refunded' | 'N/A';
  lessor: string;
  remarks: string;
}

interface ReviewItem {
  lessor: string;
  rating: number;
  date: string;
  vehicle: string;
  comment: string;
}

interface ActivityNote {
  source: NoteSource;
  createdBy: string;
  createdAt: string;
  message: string;
}

interface RenterApprovalRecord {
  id: number;
  renterName: string;
  trustId: string;
  email: string;
  mobile: string;
  trustScore: number;
  uploadedDocuments: number;
  verifiedDocuments: number;
  requirementGroups: number;
  completedBookings: number;
  previousReferences: number;
  averageRating: number;
  reviewCount: number;
  approvalStatus: ApprovalStatus;
  submittedDate: string;
  documents: DocumentGroup[];
  bookingHistory: BookingHistoryItem[];
  reviews: ReviewItem[];
  notes: ActivityNote[];
}

@Component({
  selector: 'app-renter-approval',
  standalone: true,
  imports: [CommonModule, FormsModule, LessorSidebarComponent],
  templateUrl: './renter-approval.component.html',
  styleUrls: ['./renter-approval.component.scss']
})
export class RenterApprovalComponent {
  searchText = '';
  selectedStatus = 'All';
  activeTab: DetailTab = 'documents';

  approvalStatuses = ['All', 'Pending Approval', 'Approved', 'Need More Documents', 'Rejected'];

  records: RenterApprovalRecord[] = [
    {
      id: 1,
      renterName: 'Juan Dela Cruz',
      trustId: 'TR-A92X7KQ4',
      email: 'juan.delacruz@email.com',
      mobile: '+63 917 123 4567',
      trustScore: 82,
      uploadedDocuments: 15,
      verifiedDocuments: 9,
      requirementGroups: 4,
      completedBookings: 12,
      previousReferences: 3,
      averageRating: 4.7,
      reviewCount: 8,
      approvalStatus: 'Pending Approval',
      submittedDate: 'Jul 18, 2026 08:42 AM',
      documents: [
        {
          id: 1,
          title: 'Driver License',
          icon: '🚗',
          description: 'Required valid driver license.',
          acceptedTypes: ['DRIVER_LICENSE'],
          status: 'Submitted',
          latestFileName: 'Driver License - Rev 3.jpg',
          latestUploadedAt: 'Jul 10, 2026 09:20 AM',
          latestRemarks: 'Clear and complete.',
          latestThumbnail: '🪪',
          history: [
            { id: 11, thumbnail: '🪪', fileName: 'Driver License - Rev 3.jpg', dateTime: 'Jul 10, 2026 09:20 AM', status: 'Verified', user: 'Juan Dela Cruz', remarks: 'Clear and complete.' },
            { id: 12, thumbnail: '🪪', fileName: 'Driver License - Rev 2.jpg', dateTime: 'Jul 10, 2026 08:15 AM', status: 'Rejected', user: 'Lessor Admin', remarks: 'Blurry photo.' },
            { id: 13, thumbnail: '🪪', fileName: 'Driver License.jpg', dateTime: 'Jul 7, 2026 02:40 PM', status: 'Uploaded', user: 'Juan Dela Cruz', remarks: 'Initial upload.' }
          ]
        },
        {
          id: 2,
          title: 'Any Government ID',
          icon: '🪪',
          description: 'Accepted: SSS, GSIS, UMID, National ID, PRC.',
          acceptedTypes: ['SSS_ID', 'GSIS_ID', 'UMID_ID', 'NATIONAL_ID', 'PRC_ID', 'PASSPORT', 'PHILHEALTH_ID', 'VOTER_ID', 'POSTAL_ID'],
          status: 'Submitted',
          latestFileName: 'National ID.jpg',
          latestUploadedAt: 'Jul 10, 2026 08:31 AM',
          latestRemarks: 'Valid and readable.',
          latestThumbnail: '🪪',
          history: [
            { id: 21, thumbnail: '🪪', fileName: 'National ID.jpg', dateTime: 'Jul 10, 2026 08:31 AM', status: 'Verified', user: 'Juan Dela Cruz', remarks: 'Valid and readable.' },
            { id: 22, thumbnail: '🪪', fileName: 'UMID.jpg', dateTime: 'Jul 10, 2026 07:40 AM', status: 'Uploaded', user: 'Juan Dela Cruz', remarks: 'Resubmitted clearer.' },
            { id: 23, thumbnail: '🪪', fileName: 'PRC.jpg', dateTime: 'Jul 7, 2026 11:22 AM', status: 'Rejected', user: 'Lessor Admin', remarks: 'Expired document.' }
          ]
        },
        {
          id: 3,
          title: 'Proof of Address',
          icon: '🏠',
          description: 'Utility bill, bank statement, barangay certificate, or rent agreement.',
          acceptedTypes: ['UTILITY_BILL', 'BANK_STATEMENT', 'BARANGAY_CERTIFICATE', 'RENT_AGREEMENT'],
          status: 'Submitted',
          latestFileName: 'Utility Bill.jpg',
          latestUploadedAt: 'Jul 10, 2026 08:15 AM',
          latestRemarks: 'Latest utility bill.',
          latestThumbnail: '📄',
          history: [
            { id: 31, thumbnail: '📄', fileName: 'Utility Bill.jpg', dateTime: 'Jul 10, 2026 08:15 AM', status: 'Verified', user: 'Juan Dela Cruz', remarks: 'Latest utility bill.' },
            { id: 32, thumbnail: '📄', fileName: 'Rent Agreement.pdf', dateTime: 'Jul 7, 2026 10:05 AM', status: 'Uploaded', user: 'Juan Dela Cruz', remarks: 'Initial upload.' }
          ]
        },
        {
          id: 4,
          title: 'Selfie Verification',
          icon: '📷',
          description: 'Selfie photo used to match submitted documents.',
          acceptedTypes: ['SELFIE_VERIFICATION'],
          status: 'Submitted',
          latestFileName: 'Selfie Verification.jpg',
          latestUploadedAt: 'Jul 10, 2026 08:31 AM',
          latestRemarks: 'Face is visible.',
          latestThumbnail: '🙂',
          history: [
            { id: 41, thumbnail: '🙂', fileName: 'Selfie Verification.jpg', dateTime: 'Jul 10, 2026 08:31 AM', status: 'Verified', user: 'Juan Dela Cruz', remarks: 'Face is visible.' },
            { id: 42, thumbnail: '🙂', fileName: 'Selfie Verification - old.jpg', dateTime: 'Jul 7, 2026 09:10 AM', status: 'Uploaded', user: 'Lessor Admin', remarks: 'Face is visible.' }
          ]
        }
      ],
      bookingHistory: [
        { bookingNo: 'BK-2025-00012', vehicle: 'Toyota Vios', rentalDates: 'Jun 01 - Jun 03, 2025', rentalForm: 'Self Drive', status: 'Completed', feeStatus: 'Paid', lessor: 'Juan Dela Cruz Car Rental', remarks: 'Thanks!' },
        { bookingNo: 'BK-2025-00011', vehicle: 'Mitsubishi Xpander', rentalDates: 'May 10 - May 12, 2025', rentalForm: 'With Driver', status: 'Completed', feeStatus: 'Paid', lessor: 'West Drive', remarks: 'Recommended driver.' },
        { bookingNo: 'BK-2025-00010', vehicle: 'Toyota Innova', rentalDates: 'May 10 - May 12, 2025', rentalForm: 'Self Drive', status: 'Completed', feeStatus: 'Paid', lessor: 'Palawan Wheels Rental', remarks: 'Good renter.' }
      ],
      reviews: [
        { lessor: 'Juan Dela Cruz Car Rental', rating: 5, date: 'Jun 03, 2025', vehicle: 'Toyota Vios', comment: 'Returned the vehicle on time. Very responsible renter.' },
        { lessor: 'Island Ride PH', rating: 4, date: 'May 22, 2025', vehicle: 'Mitsubishi Xpander', comment: 'Good communication and easy to coordinate with.' },
        { lessor: 'Palawan Wheels Rental', rating: 5, date: 'May 12, 2025', vehicle: 'Toyota Innova', comment: 'Vehicle returned clean. Recommended.' }
      ],
      notes: [
        { source: 'Renter', createdBy: 'Juan Dela Cruz', createdAt: 'Jul 10, 2026 08:41 AM', message: 'Uploaded new documents and previous rental references.' },
        { source: 'System', createdBy: 'FamBridge API', createdAt: 'Jul 10, 2026 08:41 AM', message: 'Renter approval request was submitted for lessor review.' }
      ]
    },
    {
      id: 2,
      renterName: 'Maria Santos',
      trustId: 'TR-K81P2LM9',
      email: 'maria.santos@email.com',
      mobile: '+63 918 555 2211',
      trustScore: 91,
      uploadedDocuments: 11,
      verifiedDocuments: 10,
      requirementGroups: 4,
      completedBookings: 18,
      previousReferences: 5,
      averageRating: 4.9,
      reviewCount: 12,
      approvalStatus: 'Approved',
      submittedDate: 'Jul 16, 2026 10:12 AM',
      documents: [
        {
          id: 1,
          title: 'Driver License',
          icon: '🚗',
          description: 'Required valid driver license.',
          acceptedTypes: ['DRIVER_LICENSE'],
          status: 'Verified',
          latestFileName: 'Driver License.jpg',
          latestUploadedAt: 'Jul 16, 2026 10:00 AM',
          latestRemarks: 'Valid and readable.',
          latestThumbnail: '🪪',
          history: [
            { id: 101, thumbnail: '🪪', fileName: 'Driver License.jpg', dateTime: 'Jul 16, 2026 10:00 AM', status: 'Verified', user: 'Lessor Admin', remarks: 'Valid license. Clear image.' },
            { id: 102, thumbnail: '🪪', fileName: 'Driver License Old.jpg', dateTime: 'Jul 15, 2026 04:20 PM', status: 'Uploaded', user: 'Maria Santos', remarks: 'Initial upload.' }
          ]
        },
        {
          id: 2,
          title: 'Any Government ID',
          icon: '🪪',
          description: 'Accepted: SSS, GSIS, UMID, National ID, PRC.',
          acceptedTypes: ['SSS_ID', 'GSIS_ID', 'UMID_ID', 'NATIONAL_ID', 'PRC_ID', 'PASSPORT', 'PHILHEALTH_ID', 'VOTER_ID', 'POSTAL_ID'],
          status: 'Verified',
          latestFileName: 'Passport.jpg',
          latestUploadedAt: 'Jul 16, 2026 10:03 AM',
          latestRemarks: 'Passport verified.',
          latestThumbnail: '🛂',
          history: [
            { id: 201, thumbnail: '🛂', fileName: 'Passport.jpg', dateTime: 'Jul 16, 2026 10:03 AM', status: 'Verified', user: 'Lessor Admin', remarks: 'Passport is valid and readable.' },
            { id: 202, thumbnail: '🪪', fileName: 'National ID.jpg', dateTime: 'Jul 15, 2026 05:10 PM', status: 'Uploaded', user: 'Maria Santos', remarks: 'Backup ID uploaded.' }
          ]
        },
        {
          id: 3,
          title: 'Proof of Address',
          icon: '🏠',
          description: 'Utility bill, bank statement, barangay certificate, or rent agreement.',
          acceptedTypes: ['UTILITY_BILL', 'BANK_STATEMENT', 'BARANGAY_CERTIFICATE', 'RENT_AGREEMENT'],
          status: 'Verified',
          latestFileName: 'Barangay Certificate.pdf',
          latestUploadedAt: 'Jul 16, 2026 10:05 AM',
          latestRemarks: 'Address matches renter profile.',
          latestThumbnail: '📄',
          history: [
            { id: 301, thumbnail: '📄', fileName: 'Barangay Certificate.pdf', dateTime: 'Jul 16, 2026 10:05 AM', status: 'Verified', user: 'Lessor Admin', remarks: 'Address verified.' }
          ]
        },
        {
          id: 4,
          title: 'Selfie Verification',
          icon: '📷',
          description: 'Selfie photo used to match submitted documents.',
          acceptedTypes: ['SELFIE_VERIFICATION'],
          status: 'Verified',
          latestFileName: 'Selfie Verification.jpg',
          latestUploadedAt: 'Jul 16, 2026 10:08 AM',
          latestRemarks: 'Face matches submitted ID.',
          latestThumbnail: '🙂',
          history: [
            { id: 401, thumbnail: '🙂', fileName: 'Selfie Verification.jpg', dateTime: 'Jul 16, 2026 10:08 AM', status: 'Verified', user: 'Lessor Admin', remarks: 'Face matched with passport photo.' }
          ]
        }
      ],
      bookingHistory: [
        { bookingNo: 'BK-2026-00122', vehicle: 'Toyota Vios', rentalDates: 'Jul 01 - Jul 02, 2026', rentalForm: 'Self Drive', status: 'Completed', feeStatus: 'Paid', lessor: 'JD Car Rental', remarks: 'Returned on time.' },
        { bookingNo: 'BK-2026-00108', vehicle: 'Honda City', rentalDates: 'Jun 14 - Jun 16, 2026', rentalForm: 'Self Drive', status: 'Completed', feeStatus: 'Paid', lessor: 'Cebu City Car Rentals', remarks: 'Clean return.' },
        { bookingNo: 'BK-2026-00091', vehicle: 'Toyota Innova', rentalDates: 'May 20 - May 22, 2026', rentalForm: 'With Driver', status: 'Completed', feeStatus: 'Paid', lessor: 'Island Ride PH', remarks: 'Good coordination.' }
      ],
      reviews: [
        { lessor: 'JD Car Rental', rating: 5, date: 'Jul 02, 2026', vehicle: 'Toyota Vios', comment: 'Excellent renter. Returned the vehicle on time.' },
        { lessor: 'Cebu City Car Rentals', rating: 5, date: 'Jun 16, 2026', vehicle: 'Honda City', comment: 'Very responsive and responsible.' },
        { lessor: 'Island Ride PH', rating: 5, date: 'May 22, 2026', vehicle: 'Toyota Innova', comment: 'Smooth transaction.' }
      ],
      notes: [
        { source: 'System', createdBy: 'FamBridge API', createdAt: 'Jul 16, 2026 10:12 AM', message: 'Renter approval request was submitted.' },
        { source: 'Lessor', createdBy: 'Lessor Admin', createdAt: 'Jul 16, 2026 11:05 AM', message: 'Renter approved. Documents are valid and previous rental records are good.' }
      ]
    },
    {
      id: 3,
      renterName: 'Mark Reyes',
      trustId: 'TR-M22RTY8',
      email: 'mark.reyes@email.com',
      mobile: '+63 919 222 8844',
      trustScore: 58,
      uploadedDocuments: 6,
      verifiedDocuments: 2,
      requirementGroups: 4,
      completedBookings: 1,
      previousReferences: 0,
      averageRating: 3.8,
      reviewCount: 1,
      approvalStatus: 'Need More Documents',
      submittedDate: 'Jul 20, 2026 03:20 PM',
      documents: [
        {
          id: 1,
          title: 'Driver License',
          icon: '🚗',
          description: 'Required valid driver license.',
          acceptedTypes: ['DRIVER_LICENSE'],
          status: 'Needs Review',
          latestFileName: 'Driver License - Retry.jpg',
          latestUploadedAt: 'Jul 20, 2026 03:10 PM',
          latestRemarks: 'Image is still slightly blurry.',
          latestThumbnail: '🪪',
          history: [
            { id: 111, thumbnail: '🪪', fileName: 'Driver License - Retry.jpg', dateTime: 'Jul 20, 2026 03:10 PM', status: 'Uploaded', user: 'Mark Reyes', remarks: 'Resubmitted license.' },
            { id: 112, thumbnail: '🪪', fileName: 'Driver License.jpg', dateTime: 'Jul 20, 2026 02:45 PM', status: 'Rejected', user: 'Lessor Admin', remarks: 'Text is unreadable.' }
          ]
        },
        {
          id: 2,
          title: 'Any Government ID',
          icon: '🪪',
          description: 'Accepted: SSS, GSIS, UMID, National ID, PRC.',
          acceptedTypes: ['SSS_ID', 'GSIS_ID', 'UMID_ID', 'NATIONAL_ID', 'PRC_ID', 'PASSPORT', 'PHILHEALTH_ID', 'VOTER_ID', 'POSTAL_ID'],
          status: 'Needs Review',
          latestFileName: 'UMID ID.jpg',
          latestUploadedAt: 'Jul 20, 2026 03:12 PM',
          latestRemarks: 'Needs manual review.',
          latestThumbnail: '🪪',
          history: [
            { id: 211, thumbnail: '🪪', fileName: 'UMID ID.jpg', dateTime: 'Jul 20, 2026 03:12 PM', status: 'Uploaded', user: 'Mark Reyes', remarks: 'Uploaded UMID.' }
          ]
        },
        {
          id: 3,
          title: 'Proof of Address',
          icon: '🏠',
          description: 'Utility bill, bank statement, barangay certificate, or rent agreement.',
          acceptedTypes: ['UTILITY_BILL', 'BANK_STATEMENT', 'BARANGAY_CERTIFICATE', 'RENT_AGREEMENT'],
          status: 'Needs Review',
          latestFileName: 'Bank Statement.pdf',
          latestUploadedAt: 'Jul 20, 2026 03:15 PM',
          latestRemarks: 'Address is partially visible.',
          latestThumbnail: '📄',
          history: [
            { id: 311, thumbnail: '📄', fileName: 'Bank Statement.pdf', dateTime: 'Jul 20, 2026 03:15 PM', status: 'Uploaded', user: 'Mark Reyes', remarks: 'New proof of address uploaded.' }
          ]
        },
        {
          id: 4,
          title: 'Selfie Verification',
          icon: '📷',
          description: 'Selfie photo used to match submitted documents.',
          acceptedTypes: ['SELFIE_VERIFICATION'],
          status: 'Verified',
          latestFileName: 'Selfie.jpg',
          latestUploadedAt: 'Jul 20, 2026 03:17 PM',
          latestRemarks: 'Face is visible.',
          latestThumbnail: '🙂',
          history: [
            { id: 411, thumbnail: '🙂', fileName: 'Selfie.jpg', dateTime: 'Jul 20, 2026 03:17 PM', status: 'Verified', user: 'Lessor Admin', remarks: 'Selfie is clear.' }
          ]
        }
      ],
      bookingHistory: [
        { bookingNo: 'BK-2026-00041', vehicle: 'Toyota Hiace', rentalDates: 'Apr 02 - Apr 04, 2026', rentalForm: 'With Driver', status: 'Completed', feeStatus: 'Paid', lessor: 'Palawan Wheels Rental', remarks: 'First rental completed.' }
      ],
      reviews: [
        { lessor: 'Palawan Wheels Rental', rating: 4, date: 'Apr 04, 2026', vehicle: 'Toyota Hiace', comment: 'Okay renter, but document submission needs improvement.' }
      ],
      notes: [
        { source: 'System', createdBy: 'FamBridge API', createdAt: 'Jul 20, 2026 03:20 PM', message: 'Renter approval request was submitted with documents needing review.' },
        { source: 'Lessor', createdBy: 'Lessor Admin', createdAt: 'Jul 20, 2026 04:15 PM', message: 'Requested clearer driver license and complete proof of address.' }
      ]
    },
    {
      id: 4,
      renterName: 'Ana Lim',
      trustId: 'TR-X70LPA2',
      email: 'ana.lim@email.com',
      mobile: '+63 916 777 3312',
      trustScore: 42,
      uploadedDocuments: 4,
      verifiedDocuments: 0,
      requirementGroups: 4,
      completedBookings: 0,
      previousReferences: 0,
      averageRating: 0,
      reviewCount: 0,
      approvalStatus: 'Rejected',
      submittedDate: 'Jul 22, 2026 01:15 PM',
      documents: [
        {
          id: 1,
          title: 'Driver License',
          icon: '🚗',
          description: 'Required valid driver license.',
          acceptedTypes: ['DRIVER_LICENSE'],
          status: 'Needs Review',
          latestFileName: 'Driver License.jpg',
          latestUploadedAt: 'Jul 22, 2026 01:10 PM',
          latestRemarks: 'Document does not match renter information.',
          latestThumbnail: '🪪',
          history: [
            { id: 121, thumbnail: '🪪', fileName: 'Driver License.jpg', dateTime: 'Jul 22, 2026 01:10 PM', status: 'Rejected', user: 'Lessor Admin', remarks: 'Name does not match renter profile.' }
          ]
        },
        {
          id: 2,
          title: 'Any Government ID',
          icon: '🪪',
          description: 'Accepted: SSS, GSIS, UMID, National ID, PRC.',
          acceptedTypes: ['SSS_ID', 'GSIS_ID', 'UMID_ID', 'NATIONAL_ID', 'PRC_ID', 'PASSPORT', 'PHILHEALTH_ID', 'VOTER_ID', 'POSTAL_ID'],
          status: 'Needs Review',
          latestFileName: 'Postal ID.jpg',
          latestUploadedAt: 'Jul 22, 2026 01:11 PM',
          latestRemarks: 'Document is expired.',
          latestThumbnail: '🪪',
          history: [
            { id: 221, thumbnail: '🪪', fileName: 'Postal ID.jpg', dateTime: 'Jul 22, 2026 01:11 PM', status: 'Rejected', user: 'Lessor Admin', remarks: 'Expired Postal ID.' }
          ]
        },
        {
          id: 3,
          title: 'Proof of Address',
          icon: '🏠',
          description: 'Utility bill, bank statement, barangay certificate, or rent agreement.',
          acceptedTypes: ['UTILITY_BILL', 'BANK_STATEMENT', 'BARANGAY_CERTIFICATE', 'RENT_AGREEMENT'],
          status: 'Needs Review',
          latestFileName: 'Proof of Address.jpg',
          latestUploadedAt: 'Jul 22, 2026 01:12 PM',
          latestRemarks: 'Address does not match profile.',
          latestThumbnail: '📄',
          history: [
            { id: 321, thumbnail: '📄', fileName: 'Proof of Address.jpg', dateTime: 'Jul 22, 2026 01:12 PM', status: 'Rejected', user: 'Lessor Admin', remarks: 'Address mismatch.' }
          ]
        },
        {
          id: 4,
          title: 'Selfie Verification',
          icon: '📷',
          description: 'Selfie photo used to match submitted documents.',
          acceptedTypes: ['SELFIE_VERIFICATION'],
          status: 'Needs Review',
          latestFileName: 'Selfie.jpg',
          latestUploadedAt: 'Jul 22, 2026 01:13 PM',
          latestRemarks: 'Face does not clearly match ID.',
          latestThumbnail: '🙂',
          history: [
            { id: 421, thumbnail: '🙂', fileName: 'Selfie.jpg', dateTime: 'Jul 22, 2026 01:13 PM', status: 'Rejected', user: 'Lessor Admin', remarks: 'Face mismatch concern.' }
          ]
        }
      ],
      bookingHistory: [],
      reviews: [],
      notes: [
        { source: 'System', createdBy: 'FamBridge API', createdAt: 'Jul 22, 2026 01:15 PM', message: 'Renter approval request was submitted.' },
        { source: 'Lessor', createdBy: 'Lessor Admin', createdAt: 'Jul 22, 2026 02:10 PM', message: 'Renter rejected due to document mismatch and expired ID.' }
      ]
    },
    {
      id: 5,
      renterName: 'Carlo Mendoza',
      trustId: 'TR-C55MNQ1',
      email: 'carlo.mendoza@email.com',
      mobile: '+63 920 345 7789',
      trustScore: 74,
      uploadedDocuments: 9,
      verifiedDocuments: 6,
      requirementGroups: 4,
      completedBookings: 6,
      previousReferences: 2,
      averageRating: 4.3,
      reviewCount: 4,
      approvalStatus: 'Pending Approval',
      submittedDate: 'Jul 24, 2026 09:30 AM',
      documents: [
        {
          id: 1,
          title: 'Driver License',
          icon: '🚗',
          description: 'Required valid driver license.',
          acceptedTypes: ['DRIVER_LICENSE'],
          status: 'Verified',
          latestFileName: 'Driver License.jpg',
          latestUploadedAt: 'Jul 24, 2026 09:10 AM',
          latestRemarks: 'License verified.',
          latestThumbnail: '🪪',
          history: [
            { id: 131, thumbnail: '🪪', fileName: 'Driver License.jpg', dateTime: 'Jul 24, 2026 09:10 AM', status: 'Verified', user: 'Lessor Admin', remarks: 'License verified.' },
            { id: 132, thumbnail: '🪪', fileName: 'Driver License blurred.jpg', dateTime: 'Jul 24, 2026 08:58 AM', status: 'Rejected', user: 'Lessor Admin', remarks: 'Photo was too dark.' }
          ]
        },
        {
          id: 2,
          title: 'Any Government ID',
          icon: '🪪',
          description: 'Accepted: SSS, GSIS, UMID, National ID, PRC.',
          acceptedTypes: ['SSS_ID', 'GSIS_ID', 'UMID_ID', 'NATIONAL_ID', 'PRC_ID', 'PASSPORT', 'PHILHEALTH_ID', 'VOTER_ID', 'POSTAL_ID'],
          status: 'Verified',
          latestFileName: 'SSS ID.jpg',
          latestUploadedAt: 'Jul 24, 2026 09:12 AM',
          latestRemarks: 'Readable SSS ID.',
          latestThumbnail: '🪪',
          history: [
            { id: 231, thumbnail: '🪪', fileName: 'SSS ID.jpg', dateTime: 'Jul 24, 2026 09:12 AM', status: 'Verified', user: 'Lessor Admin', remarks: 'SSS ID verified.' }
          ]
        },
        {
          id: 3,
          title: 'Proof of Address',
          icon: '🏠',
          description: 'Utility bill, bank statement, barangay certificate, or rent agreement.',
          acceptedTypes: ['UTILITY_BILL', 'BANK_STATEMENT', 'BARANGAY_CERTIFICATE', 'RENT_AGREEMENT'],
          status: 'Needs Review',
          latestFileName: 'Meralco Bill.jpg',
          latestUploadedAt: 'Jul 24, 2026 09:14 AM',
          latestRemarks: 'Needs manual checking.',
          latestThumbnail: '📄',
          history: [
            { id: 331, thumbnail: '📄', fileName: 'Meralco Bill.jpg', dateTime: 'Jul 24, 2026 09:14 AM', status: 'Uploaded', user: 'Carlo Mendoza', remarks: 'Uploaded utility bill.' }
          ]
        },
        {
          id: 4,
          title: 'Selfie Verification',
          icon: '📷',
          description: 'Selfie photo used to match submitted documents.',
          acceptedTypes: ['SELFIE_VERIFICATION'],
          status: 'Verified',
          latestFileName: 'Selfie Verification.jpg',
          latestUploadedAt: 'Jul 24, 2026 09:16 AM',
          latestRemarks: 'Selfie is clear.',
          latestThumbnail: '🙂',
          history: [
            { id: 431, thumbnail: '🙂', fileName: 'Selfie Verification.jpg', dateTime: 'Jul 24, 2026 09:16 AM', status: 'Verified', user: 'Lessor Admin', remarks: 'Selfie verified.' }
          ]
        }
      ],
      bookingHistory: [
        { bookingNo: 'BK-2026-00150', vehicle: 'Toyota Fortuner', rentalDates: 'Jul 05 - Jul 07, 2026', rentalForm: 'Self Drive', status: 'Completed', feeStatus: 'Paid', lessor: 'North Drive PH', remarks: 'Good renter.' },
        { bookingNo: 'BK-2026-00112', vehicle: 'Mitsubishi Mirage', rentalDates: 'Jun 11 - Jun 12, 2026', rentalForm: 'Self Drive', status: 'Cancelled', feeStatus: 'Refunded', lessor: 'City Wheels', remarks: 'Cancelled early but informed ahead.' }
      ],
      reviews: [
        { lessor: 'North Drive PH', rating: 4, date: 'Jul 07, 2026', vehicle: 'Toyota Fortuner', comment: 'Returned on time, minor interior cleaning needed.' },
        { lessor: 'City Wheels', rating: 4, date: 'Jun 12, 2026', vehicle: 'Mitsubishi Mirage', comment: 'Good communication despite cancellation.' }
      ],
      notes: [
        { source: 'Renter', createdBy: 'Carlo Mendoza', createdAt: 'Jul 24, 2026 09:30 AM', message: 'Submitted updated documents for approval.' },
        { source: 'System', createdBy: 'FamBridge API', createdAt: 'Jul 24, 2026 09:31 AM', message: 'Renter approval request is pending lessor review.' }
      ]
    },
    {
      id: 6,
      renterName: 'Rhea Gonzales',
      trustId: 'TR-R88GZN7',
      email: 'rhea.gonzales@email.com',
      mobile: '+63 921 456 9900',
      trustScore: 88,
      uploadedDocuments: 13,
      verifiedDocuments: 11,
      requirementGroups: 4,
      completedBookings: 9,
      previousReferences: 4,
      averageRating: 4.8,
      reviewCount: 6,
      approvalStatus: 'Pending Approval',
      submittedDate: 'Jul 25, 2026 11:05 AM',
      documents: [
        {
          id: 1,
          title: 'Driver License',
          icon: '🚗',
          description: 'Required valid driver license.',
          acceptedTypes: ['DRIVER_LICENSE'],
          status: 'Verified',
          latestFileName: 'Driver License 2026.jpg',
          latestUploadedAt: 'Jul 25, 2026 10:40 AM',
          latestRemarks: 'Valid non-professional license.',
          latestThumbnail: '🪪',
          history: [
            { id: 141, thumbnail: '🪪', fileName: 'Driver License 2026.jpg', dateTime: 'Jul 25, 2026 10:40 AM', status: 'Verified', user: 'Lessor Admin', remarks: 'Valid non-professional license.' }
          ]
        },
        {
          id: 2,
          title: 'Any Government ID',
          icon: '🪪',
          description: 'Accepted: SSS, GSIS, UMID, National ID, PRC.',
          acceptedTypes: ['SSS_ID', 'GSIS_ID', 'UMID_ID', 'NATIONAL_ID', 'PRC_ID', 'PASSPORT', 'PHILHEALTH_ID', 'VOTER_ID', 'POSTAL_ID'],
          status: 'Verified',
          latestFileName: 'National ID.jpg',
          latestUploadedAt: 'Jul 25, 2026 10:43 AM',
          latestRemarks: 'National ID verified.',
          latestThumbnail: '🪪',
          history: [
            { id: 241, thumbnail: '🪪', fileName: 'National ID.jpg', dateTime: 'Jul 25, 2026 10:43 AM', status: 'Verified', user: 'Lessor Admin', remarks: 'National ID verified.' },
            { id: 242, thumbnail: '🪪', fileName: 'Passport.jpg', dateTime: 'Jul 25, 2026 10:38 AM', status: 'Uploaded', user: 'Rhea Gonzales', remarks: 'Additional backup ID.' }
          ]
        },
        {
          id: 3,
          title: 'Proof of Address',
          icon: '🏠',
          description: 'Utility bill, bank statement, barangay certificate, or rent agreement.',
          acceptedTypes: ['UTILITY_BILL', 'BANK_STATEMENT', 'BARANGAY_CERTIFICATE', 'RENT_AGREEMENT'],
          status: 'Verified',
          latestFileName: 'Bank Statement.pdf',
          latestUploadedAt: 'Jul 25, 2026 10:45 AM',
          latestRemarks: 'Address confirmed.',
          latestThumbnail: '📄',
          history: [
            { id: 341, thumbnail: '📄', fileName: 'Bank Statement.pdf', dateTime: 'Jul 25, 2026 10:45 AM', status: 'Verified', user: 'Lessor Admin', remarks: 'Address confirmed.' },
            { id: 342, thumbnail: '📄', fileName: 'Utility Bill.jpg', dateTime: 'Jul 24, 2026 04:25 PM', status: 'Rejected', user: 'Lessor Admin', remarks: 'Bill is more than 3 months old.' }
          ]
        },
        {
          id: 4,
          title: 'Selfie Verification',
          icon: '📷',
          description: 'Selfie photo used to match submitted documents.',
          acceptedTypes: ['SELFIE_VERIFICATION'],
          status: 'Verified',
          latestFileName: 'Selfie Verification.jpg',
          latestUploadedAt: 'Jul 25, 2026 10:48 AM',
          latestRemarks: 'Face matches submitted IDs.',
          latestThumbnail: '🙂',
          history: [
            { id: 441, thumbnail: '🙂', fileName: 'Selfie Verification.jpg', dateTime: 'Jul 25, 2026 10:48 AM', status: 'Verified', user: 'Lessor Admin', remarks: 'Face matches submitted IDs.' }
          ]
        }
      ],
      bookingHistory: [
        { bookingNo: 'BK-2026-00171', vehicle: 'Honda BR-V', rentalDates: 'Jul 12 - Jul 15, 2026', rentalForm: 'Self Drive', status: 'Completed', feeStatus: 'Paid', lessor: 'Palawan Wheels Rental', remarks: 'Excellent renter.' },
        { bookingNo: 'BK-2026-00138', vehicle: 'Toyota Wigo', rentalDates: 'Jun 22 - Jun 23, 2026', rentalForm: 'Self Drive', status: 'Completed', feeStatus: 'Paid', lessor: 'Island Ride PH', remarks: 'Returned clean.' }
      ],
      reviews: [
        { lessor: 'Palawan Wheels Rental', rating: 5, date: 'Jul 15, 2026', vehicle: 'Honda BR-V', comment: 'Very careful driver and responsive.' },
        { lessor: 'Island Ride PH', rating: 5, date: 'Jun 23, 2026', vehicle: 'Toyota Wigo', comment: 'Smooth transaction and clean return.' }
      ],
      notes: [
        { source: 'Renter', createdBy: 'Rhea Gonzales', createdAt: 'Jul 25, 2026 11:05 AM', message: 'Submitted complete documents and rental references.' },
        { source: 'System', createdBy: 'FamBridge API', createdAt: 'Jul 25, 2026 11:06 AM', message: 'Renter approval request submitted with high trust profile.' }
      ]
    }
  ];

  selectedRecord: RenterApprovalRecord | null = null;
  lastViewedRenterId: number | null = null;
  returningRenterId: number | null = null;

  selectedDocumentGroup: DocumentGroup | null = null;
  selectedUploadHistory: UploadHistoryItem | null = null;
  documentZoom = 1;
  documentPanX = 0;
  documentPanY = 0;
  isDocumentPanning = false;
  documentPanStartX = 0;
  documentPanStartY = 0;
  showDocumentRejectBox = false;
  documentRejectRemarks = '';

  get filteredRecords(): RenterApprovalRecord[] {
    const keyword = this.searchText.toLowerCase().trim();

    return this.records.filter(record => {
      const matchSearch =
        !keyword ||
        record.renterName.toLowerCase().includes(keyword) ||
        record.trustId.toLowerCase().includes(keyword) ||
        record.email.toLowerCase().includes(keyword) ||
        record.mobile.toLowerCase().includes(keyword);

      const matchStatus = this.selectedStatus === 'All' || record.approvalStatus === this.selectedStatus;
      return matchSearch && matchStatus;
    });
  }

  get pendingCount(): number {
    return this.records.filter(item => item.approvalStatus === 'Pending Approval').length;
  }

  get approvedCount(): number {
    return this.records.filter(item => item.approvalStatus === 'Approved').length;
  }

  get needMoreDocsCount(): number {
    return this.records.filter(item => item.approvalStatus === 'Need More Documents').length;
  }

  get rejectedCount(): number {
    return this.records.filter(item => item.approvalStatus === 'Rejected').length;
  }

  get documentRejectCharacterCount(): number {
    return this.documentRejectRemarks.trim().length;
  }

  get canProceedDocumentReject(): boolean {
    return this.documentRejectCharacterCount >= 50;
  }

  get averageRatingBreakdown() {
    return {
      cleanliness: 4.8,
      communication: 4.6,
      paymentReliability: 5.0,
      vehicleCare: 4.5,
      punctuality: 4.8
    };
  }

  selectRecord(record: RenterApprovalRecord): void {
    this.selectedRecord = record;
    this.lastViewedRenterId = record.id;
    this.returningRenterId = null;
    this.activeTab = 'documents';

    setTimeout(() => {
      document
        .getElementById('renterDetailSection')
        ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  }

  backToRenterList(): void {
    const renterId = this.lastViewedRenterId;

    this.selectedRecord = null;
    this.returningRenterId = renterId;

    setTimeout(() => {
      document
        .getElementById(renterId ? `renter-card-${renterId}` : 'renterApprovalList')
        ?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 120);

    setTimeout(() => {
      this.returningRenterId = null;
    }, 1800);
  }

  selectTab(tab: DetailTab): void {
    this.activeTab = tab;
  }

  getStars(rating: number): string {
    return '★'.repeat(Math.round(rating));
  }

  approveRenter(): void {
    if (!this.selectedRecord) return;
    this.selectedRecord.approvalStatus = 'Approved';
  }

  requestMoreDocuments(): void {
    if (!this.selectedRecord) return;
    this.selectedRecord.approvalStatus = 'Need More Documents';
  }

  rejectRenter(): void {
    if (!this.selectedRecord) return;
    this.selectedRecord.approvalStatus = 'Rejected';
  }

  openDocumentViewer(group: DocumentGroup, upload?: UploadHistoryItem): void {
    this.selectedDocumentGroup = group;
    this.selectedUploadHistory = upload || group.history[0] || null;
    this.resetDocumentViewerState();
  }

  closeDocumentViewer(): void {
    this.selectedDocumentGroup = null;
    this.selectedUploadHistory = null;
    this.resetDocumentViewerState();
  }

  zoomInDocument(): void {
    this.documentZoom = Math.min(this.documentZoom + 0.2, 3);
  }

  zoomOutDocument(): void {
    this.documentZoom = Math.max(this.documentZoom - 0.2, 0.6);
  }

  resetDocumentZoomAndPan(): void {
    this.documentZoom = 1;
    this.documentPanX = 0;
    this.documentPanY = 0;
  }

  startDocumentPan(event: MouseEvent): void {
    if (!this.selectedUploadHistory) return;

    event.preventDefault();
    this.isDocumentPanning = true;
    this.documentPanStartX = event.clientX - this.documentPanX;
    this.documentPanStartY = event.clientY - this.documentPanY;
  }

  moveDocumentPan(event: MouseEvent): void {
    if (!this.isDocumentPanning) return;

    this.documentPanX = event.clientX - this.documentPanStartX;
    this.documentPanY = event.clientY - this.documentPanStartY;
  }

  stopDocumentPan(): void {
    this.isDocumentPanning = false;
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
    if (!this.selectedRecord || !this.selectedDocumentGroup || !this.selectedUploadHistory) return;

    this.selectedUploadHistory.status = 'Verified';
    this.selectedUploadHistory.user = 'Current User';
    this.selectedUploadHistory.remarks = 'Document verified by lessor.';

    this.selectedDocumentGroup.status = 'Verified';
    this.selectedDocumentGroup.latestRemarks = this.selectedUploadHistory.remarks;
    this.selectedDocumentGroup.latestFileName = this.selectedUploadHistory.fileName;
    this.selectedDocumentGroup.latestUploadedAt = this.selectedUploadHistory.dateTime;
    this.selectedDocumentGroup.latestThumbnail = this.selectedUploadHistory.thumbnail;

    this.selectedRecord.notes = [
      ...this.selectedRecord.notes,
      {
        source: 'Lessor',
        createdBy: 'Current User',
        createdAt: 'Today',
        message: `Document verified: ${this.selectedDocumentGroup.title} - ${this.selectedUploadHistory.fileName}.`
      },
      {
        source: 'System',
        createdBy: 'FamBridge API',
        createdAt: 'Today',
        message: `Document group status changed to Verified for ${this.selectedDocumentGroup.title}.`
      }
    ];

    this.refreshDocumentCounts(this.selectedRecord);
    this.showDocumentRejectBox = false;
    this.documentRejectRemarks = '';
  }

  startRejectSelectedDocument(): void {
    if (!this.selectedDocumentGroup || !this.selectedUploadHistory) return;

    this.showDocumentRejectBox = true;
    this.documentRejectRemarks = '';
  }

  proceedRejectSelectedDocument(): void {
    if (
      !this.selectedRecord ||
      !this.selectedDocumentGroup ||
      !this.selectedUploadHistory ||
      !this.canProceedDocumentReject
    ) {
      return;
    }

    const remarks = this.documentRejectRemarks.trim();

    this.selectedUploadHistory.status = 'Rejected';
    this.selectedUploadHistory.user = 'Current User';
    this.selectedUploadHistory.remarks = remarks;

    this.selectedDocumentGroup.status = 'Rejected';
    this.selectedDocumentGroup.latestRemarks = remarks;
    this.selectedDocumentGroup.latestFileName = this.selectedUploadHistory.fileName;
    this.selectedDocumentGroup.latestUploadedAt = this.selectedUploadHistory.dateTime;
    this.selectedDocumentGroup.latestThumbnail = this.selectedUploadHistory.thumbnail;

    this.selectedRecord.notes = [
      ...this.selectedRecord.notes,
      {
        source: 'Lessor',
        createdBy: 'Current User',
        createdAt: 'Today',
        message: `Document rejected: ${this.selectedDocumentGroup.title} - ${this.selectedUploadHistory.fileName}. Reason: ${remarks}`
      },
      {
        source: 'System',
        createdBy: 'FamBridge API',
        createdAt: 'Today',
        message: `Document group status changed to Rejected for ${this.selectedDocumentGroup.title}. Rejection remarks met the minimum 50-character requirement.`
      }
    ];

    this.refreshDocumentCounts(this.selectedRecord);
    this.showDocumentRejectBox = false;
    this.documentRejectRemarks = '';
  }

  cancelDocumentReject(): void {
    this.showDocumentRejectBox = false;
    this.documentRejectRemarks = '';
  }

  private resetDocumentViewerState(): void {
    this.documentZoom = 1;
    this.documentPanX = 0;
    this.documentPanY = 0;
    this.isDocumentPanning = false;
    this.showDocumentRejectBox = false;
    this.documentRejectRemarks = '';
  }

  private refreshDocumentCounts(record: RenterApprovalRecord): void {
    record.uploadedDocuments = record.documents.reduce((total, group) => total + group.history.length, 0);
    record.verifiedDocuments = record.documents.reduce(
      (total, group) => total + group.history.filter(item => item.status === 'Verified').length,
      0
    );
  }
}
