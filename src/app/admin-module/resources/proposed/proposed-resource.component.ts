import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'proposed-resource',
    templateUrl: './proposed-resource.component.html'
  
})
export class ProposedResourceComponent implements OnInit {
    public title:string;
    public categories;
    public categories2;

    constructor() { 
        this.title = 'Recursos propuestos';
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
