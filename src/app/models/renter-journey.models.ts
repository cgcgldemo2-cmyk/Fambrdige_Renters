export interface RenterSearchContext {
  code?: string;
  pickupLocationId?: number | null;
  pickupLocation: string;
  pickupCity: string;
  pickupDate: string;
  pickupTime: string;
  returnDate: string;
  returnTime: string;
  rentalDays: number;
  rentalType: string;
}

export interface RenterVehicleSnapshot {
  id: number;
  name: string;
  make: string;
  imageUrl: string | null;
  vehicleType: string;
  seats: number;
  transmission: string;
  fuelType: string;
  rentalType: string;
  dailyPrice: number;
  estimatedTotal: number;
  pickupAddress: string;
  badge: string | null;
}

export interface RenterVehicleSelection {
  vehicle: RenterVehicleSnapshot;
  search: RenterSearchContext;
}

export type RenterBookingStatus =
  | 'Pending Lessor Approval'
  | 'Approved'
  | 'Completed'
  | 'Cancelled'
  | 'Rejected';

export interface RenterBooking {
  reference: string;
  vehicle: RenterVehicleSnapshot;
  search: RenterSearchContext;
  status: RenterBookingStatus;
  paymentStatus: string;
  requestedAt: string;
  notes: string;
  isMock: boolean;
}

export interface RenterProfile {
  fullName: string;
  email: string;
  mobile: string;
  address: string;
  approvalStatus: string;
  verificationStatus: string;
  documentStatus: string;
}

export interface RentalRequestInput {
  selection: RenterVehicleSelection;
  renter: Pick<RenterProfile, 'fullName' | 'email' | 'mobile'>;
  notes: string;
}

export interface UiMutationResult {
  success: boolean;
  apiPending: boolean;
  message: string;
}
