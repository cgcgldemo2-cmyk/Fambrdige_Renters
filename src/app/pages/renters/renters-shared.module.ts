import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BookingSearchComponent } from '../shared/booking-search/booking-search.component';
import { StoreHeaderComponent } from '../shared/store-header/store-header.component';
import { RentersBenefitsComponent } from './sections/renters-benefits/renters-benefits.component';
import { RentersCarsComponent } from './sections/renters-cars/renters-cars.component';
import { RentersCtaComponent } from './sections/renters-cta/renters-cta.component';
import { RentersFooterComponent } from './sections/renters-footer/renters-footer.component';
import { RentersHeroComponent } from './sections/renters-hero/renters-hero.component';
import { RentersReviewsComponent } from './sections/renters-reviews/renters-reviews.component';
import { RentersWhyBookComponent } from './sections/renters-why-book/renters-why-book.component';

@NgModule({
  imports: [
    CommonModule,
    StoreHeaderComponent,
    BookingSearchComponent,
    RentersHeroComponent,
    RentersBenefitsComponent,
    RentersCarsComponent,
    RentersReviewsComponent,
    RentersWhyBookComponent,
    RentersCtaComponent,
    RentersFooterComponent
  ],
  exports: [
    StoreHeaderComponent,
    BookingSearchComponent,
    RentersHeroComponent,
    RentersBenefitsComponent,
    RentersCarsComponent,
    RentersReviewsComponent,
    RentersWhyBookComponent,
    RentersCtaComponent,
    RentersFooterComponent
  ]
})
export class RentersSharedModule {}
