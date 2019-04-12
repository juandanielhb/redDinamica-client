import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'my-lessons',
    templateUrl: './my-lessons.component.html'
  
})
export class MyLessonsComponent implements OnInit {
    public title:string;
    public categories;
    public categories2;

    constructor() { 
        this.title = 'Mis lecciones';
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
