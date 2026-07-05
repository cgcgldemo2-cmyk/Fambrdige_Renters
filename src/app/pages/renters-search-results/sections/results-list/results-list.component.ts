import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ResultsCardComponent } from '../results-card/results-card.component';
@Component({selector:'app-results-list',standalone:true,imports:[CommonModule,ResultsCardComponent],templateUrl:'./results-list.component.html',styleUrls:['./results-list.component.scss']})
export class ResultsListComponent{ @Input() cars:any[]=[]; @Input() search:any; }
