import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'landing',
    templateUrl: './landing.component.html'    
})
export class LandingComponent implements OnInit {
    public title:string;
    

    constructor() { 
        this.title = 'Aprende, comparte y crea';
        
    }

    ngOnInit(){
        
    }
}
