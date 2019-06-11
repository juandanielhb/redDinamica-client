import { Component, Input } from '@angular/core';
import { GLOBAL } from 'src/app/services/global';
import { LESSON_STATES, ACADEMIC_LEVEL } from 'src/app/services/DATA';

@Component({
    selector: 'lesson-details',
    templateUrl: './lesson-details.component.html'
    
})
export class LessonDetailsComponent {
    public url;
    
    @Input() lesson; 

    public academic_level = ACADEMIC_LEVEL;    
    public lesson_states = LESSON_STATES;
    
    public loading = true;

    constructor() {        
        this.url = GLOBAL.url;
    }

    ngOnInit(): void {
        this.loading = false;
    }

    

}
