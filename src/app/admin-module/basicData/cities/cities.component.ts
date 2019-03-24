import { Component } from '@angular/core';

@Component({
    selector: 'cities',
    templateUrl: './cities.component.html'
})
export class CitiesComponent {
    public title: string;
    public fieldsForm;

    constructor() {
        this.title = 'Ciudades';
        this.fieldsForm = [
            'Ciudad',
            'Departamento',
            'Pais'
        ];
    }


}
