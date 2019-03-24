import { Component } from '@angular/core';

@Component({
    selector: 'newUsers',
    templateUrl: './newUsers.component.html',
    styleUrls: ['./newUsers.component.css']  
})
export class NewUsersComponent {
    public title:string;
    

    constructor() { 
        this.title = 'Nuevos usuarios';
        
    }

}
