import { AfterViewInit, Component, ElementRef, HostListener, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { gsap } from 'gsap';
import {
  BookingStepItem,
  FaqItem,
  InsuranceCoverageOption,
  NewsItem,
  RentalType,
  RenterVehicle,
  TestimonialItem,
  Transmission,
  TrustFeature,
  VehicleCategory
} from './models/renter-page.models';
import { RenterPublicHeaderComponent } from './components/renter-public-header/renter-public-header.component';
import { RenterHeroComponent } from './components/renter-hero/renter-hero.component';
import { VehicleCategoryShowcaseComponent } from './components/vehicle-category-showcase/vehicle-category-showcase.component';
import { WhyChooseCgicComponent } from './components/why-choose-cgic/why-choose-cgic.component';
import { CgicCareBannerComponent } from './components/cgic-care-banner/cgic-care-banner.component';
import { PopularVehiclesComponent } from './components/popular-vehicles/popular-vehicles.component';
import { RenterTestimonialsComponent } from './components/renter-testimonials/renter-testimonials.component';
import { LatestFromCgicComponent } from './components/latest-from-cgic/latest-from-cgic.component';
import { RenterFaqComponent } from './components/renter-faq/renter-faq.component';
import { RenterFooterComponent } from './components/renter-footer/renter-footer.component';
import { RenterSearchResultsComponent } from './components/renter-search-results/renter-search-results.component';
import { RenterBookingPanelComponent } from './components/renter-booking-panel/renter-booking-panel.component';
import { RenterFiltersComponent } from './renter-filters/renter-filters.component';

@Component({
  selector: 'app-renters',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    RenterPublicHeaderComponent,
    RenterHeroComponent,
    VehicleCategoryShowcaseComponent,
    WhyChooseCgicComponent,
    CgicCareBannerComponent,
    PopularVehiclesComponent,
    RenterTestimonialsComponent,
    LatestFromCgicComponent,
    RenterFaqComponent,
    RenterFooterComponent,
    RenterSearchResultsComponent,
    RenterBookingPanelComponent,
    RenterFiltersComponent
  ],
  templateUrl: './renters.component.html',
  styleUrls: ['./renters.component.scss']
})
export class RentersComponent implements AfterViewInit, OnDestroy {
  pickupLocation = 'Makati City';
  startDate = '2026-05-27';
  endDate = '2026-05-30';
  pickupTime = '10:00';
  returnTime = '10:00';

  rentalType: RentalType = 'with_driver';
  seatOptions: string[] = ['2', '4', '5', '7', '10+'];
  selectedSeats = '';
  selectedCarType = '';
  transmission: Transmission = '';
  showFilters = false;
  isSearching = false;
  hasSearched = false;
  errorMessage = '';
  selectedInsuranceCoverages: string[] = [];
  selectedVehicle: RenterVehicle | null = null;

  readonly defaultCarTypes = [
    'Sedan',
    'Hatchback',
    'SUV',
    'MPV',
    'Van',
    'Pickup',
    'Sports Car',
    'Coaster',
    'Mini Bus',
    'Bus'
  ];

  carTypes: string[] = [...this.defaultCarTypes];

  carTypeBySeats: { [key: string]: string[] } = {
    '2': ['Sports Car'],
    '4': ['Sedan', 'Hatchback', 'SUV', 'MPV', 'Pickup'],
    '5': ['Sedan', 'Hatchback', 'SUV', 'MPV', 'Pickup'],
    '7': ['SUV', 'MPV', 'Van'],
    '10+': ['Van', 'Coaster', 'Mini Bus', 'Bus']
  };

  readonly insuranceCoverageOptions: InsuranceCoverageOption[] = [
    { value: 'Comprehensive Insurance', label: 'Comprehensive Insurance' },
    { value: 'Personal Accident Coverage', label: 'Personal Accident Coverage' },
    { value: 'Third Party Liability Coverage', label: 'Third Party Liability Coverage' },
    { value: 'Acts of Nature Coverage', label: 'Acts of Nature Coverage' }
  ];

