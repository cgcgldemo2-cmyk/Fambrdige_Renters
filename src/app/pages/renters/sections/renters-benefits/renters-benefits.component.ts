import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
@Component({selector:'app-renters-benefits',standalone:true,imports:[CommonModule],templateUrl:'./renters-benefits.component.html',styleUrls:['./renters-benefits.component.scss']})
export class RentersBenefitsComponent{benefits=[{icon:'🚗',title:'Wide Selection',text:'Choose from a variety of well-maintained cars.'},{icon:'🏷️',title:'Transparent Pricing',text:'No hidden fees. What you see is what you pay.'},{icon:'🛡️',title:'Verified & Trusted',text:'All renters are verified for a safer experience.'},{icon:'🎧',title:'24/7 Support',text:'We’re here to help before, during, and after your trip.'}];}
