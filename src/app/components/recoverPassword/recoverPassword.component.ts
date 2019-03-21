import { Component, OnInit } from '@angular/core';



@Component({
    selector: 'recoverPassword',
    templateUrl: './recoverPassword.component.html'    
})
export class RecoverPasswordComponent implements OnInit {
    public title:string;
    public status:string;
    

    constructor() { 
        this.title = '¿Olvidaste tu contraseña?';       
    }

    ngOnInit(){
        console.log("Inicializado " + this.title);
    }
}