  vehicleCategories: VehicleCategory[] = [
    { id: 'sedan', name: 'Sedan', fromPrice: 1500, imageUrl: this.vehicleSvg('Sedan', '#ffffff', '#111827') },
    { id: 'suv', name: 'SUV', fromPrice: 2200, imageUrl: this.vehicleSvg('SUV', '#f8fafc', '#001621') },
    { id: 'hatchback', name: 'Hatchback', fromPrice: 1300, imageUrl: this.vehicleSvg('Hatchback', '#ffffff', '#334155') },
    { id: 'mpv', name: 'MPV', fromPrice: 2100, imageUrl: this.vehicleSvg('MPV', '#f8fafc', '#475569') },
    { id: 'pickup', name: 'Pickup', fromPrice: 2000, imageUrl: this.vehicleSvg('Pickup', '#ffffff', '#0f172a') },
    { id: 'van', name: 'Van', fromPrice: 2500, imageUrl: this.vehicleSvg('Van', '#f8fafc', '#64748b') }
  ];

  trustFeatures: TrustFeature[] = [
    { icon: '🛡', title: 'Verified Vehicles', subtitle: 'Documents and quality checked' },
    { icon: '🏷', title: 'Best Price Guarantee', subtitle: 'Transparent pricing before booking' },
    { icon: '⭐', title: 'Trusted by Renters', subtitle: 'Rated vehicles and lessors' },
    { icon: '🎧', title: '24/7 Support', subtitle: 'Support when you need help' }
  ];

  bookingSteps: BookingStepItem[] = [
    { icon: '🔍', title: 'Find', description: 'Set pickup location and schedule.' },
    { icon: '🚗', title: 'Select', description: 'Choose an available vehicle.' },
    { icon: '📅', title: 'Reserve', description: 'Send your booking request.' },
    { icon: '😊', title: 'Enjoy', description: 'Pick up and enjoy your trip.' }
  ];

  popularVehicles: RenterVehicle[] = [
    this.createVehicle(1, 'Toyota Vios', 'Sedan', '5', 'Automatic', 1800, '#f8fafc', '#334155', 'Popular'),
    this.createVehicle(2, 'Toyota Fortuner', 'SUV', '7', 'Automatic', 3500, '#f1f5f9', '#001621', 'Best Value'),
    this.createVehicle(3, 'Mitsubishi Xpander', 'MPV', '7', 'Automatic', 2200, '#ffffff', '#475569'),
    this.createVehicle(4, 'Toyota Hilux', 'Pickup', '5', 'Manual', 2800, '#f8fafc', '#334155'),
    this.createVehicle(5, 'Toyota Hiace', 'Van', '12', 'Manual', 2500, '#ffffff', '#64748b'),
    this.createVehicle(6, 'Honda City', 'Sedan', '5', 'Automatic', 1900, '#f8fafc', '#0f172a')
  ];

  availableCars: RenterVehicle[] = [];

  testimonials: TestimonialItem[] = [
    {
      name: 'Jessa M.',
      location: 'Manila',
      rating: 5,
      text: 'The car was spotless and the booking was very easy. Perfect for our family trip.',
      avatarUrl: this.avatarSvg('JM', '#fecaca', '#b91c1c')
    },
    {
      name: 'Mark D.',
      location: 'Cebu City',
      rating: 5,
      text: 'Transparent pricing and great support. Highly recommended.',
      avatarUrl: this.avatarSvg('MD', '#dbeafe', '#1d4ed8')
    },
    {
      name: 'Angela R.',
      location: 'Quezon City',
      rating: 5,
      text: 'CGIC gave me peace of mind from start to finish.',
      avatarUrl: this.avatarSvg('AR', '#dcfce7', '#15803d')
    }
  ];

