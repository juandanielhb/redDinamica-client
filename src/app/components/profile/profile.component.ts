import { Component } from '@angular/core';


@Component({
    selector: 'Profile',
    templateUrl: './Profile.component.html'    
})
export class ProfileComponent {
    public title:string;
    public status:string;
    

    constructor() { 
        this.title = 'Perfil';
        this.status = '';
        
    }
}
