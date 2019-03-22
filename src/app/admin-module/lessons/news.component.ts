import { Component } from '@angular/core';

@Component({
    selector: 'lessons',
    templateUrl: './lessons.component.html'    
})
export class LessonsComponent {
    public title:string;
    

    constructor() { 
        this.title = 'lessons Component';
        
    }


}
