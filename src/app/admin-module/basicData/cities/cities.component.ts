import { Component } from '@angular/core';

@Component({
    selector: 'cities',
    templateUrl: './cities.component.html'    
})
export class CitiesComponent {
    public title:string;
    

    constructor() { 
        this.title = 'Ciudades';        
    }


}
