import { Component, OnInit } from '@angular/core';



@Component({
    selector: 'register',
    templateUrl: './register.component.html'    
})
export class RegisterComponent implements OnInit {
    public title:string;
    

    constructor() { 
        this.title = 'Registro';
        
    }

    ngOnInit(){
        console.log("Inicializado " + this.title);
    }
}
