import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Input } from '@angular/core';
import gsap from 'gsap';
@Component({selector:'app-renters-hero',standalone:true,imports:[CommonModule],templateUrl:'./renters-hero.component.html',styleUrls:['./renters-hero.component.scss']})
export class RentersHeroComponent implements AfterViewInit{ @Input() store:any; constructor(private el:ElementRef){} get heroBackground(){return `linear-gradient(90deg, rgba(0,22,33,.96), rgba(0,22,33,.5)), url('${this.store?.heroImage}')`;} ngAfterViewInit(){gsap.from(this.el.nativeElement.querySelectorAll('.animate-item'),{opacity:0,y:40,duration:.9,stagger:.15,ease:'power3.out'});} }
