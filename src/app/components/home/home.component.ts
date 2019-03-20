import { Component, OnInit } from '@angular/core';



@Component({
    selector: 'home',
    templateUrl: './home.component.html'    
})
export class HomeComponent implements OnInit {
    public title:string;
    public status:string;
    

    constructor() { 
        this.title = 'Inicio';
        this.status = 'error';
        
    }

    ngOnInit(){
        console.log("Inicializado " + this.title);
    }
}
