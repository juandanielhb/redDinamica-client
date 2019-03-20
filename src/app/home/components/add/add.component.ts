import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'add',
    templateUrl: './add.component.html'
})
export class AddComponent implements OnInit {
    public title:string;
    
    constructor() { 
        this.title = 'Add';
    }

    ngOnInit(): void { 
        console.log("Inicializado " + this.title);
    }
}
