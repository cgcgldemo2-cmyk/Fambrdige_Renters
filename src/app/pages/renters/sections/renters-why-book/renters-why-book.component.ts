import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
@Component({selector:'app-renters-why-book',standalone:true,imports:[CommonModule],templateUrl:'./renters-why-book.component.html',styleUrls:['./renters-why-book.component.scss']})
export class RentersWhyBookComponent{ @Input() store:any; }
