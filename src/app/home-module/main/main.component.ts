import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'main',
    templateUrl: './main.component.html'
})
export class MainComponent implements OnInit {
    public title:string;
    
    constructor() { 
        this.title = 'Bienvenidos a';
    }

    ngOnInit(): void { 
        
    }
}
