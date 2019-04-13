import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'resources',
    templateUrl: './resources.component.html'
  
})
export class ResourcesComponent implements OnInit {
    public title:string;
    public categories;    
    
    constructor() { 
        this.title = 'Recursos';

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
