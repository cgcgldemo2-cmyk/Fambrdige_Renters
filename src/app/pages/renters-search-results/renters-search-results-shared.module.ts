import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BookingSearchComponent } from '../shared/booking-search/booking-search.component';
import { StoreHeaderComponent } from '../shared/store-header/store-header.component';
import { ResultsFilterComponent } from './sections/results-filter/results-filter.component';
import { ResultsListComponent } from './sections/results-list/results-list.component';
import { ResultsPaginationComponent } from './sections/results-pagination/results-pagination.component';

@NgModule({
  imports: [
    CommonModule,
    StoreHeaderComponent,
    BookingSearchComponent,
    ResultsFilterComponent,
    ResultsListComponent,
    ResultsPaginationComponent
  ],
  exports: [
    StoreHeaderComponent,
    BookingSearchComponent,
    ResultsFilterComponent,
    ResultsListComponent,
    ResultsPaginationComponent
  ]
})
export class RentersSearchResultsSharedModule {}