  newsItems: NewsItem[] = [
    { title: 'CGIC Expands to More Cities in 2026', date: 'May 15, 2026', category: 'News', imageUrl: this.newsSvg('City Expansion', '#dbeafe') },
    { title: '5 Tips for a Smooth Car Rental Experience', date: 'May 10, 2026', category: 'Tips', imageUrl: this.newsSvg('Rental Tips', '#ffedd5') },
    { title: 'CGIC Partners with Top Insurers', date: 'May 05, 2026', category: 'Partnership', imageUrl: this.newsSvg('Insurance', '#dcfce7') },
    { title: 'Road Trip Ideas Across the Philippines', date: 'Apr 28, 2026', category: 'Guide', imageUrl: this.newsSvg('Road Trip', '#f1f5f9') }
  ];

  faqs: FaqItem[] = [
    {
      question: 'What are the requirements to rent a car?',
      answer: 'You need a valid government ID, driver license for self-drive, selfie verification, and other documents requested by the lessor.',
      open: true
    },
    {
      question: 'How old do I need to be to rent a vehicle?',
      answer: 'The recommended minimum age is 21 years old. Some lessors may require higher age limits depending on vehicle type.'
    },
    {
      question: 'Can I pick up the car in one location and return in another?',
      answer: 'Yes, if the lessor supports delivery and collection service for those locations.'
    },
    {
      question: 'What happens in case of an accident?',
      answer: 'Contact support and the lessor immediately. Insurance coverage depends on the vehicle and rental agreement.'
    }
  ];

  scrollProgress = 0;

  private gsapContext?: gsap.Context;
  private sectionObserver?: IntersectionObserver;
  private prefersReducedMotion = false;

  constructor(private host: ElementRef<HTMLElement>) {}

  ngAfterViewInit(): void {
    this.prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.updateScrollProgress();
    this.runGsapIntro();
    this.prepareScrollAnimations();
    this.attachMicroInteractions();
  }

  ngOnDestroy(): void {
    this.gsapContext?.revert();
    this.sectionObserver?.disconnect();
  }



  @HostListener('window:scroll')
  onWindowScroll(): void {
    this.updateScrollProgress();
  }

  @HostListener('window:mousemove', ['$event'])
  onPointerMove(event: MouseEvent): void {
    if (this.prefersReducedMotion) {
      return;
    }

    this.host.nativeElement.style.setProperty('--pointer-x', `${event.clientX}px`);
    this.host.nativeElement.style.setProperty('--pointer-y', `${event.clientY}px`);
  }

  get loadedVehicleCount(): number {
    return this.popularVehicles.length;
  }

  get hasInsuranceFilters(): boolean {
    return this.selectedInsuranceCoverages.length > 0;
  }

  get filteredFeaturedVehicles(): RenterVehicle[] {
    return this.popularVehicles.slice(0, 5);
  }

  toggleFilters(): void {
    this.showFilters = !this.showFilters;
  }

  selectAllVehicles(): void {
    this.selectedSeats = '';
    this.selectedCarType = '';
    this.transmission = '';
    this.carTypes = [...this.defaultCarTypes];
    this.resetSearchState();
  }

  setRentalType(type: RentalType): void {
    this.rentalType = type;

    if (type === 'with_driver') {
      this.transmission = '';
    }

    this.resetSearchState();
  }

  selectSeats(seat: string): void {
    this.selectedSeats = this.selectedSeats === seat ? '' : seat;
    this.carTypes = this.selectedSeats
      ? this.carTypeBySeats[this.selectedSeats] || [...this.defaultCarTypes]
      : [...this.defaultCarTypes];
    this.selectedCarType = '';
    this.transmission = '';
    this.resetSearchState();
  }

  selectCarType(type: string): void {
    this.selectedCarType = this.selectedCarType === type ? '' : type;
    this.resetSearchState();
  }

  selectCategory(category: VehicleCategory): void {
    this.selectedCarType = category.name;
    this.scrollToVehicles();
  }

  selectTransmission(transmission: 'Automatic' | 'Manual'): void {
    this.transmission = this.transmission === transmission ? '' : transmission;
    this.resetSearchState();
  }

