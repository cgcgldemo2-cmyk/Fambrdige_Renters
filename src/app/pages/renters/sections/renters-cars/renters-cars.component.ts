import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
@Component({selector:'app-renters-cars',standalone:true,imports:[CommonModule],templateUrl:'./renters-cars.component.html',styleUrls:['./renters-cars.component.scss']})
export class RentersCarsComponent{ @Input() cars:any[]=[]; currentIndex=0; get visibleCars(){const count=4;return this.cars.slice(this.currentIndex,this.currentIndex+count);} get dots(){return Array.from({length:Math.max(this.cars.length-3,1)});} next(){if(this.currentIndex<this.cars.length-4)this.currentIndex++;} prev(){if(this.currentIndex>0)this.currentIndex--;} goTo(i:number){this.currentIndex=i;} }
