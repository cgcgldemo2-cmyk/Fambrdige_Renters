export type RentalType = 'with_driver' | 'without_driver';
export type Transmission = 'Automatic' | 'Manual' | '';
export type RentalDuration = '12hrs' | '24hrs' | 'multi_day';
export type PaymentMethod = 'gcash' | 'maya' | 'card' | 'bank_transfer';

export interface VehicleCategory {
  id: string;
  name: string;
  fromPrice: number;
  imageUrl: string;
}

export interface RenterVehicle {
  id: number;
  name: string;
  imageUrl: string;
  carType: string;
  seats: string;
  transmission: 'Automatic' | 'Manual';
  fuelType: string;
  rentalType: RentalType;
  price12hrs: number;
  price24hrs: number;
  withDriverSurcharge12hrs?: number;
  withDriverSurcharge24hrs?: number;
  pickupAddress: string;
  hasInsurance: boolean;
  insuranceCoverages: string[];
  availableDates: string[];
  matchingDates: string[];
  isFullyAvailable: boolean;
  rating: number;
  reviews: number;
  badge?: string;
}

export interface TrustFeature {
  icon: string;
  title: string;
  subtitle: string;
}

export interface BookingStepItem {
  icon: string;
  title: string;
  description: string;
}

export interface TestimonialItem {
  name: string;
  location: string;
  rating: number;
  text: string;
  avatarUrl: string;
}

export interface NewsItem {
  title: string;
  date: string;
  category: string;
  imageUrl: string;
}

export interface FaqItem {
  question: string;
  answer: string;
  open?: boolean;
}

export interface InsuranceCoverageOption {
  value: string;
  label: string;
}

export interface InsuranceCoverageChange {
  coverage: string;
  selected: boolean;
}
