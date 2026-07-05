import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
@Component({selector:'app-results-filter',standalone:true,imports:[CommonModule,FormsModule],templateUrl:'./results-filter.component.html',styleUrls:['./results-filter.component.scss']})
export class ResultsFilterComponent{vehicleTypes=['All Types','Hatchback (5)','Sedan (6)','MPV (7)','SUV (5)','Van (2)'];transmissions=['All','Automatic (20)','Manual (5)'];seats=['All','2 - 4 Seats (6)','5 - 7 Seats (14)','8+ Seats (5)'];}
