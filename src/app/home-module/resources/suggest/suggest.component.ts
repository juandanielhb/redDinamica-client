import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'suggest',
    templateUrl: './suggest.component.html'
  
})
export class SuggestComponent implements OnInit {
    public title:string;
    public categories;
    
    constructor() { 
        this.title = 'Sugerir recurso';

   }

    ngOnInit(): void { 
        
    }
}
