import { Component, OnInit, Input } from '@angular/core';
import { GLOBAL } from 'src/app/services/global';
import { LESSON_STATES } from 'src/app/services/DATA';

@Component({
    selector: 'group',
    templateUrl: './group.component.html'
    
})
export class GroupComponent implements OnInit {
    public title: string;
    public url;
    
    public lesson_states = LESSON_STATES;
    
    @Input() lesson;  
    
    constructor() {
        this.title = 'Grupo de desarrollo';
        this.url = GLOBAL.url;
    }

    ngOnInit(): void {
        
    }

}
