import { Component } from '@angular/core';

@Component({
    selector: 'news',
    templateUrl: './news.component.html'    
})
export class NewsComponent {
    public title:string;
    

    constructor() { 
        this.title = 'news Component';
        
    }


}
