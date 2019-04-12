import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'send-experiences',
    templateUrl: './send-experiences.component.html'
  
})
export class SendExperiencesComponent implements OnInit {
    public title:string;
    
    constructor() { 
        this.title = 'Enviar experiencia';
    }

    ngOnInit(): void { 
        
    }
}
