import { Component } from '@angular/core';
@Component({
    selector: 'institutions',
    templateUrl: './institutions.component.html'
})
export class InstitutionsComponent {
    public title: string;
    public levels: Array<String>;
    public fieldsForm;


    constructor() {
        this.title = 'Instituciones';
        this.fieldsForm = [
            'Institución',
            'Website',
            'Correo electrónico',
            'Telefono',
            'Ciudad'
        ];
        this.levels = [
            'Prescolar',
            'Primaria',
            'Secundaria',
            'Universidad'
        ];
    }
}
