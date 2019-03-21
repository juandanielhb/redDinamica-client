import { Component } from '@angular/core';

@Component({
    selector: 'users',
    templateUrl: './users.component.html'    
})
export class UsersComponent {
    public title:string;
    

    constructor() { 
        this.title = 'users Component';
        
    }

}
