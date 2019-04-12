import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'resources',
    templateUrl: './resources.component.html'
  
})
export class ResourcesComponent implements OnInit {
    public title:string;
    public categories;
    public categories2;

    constructor() { 
        this.title = 'Recursos';
        this.categories = [
            {
                label: "Universitario",
                value: "university",
            },
            {
                label: "Bachillerato",
                value: "college",
            },
            {
                label: "Primaria",
                value: "school",
            },
            {
                label: "Preescolar",
                value: "kinder",
            }
        ];
        this.categories2 = [
            {
                label: "Documentos",
                value: "documents",
            },
            {
                label: "Documentos",
                value: "documents",
            },
            {
                label: "Documentos",
                value: "documents",
            },
            {
                label: "Documentos",
                value: "documents",
            },
            {
                label: "Videos",
                value: "videos",
            },
            {
                label: "Enlaces",
                value: "links",
            },
            {
                label: "Software",
                value: "software",
            }
        ];
    }

    ngOnInit(): void { 
        
    }
}
