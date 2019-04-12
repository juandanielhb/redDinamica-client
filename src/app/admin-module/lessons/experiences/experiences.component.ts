import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'experiences',
    templateUrl: './experiences.component.html'
  
})
export class ExperiencesComponent implements OnInit {
    public title:string;
    
    constructor() { 
        this.title = 'Experiencias';
    }

    ngOnInit(): void { 
        
    }
}
