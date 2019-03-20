import { Component, OnInit } from '@angular/core';



@Component({
    selector: 'login',
    templateUrl: './login.component.html'    
})
export class LoginComponent implements OnInit {
    public title:string;
    public status:string;
    

    constructor() { 
        this.title = 'Iniciar sesión';
        this.status = 'error';
        
    }

    ngOnInit(){
        console.log("Inicializado " + this.title);
    }
}
