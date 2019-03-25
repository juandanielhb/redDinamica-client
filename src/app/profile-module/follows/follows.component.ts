import { Component } from '@angular/core';

@Component({
    selector: 'follows',
    templateUrl: './follows.component.html'
})
export class FollowsComponent {
    public title: string;
    public fieldsForm;

    constructor() {
        this.title = 'Red';
        this.fieldsForm = [
            'Ciudad',
            'Departamento',
            'Pais'
        ];
    }


}