  toggleInsuranceCoverage(coverage: string, selected: boolean): void {
    this.selectedInsuranceCoverages = selected
      ? Array.from(new Set([...this.selectedInsuranceCoverages, coverage]))
      : this.selectedInsuranceCoverages.filter(item => item !== coverage);
    this.resetSearchState();
  }

  searchCars(): void {
    this.errorMessage = '';

    if (!this.startDate || !this.endDate || !this.pickupTime || !this.returnTime) {
      this.errorMessage = 'Please select pick-up date, return date, and time.';
      return;
    }

    if (`${this.endDate}T${this.returnTime}` <= `${this.startDate}T${this.pickupTime}`) {
      this.errorMessage = 'Return date and time must be later than the pickup date and time.';
      return;
    }

    this.hasSearched = true;
    this.isSearching = true;
    this.selectedVehicle = null;

    setTimeout(() => {
      this.availableCars = this.popularVehicles.filter(vehicle => {
        const matchType = !this.selectedCarType || vehicle.carType === this.selectedCarType;
        const matchSeats = !this.selectedSeats || vehicle.seats === this.selectedSeats || this.selectedSeats === '10+' && Number(vehicle.seats) >= 10;
        const matchTransmission = !this.transmission || vehicle.transmission === this.transmission;
        const matchInsurance = !this.selectedInsuranceCoverages.length || this.selectedInsuranceCoverages.every(item => vehicle.insuranceCoverages.includes(item));

        return matchType && matchSeats && matchTransmission && matchInsurance;
      });

      this.isSearching = false;
      this.scrollToVehicles();
      this.animateSearchResults();
    }, 650);
  }

  openBookingPanel(vehicle: RenterVehicle): void {
    this.selectedVehicle = vehicle;
    setTimeout(() => {
      const panel = this.host.nativeElement.querySelector('#bookingPanel');
      panel?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      this.animateBookingPanel();
    });
  }

  closeBookingPanel(): void {
    this.selectedVehicle = null;
  }

  toggleFaq(index: number): void {
    this.faqs = this.faqs.map((item, itemIndex) => ({
      ...item,
      open: itemIndex === index ? !item.open : false
    }));
  }

  private resetSearchState(): void {
    this.hasSearched = false;
    this.errorMessage = '';
    this.availableCars = [];
    this.selectedVehicle = null;
  }

