import { Component } from '@angular/core';

@Component({
    selector: 'users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.css']
})
export class UsersComponent {
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
