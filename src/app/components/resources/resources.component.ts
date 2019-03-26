import { Component } from '@angular/core';

@Component({
    selector: 'resources',
    templateUrl: './resources.component.html',
    styleUrls: ['./resources.component.css']
})
export class ResourcesComponent {
    public title: string;
    public fieldsForm;
    public categories;

    constructor() {
        this.title = 'Usuarios';
        this.fieldsForm = [
            'Nombre'
        ];
        this.categories = [
            'Facilitadores',
            'Docente',
            'Estudiante',
            'Invitados'
        ]
    }


}
