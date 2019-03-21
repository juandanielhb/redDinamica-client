import { Component } from '@angular/core';

@Component({
    selector: 'basic-data',
    templateUrl: './basicData.component.html'    
})
export class BasicDataComponent {
    public title:string;
    

    constructor() { 
        this.title = 'BasicData Component';
        
    }


}
