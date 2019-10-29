import { Component, Input } from '@angular/core';
import { GLOBAL } from 'src/app/services/global';
import { LESSON_STATES, ACADEMIC_LEVEL } from 'src/app/services/DATA';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'lesson-details',
    templateUrl: './lesson-details.component.html'
    
})
export class LessonDetailsComponent {
    public url;
    public identity;

    @Input() lesson; 

    public academic_level = ACADEMIC_LEVEL;    
    public lesson_states = LESSON_STATES;
    
    public loading = true;

    constructor(private _userService: UserService) {        
        this.url = GLOBAL.url;
        this.identity = this._userService.getIdentity();
    }

    ngOnInit(): void {
        this.loading = false;
    }

    

}