  private scrollToVehicles(): void {
    setTimeout(() => {
      const results = this.host.nativeElement.querySelector('#vehicleResults');
      results?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  private runGsapIntro(): void {
    if (typeof window === 'undefined' || this.prefersReducedMotion) {
      return;
    }

    this.gsapContext = gsap.context(() => {
      gsap.set(['.gsap-hero-copy > *', '.gsap-hero-car', '.gsap-search', '.hero-arrow', '.payment-strip'], { opacity: 0 });

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.from('.gsap-header', { y: -34, opacity: 0, duration: 0.55 })
        .from('.public-header nav a, .header-actions a', { y: -10, opacity: 0, duration: 0.35, stagger: 0.045 }, '-=0.25')
        .to('.gsap-hero-copy > *', { y: 0, opacity: 1, duration: 0.62, stagger: 0.09 }, '-=0.1')
        .fromTo('.gsap-hero-copy > *', { y: 34 }, { y: 0, duration: 0.62, stagger: 0.09 }, '<')
        .fromTo('.hero-badge', { scale: 0.84, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.48 }, '-=0.35')
        .to('.gsap-hero-car', { x: 0, opacity: 1, scale: 1, rotation: 0, duration: 0.85 }, '-=0.42')
        .fromTo('.gsap-hero-car', { x: 90, scale: 0.92, rotation: -2 }, { x: 0, scale: 1, rotation: 0, duration: 0.85 }, '<')
        .to('.hero-arrow', { opacity: 1, scale: 1, duration: 0.4, stagger: 0.08 }, '-=0.5')
        .to('.gsap-search', { y: 0, opacity: 1, duration: 0.58 }, '-=0.35')
        .fromTo('.gsap-search', { y: 42 }, { y: 0, duration: 0.58 }, '<')
        .from('.summary-pill, .location-pill, .summary-search-btn', { y: 16, opacity: 0, duration: 0.32, stagger: 0.045 }, '-=0.22')
        .to('.payment-strip', { y: 0, opacity: 1, duration: 0.42 }, '-=0.18');

      gsap.to('.car-shape', {
        y: -10,
        rotation: -0.7,
        duration: 3.2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });

      gsap.to('.hero-glow', {
        scale: 1.08,
        opacity: 0.75,
        duration: 2.8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });

      gsap.to('.floating-dot', {
        y: -14,
        duration: 2.4,
        repeat: -1,
        yoyo: true,
        stagger: 0.25,
        ease: 'sine.inOut'
      });
    }, this.host.nativeElement);
  }

  private prepareScrollAnimations(): void {
    if (typeof window === 'undefined' || this.prefersReducedMotion) {
      return;
    }

    const elements = Array.from(this.host.nativeElement.querySelectorAll<HTMLElement>('[data-animate]'));
    gsap.set(elements, { y: 46, opacity: 0, scale: 0.985 });

    this.sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) {
          return;
        }

        const target = entry.target as HTMLElement;
        const staggerSelector = target.dataset['stagger'];

        gsap.to(target, {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.72,
          ease: 'power3.out'
        });

        if (staggerSelector) {
          const children = Array.from(target.querySelectorAll<HTMLElement>(staggerSelector));
          gsap.fromTo(children,
            { y: 26, opacity: 0, scale: 0.96 },
            { y: 0, opacity: 1, scale: 1, duration: 0.48, stagger: 0.06, ease: 'power3.out', delay: 0.12 }
          );
        }

        this.sectionObserver?.unobserve(target);
      });
    }, { threshold: 0.14, rootMargin: '0px 0px -6% 0px' });

    elements.forEach(element => this.sectionObserver?.observe(element));
  }

  private attachMicroInteractions(): void {
    if (typeof window === 'undefined' || this.prefersReducedMotion) {
      return;
    }

    const buttons = Array.from(this.host.nativeElement.querySelectorAll<HTMLElement>('button, .primary-link, .outline-link'));

    buttons.forEach(button => {
      button.addEventListener('mouseenter', () => {
        gsap.to(button, { y: -2, scale: 1.015, duration: 0.2, ease: 'power2.out' });
      });

      button.addEventListener('mouseleave', () => {
        gsap.to(button, { y: 0, scale: 1, duration: 0.25, ease: 'power2.out' });
      });
    });
  }

  private animateSearchResults(): void {
    if (this.prefersReducedMotion) {
      return;
    }

    setTimeout(() => {
      const cards = Array.from(this.host.nativeElement.querySelectorAll<HTMLElement>('.result-card'));
      gsap.fromTo(cards,
        { y: 22, opacity: 0, scale: 0.965 },
        { y: 0, opacity: 1, scale: 1, duration: 0.42, stagger: 0.06, ease: 'power3.out' }
      );
    });
  }

  private animateBookingPanel(): void {
    if (this.prefersReducedMotion) {
      return;
    }

    setTimeout(() => {
      const panel = this.host.nativeElement.querySelector<HTMLElement>('#bookingPanel .booking-panel');
      if (!panel) {
        return;
      }

      gsap.fromTo(panel,
        { y: 28, opacity: 0, scale: 0.97 },
        { y: 0, opacity: 1, scale: 1, duration: 0.45, ease: 'power3.out' }
      );
    });
  }

  private updateScrollProgress(): void {
    if (typeof document === 'undefined') {
      return;
    }

    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    this.scrollProgress = scrollHeight > 0 ? Math.min(100, Math.max(0, scrollTop / scrollHeight * 100)) : 0;
  }

  private createVehicle(
    id: number,
    name: string,
    carType: string,
    seats: string,
    transmission: 'Automatic' | 'Manual',
    price24hrs: number,
    bodyColor: string,
    accentColor: string,
    badge?: string
  ): RenterVehicle {
    return {
      id,
      name,
      imageUrl: this.vehicleSvg(name, bodyColor, accentColor),
      carType,
      seats,
      transmission,
      fuelType: 'Gasoline',
      rentalType: id % 2 === 0 ? 'with_driver' : 'without_driver',
      price12hrs: Math.round(price24hrs * 0.58),
      price24hrs,
      withDriverSurcharge12hrs: 300,
      withDriverSurcharge24hrs: 500,
      pickupAddress: 'Makati City',
      hasInsurance: true,
      insuranceCoverages: ['Comprehensive Insurance', 'Personal Accident Coverage', 'Third Party Liability Coverage'],
      availableDates: ['2026-05-27', '2026-05-28', '2026-05-29', '2026-05-30'],
      matchingDates: ['2026-05-27', '2026-05-28', '2026-05-29'],
      isFullyAvailable: true,
      rating: 4.8,
      reviews: 32,
      badge
    };
  }

  private vehicleSvg(label: string, bodyColor: string, accentColor: string): string {
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="640" height="360" viewBox="0 0 640 360">
        <defs>
          <linearGradient id="bg" x1="0" x2="1" y1="0" y2="1">
            <stop stop-color="#f8fafc" offset="0"/>
            <stop stop-color="#e2e8f0" offset="1"/>
          </linearGradient>
          <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="18" stdDeviation="16" flood-color="#0f172a" flood-opacity=".22"/>
          </filter>
        </defs>
        <rect width="640" height="360" rx="28" fill="url(#bg)"/>
        <path d="M0 250 C130 210 250 235 370 205 C480 178 560 195 640 160 L640 360 L0 360 Z" fill="#dbeafe" opacity=".65"/>
        <g filter="url(#shadow)">
          <path d="M150 218 L190 158 C205 135 230 122 264 122 H394 C421 122 446 138 462 160 L500 213 C516 215 529 229 529 247 V264 H111 V247 C111 231 124 217 150 218Z" fill="${bodyColor}" stroke="${accentColor}" stroke-width="8"/>
          <path d="M210 158 H300 V205 H174 L210 158Z" fill="#cbd5e1"/>
          <path d="M315 158 H392 C413 158 429 168 440 187 L450 205 H315 V158Z" fill="#bfdbfe"/>
          <circle cx="190" cy="265" r="38" fill="#0f172a"/>
          <circle cx="190" cy="265" r="17" fill="#cbd5e1"/>
          <circle cx="446" cy="265" r="38" fill="#0f172a"/>
          <circle cx="446" cy="265" r="17" fill="#cbd5e1"/>
          <rect x="250" y="224" width="130" height="28" rx="14" fill="#ffffff" opacity=".75"/>
        </g>
        <text x="320" y="330" text-anchor="middle" font-family="Arial" font-size="24" font-weight="800" fill="#0f172a">${label}</text>
      </svg>`;

    return `data:image/svg+xml,${encodeURIComponent(svg)}`;
  }

  private avatarSvg(label: string, bg: string, color: string): string {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="160" height="160"><rect width="160" height="160" rx="80" fill="${bg}"/><text x="80" y="96" text-anchor="middle" font-family="Arial" font-size="48" font-weight="900" fill="${color}">${label}</text></svg>`;
    return `data:image/svg+xml,${encodeURIComponent(svg)}`;
  }

  private newsSvg(label: string, bg: string): string {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="500" height="320"><rect width="500" height="320" rx="22" fill="${bg}"/><rect x="44" y="60" width="410" height="180" rx="22" fill="#ffffff" opacity=".72"/><text x="250" y="170" text-anchor="middle" font-family="Arial" font-size="30" font-weight="900" fill="#001621">${label}</text></svg>`;
    return `data:image/svg+xml,${encodeURIComponent(svg)}`;
  }
}
