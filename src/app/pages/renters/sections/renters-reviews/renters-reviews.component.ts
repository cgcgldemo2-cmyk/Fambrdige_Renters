import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
@Component({selector:'app-renters-reviews',standalone:true,imports:[CommonModule],templateUrl:'./renters-reviews.component.html',styleUrls:['./renters-reviews.component.scss']})
export class RentersReviewsComponent{ @Input() reviews:any[]=[]; }
