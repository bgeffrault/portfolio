import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class Project {
	title: string; 
	content: string;  
	skills: string[];
	created_at: string;//Pb pour sauvegarder dans firebase avec le format date
	photo: string;
	
	constructor() {
	}
 }
