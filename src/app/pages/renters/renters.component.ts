import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RentersBenefitsComponent } from './sections/renters-benefits/renters-benefits.component';
import { RentersCarsComponent } from './sections/renters-cars/renters-cars.component';
import { RentersCtaComponent } from './sections/renters-cta/renters-cta.component';
import { RentersFooterComponent } from './sections/renters-footer/renters-footer.component';
import { RentersHeaderComponent } from './sections/renters-header/renters-header.component';
import { RentersHeroComponent } from './sections/renters-hero/renters-hero.component';
import { RentersReviewsComponent } from './sections/renters-reviews/renters-reviews.component';
import { RentersSearchComponent } from './sections/renters-search/renters-search.component';
import { RentersWhyBookComponent } from './sections/renters-why-book/renters-why-book.component';

@Component({
  selector: 'app-renters',
  standalone: true,
  imports: [
    CommonModule,
    RentersHeaderComponent,
    RentersHeroComponent,
    RentersSearchComponent,
    RentersBenefitsComponent,
    RentersCarsComponent,
    RentersReviewsComponent,
    RentersWhyBookComponent,
    RentersCtaComponent,
    RentersFooterComponent
  ],
  templateUrl: './renters.component.html',
  styleUrls: ['./renters.component.scss']
})
export class RentersComponent {
  store = {
    name: 'ABRental',
    domain: 'abrental.cgicsoftwaresolution.com',
    phone: '0999 123 4567',
    heroImage: 'https://cdn.pixabay.com/photo/2017/03/27/14/56/auto-2179220_1280.jpg',
    ctaImage: 'https://cdn.pixabay.com/photo/2016/11/18/12/52/automobile-1834274_1280.jpg'
  };

  cars = [
    {
      name: 'Toyota Wigo',
      image: 'https://cdn.pixabay.com/photo/2016/11/29/09/32/auto-1868726_1280.jpg',
      seats: 4,
      transmission: 'Automatic',
      price: 1800,
      duration: '12 hours',
      badge: ''
    },
    {
      name: 'Toyota Vios',
      image: 'https://cdn.pixabay.com/photo/2017/03/27/14/56/auto-2179220_1280.jpg',
      seats: 5,
      transmission: 'Automatic',
      price: 2200,
      duration: '12 hours',
      badge: 'Popular'
    },
    {
      name: 'Toyota Avanza',
      image: 'https://cdn.pixabay.com/photo/2016/11/29/05/08/auto-1867383_1280.jpg',
      seats: 7,
      transmission: 'Automatic',
      price: 2600,
      duration: '12 hours',
      badge: ''
    },
    {
      name: 'Mitsubishi Xpander',
      image: 'https://cdn.pixabay.com/photo/2019/09/06/11/30/car-4455797_1280.jpg',
      seats: 7,
      transmission: 'Automatic',
      price: 2800,
      duration: '12 hours',
      badge: 'Popular'
    },
    {
      name: 'Toyota Fortuner',
      image: 'https://cdn.pixabay.com/photo/2016/11/18/12/52/automobile-1834274_1280.jpg',
      seats: 7,
      transmission: 'Automatic',
      price: 4500,
      duration: '12 hours',
      badge: 'Premium'
    }
  ];

  reviews = [
    { name: 'Mark D.', avatar: 'assets/images/reviews/user-1.jpg', rating: 5, comment: 'The car was in excellent condition and very clean. Booking was easy and the owner was responsive. Will definitely rent again!', date: 'May 12, 2025' },
    { name: 'Jessica L.', avatar: 'assets/images/reviews/user-2.jpg', rating: 5, comment: 'Smooth transaction from start to finish. The car is fuel-efficient and perfect for our road trip. Highly recommended!', date: 'May 8, 2025' },
    { name: 'Kevin T.', avatar: 'assets/images/reviews/user-3.jpg', rating: 5, comment: 'Great service and well-maintained car. Pickup and return were hassle-free. Thank you ABRental!', date: 'May 6, 2025' },
    { name: 'Sarah G.', avatar: 'assets/images/reviews/user-4.jpg', rating: 5, comment: 'Booked for a family trip and we had a wonderful experience. The car was spacious and comfortable.', date: 'May 3, 2025' }
  ];
}
