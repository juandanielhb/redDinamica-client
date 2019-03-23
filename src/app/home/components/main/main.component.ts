import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
    public title: string;
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
        this.title = 'Main';

    }

    ngOnInit(): void {
        console.log("Inicializado " + this.title);
    }
}
