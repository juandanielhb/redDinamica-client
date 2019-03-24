import { Component } from '@angular/core';

@Component({
    selector: 'knowledgeAreas',
    templateUrl: './knowledgeAreas.component.html'
})
export class KnowledgeAreasComponent {
    public title: string;
    public fieldsForm;

    constructor() {
        this.title = 'Áreas de conocimiento';
        this.fieldsForm = [
            'Nombre'
        ];
    }


}
