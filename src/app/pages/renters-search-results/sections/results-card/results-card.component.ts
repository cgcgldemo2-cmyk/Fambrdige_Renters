import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
@Component({selector:'app-results-card',standalone:true,imports:[CommonModule],templateUrl:'./results-card.component.html',styleUrls:['./results-card.component.scss']})
export class ResultsCardComponent{ @Input() car:any; @Input() search:any; get totalPrice(){return this.car.price * this.search.rentalDays;} }
