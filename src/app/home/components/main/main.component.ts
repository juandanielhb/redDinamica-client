import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
    public title:string;
    
    constructor() { 
        this.title = 'Main';
    }

    ngOnInit(): void { 
        console.log("Inicializado " + this.title);
    }
}
