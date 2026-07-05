import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
@Component({selector:'app-renters-footer',standalone:true,imports:[CommonModule],templateUrl:'./renters-footer.component.html',styleUrls:['./renters-footer.component.scss']})
export class RentersFooterComponent{ @Input() store:any; }
