import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
@Component({selector:'app-renters-cta',standalone:true,imports:[CommonModule],templateUrl:'./renters-cta.component.html',styleUrls:['./renters-cta.component.scss']})
export class RentersCtaComponent{ @Input() store:any; get ctaBackground(){return `linear-gradient(90deg, rgba(0,22,33,.95), rgba(0,22,33,.4)), url('${this.store?.ctaImage}')`;} }
