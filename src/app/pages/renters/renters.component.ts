import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BookingSearchData } from '../shared/booking-search/booking-search.component';
import { RentersSharedModule } from './renters-shared.module';

@Component({
  selector: 'app-renters',
  standalone: true,
  imports: [CommonModule, RentersSharedModule],
  templateUrl: './renters.component.html',
  styleUrls: ['./renters.component.scss']
})
export class RentersComponent {
  store = { name: 'ABRental', domain: 'abrental.cgicsoftwaresolution.com', phone: '0999 123 4567', heroImage: 'https://cdn.pixabay.com/photo/2017/03/27/14/56/auto-2179220_1280.jpg', ctaImage: 'https://cdn.pixabay.com/photo/2016/11/18/12/52/automobile-1834274_1280.jpg' };
  search: BookingSearchData = { pickupLocation: '', pickupCity: '', pickupDate: '2026-07-08', pickupTime: '01:15', rentalDays: 2, rentalType: 'Self Drive' };
  cars = [
    { name:'Toyota Wigo', image:'https://cdn.pixabay.com/photo/2012/05/29/00/43/car-49278_1280.jpg', seats:4, transmission:'Automatic', price:1800, duration:'12 hours', badge:'' },
    { name:'Toyota Vios', image:'https://cdn.pixabay.com/photo/2017/03/27/14/56/auto-2179220_1280.jpg', seats:5, transmission:'Automatic', price:2200, duration:'12 hours', badge:'Popular' },
    { name:'Toyota Avanza', image:'https://cdn.pixabay.com/photo/2016/11/29/05/08/auto-1867383_1280.jpg', seats:7, transmission:'Automatic', price:2600, duration:'12 hours', badge:'' },
    { name:'Mitsubishi Xpander', image:'https://cdn.pixabay.com/photo/2019/09/06/11/30/car-4455797_1280.jpg', seats:7, transmission:'Automatic', price:2800, duration:'12 hours', badge:'Popular' },
    { name:'Toyota Fortuner', image:'https://cdn.pixabay.com/photo/2016/11/18/12/52/automobile-1834274_1280.jpg', seats:7, transmission:'Automatic', price:4500, duration:'12 hours', badge:'Premium' }
  ];
  reviews = [
    { name:'Mark D.', avatar:'https://i.pravatar.cc/100?img=12', rating:5, comment:'The car was in excellent condition and very clean. Booking was easy and the owner was responsive.', date:'May 12, 2025' },
    { name:'Jessica L.', avatar:'https://i.pravatar.cc/100?img=32', rating:5, comment:'Smooth transaction from start to finish. Highly recommended!', date:'May 8, 2025' },
    { name:'Kevin T.', avatar:'https://i.pravatar.cc/100?img=11', rating:5, comment:'Great service and well-maintained car. Pickup and return were hassle-free.', date:'May 6, 2025' },
    { name:'Sarah G.', avatar:'https://i.pravatar.cc/100?img=47', rating:5, comment:'Booked for a family trip and had a wonderful experience.', date:'May 3, 2025' }
  ];
}
