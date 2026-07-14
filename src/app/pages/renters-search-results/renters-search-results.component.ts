import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookingSearchData } from '../shared/booking-search/booking-search.component';
import { RentersSearchResultsSharedModule } from './renters-search-results-shared.module';

@Component({
  selector: 'app-renters-search-results',
  standalone: true,
  imports: [CommonModule, RentersSearchResultsSharedModule],
  templateUrl: './renters-search-results.component.html',
  styleUrls: ['./renters-search-results.component.scss']
})
export class RentersSearchResultsComponent {
  isEditingSearch = false;

  store = { name: 'ABRental', domain: 'abrental.cgicsoftwaresolution.com', phone: '0999 123 4567' };
  search: BookingSearchData = { pickupLocation: 'NAIA Terminal 3', pickupCity: 'Pasay, Metro Manila', pickupDate: 'May 28, 2025', pickupTime: '10:00 AM', rentalDays: 3, rentalType: 'With Driver' };
  cars = [
    { name:'Toyota Wigo', image:'https://cdn.pixabay.com/photo/2012/05/29/00/43/car-49278_1280.jpg', seats:4, transmission:'Automatic', fuel:'Gasoline', price:1800, badge:'Most Affordable' },
    { name:'Toyota Vios', image:'https://cdn.pixabay.com/photo/2017/03/27/14/56/auto-2179220_1280.jpg', seats:5, transmission:'Automatic', fuel:'Gasoline', price:2200, badge:'Popular' },
    { name:'Toyota Avanza', image:'https://cdn.pixabay.com/photo/2016/11/29/05/08/auto-1867383_1280.jpg', seats:7, transmission:'Automatic', fuel:'Gasoline', price:2600, badge:'' },
    { name:'Mitsubishi Xpander', image:'https://cdn.pixabay.com/photo/2019/09/06/11/30/car-4455797_1280.jpg', seats:7, transmission:'Automatic', fuel:'Gasoline', price:2800, badge:'Best for Groups' }
  ];
  showMobileFilter = true;

  constructor(private route: ActivatedRoute) {
    this.route.queryParams.subscribe(q => {
      this.search = {
        ...this.search,
        pickupLocation: q['pickupLocation'] || this.search.pickupLocation,
        pickupCity: q['pickupCity'] || this.search.pickupCity,
        pickupDate: q['pickupDate'] || this.search.pickupDate,
        pickupTime: q['pickupTime'] || this.search.pickupTime,
        rentalDays: Number(q['rentalDays'] || this.search.rentalDays),
        rentalType: q['rentalType'] || this.search.rentalType
      };
    });
  }

  onSearchUpdated(updatedSearch: BookingSearchData): void {
    this.search = { ...updatedSearch };
    this.isEditingSearch = false;
    console.log('Search updated:', this.search);
    // reload cars here later
  }
}
