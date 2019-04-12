import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'rating',
    templateUrl: './rating.component.html'
  
})
export class RatingComponent implements OnInit {
    public title:string;
    public categories;
    
    constructor() { 
        this.title = 'Calificar recurso';

        this.categories = [
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
