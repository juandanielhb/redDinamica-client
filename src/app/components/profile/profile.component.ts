import { Component } from '@angular/core';


@Component({
    selector: 'profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
    public title:string;
    public status:string;
    public menuOptions = [
        {
            "buttonClass": "btn-success",
            "iconClass": "fa-home",
            "spanContent": "Inicio",
            "routerLink": "/inicio/add"
        },  
        {
            "buttonClass": "btn-danger",
            "iconClass": "fa-newspaper",
            "spanContent": "Noticias",
            "routerLink": "/landing"
        },  
        {
            "buttonClass": "btn-warning pl-3",
            "iconClass": "fa-file-alt",
            "spanContent": "Lecciones",
            "routerLink": "/landing"
        },                       
        {
            "buttonClass": "btn-info pl-3",
            "iconClass": "fa-paperclip",
            "spanContent": "Recursos",
            "routerLink": "/landing"
        }                      
    ];
    

    constructor() { 
        this.title = 'Perfil';
        this.status = '';
        
    }
}
