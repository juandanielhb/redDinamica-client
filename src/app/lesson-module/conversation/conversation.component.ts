import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import { Lesson } from 'src/app/models/lesson.model';
import { LESSON_STATES } from 'src/app/services/DATA';

@Component({
    selector: 'conversation',
    templateUrl: './conversation.component.html'
    
})
export class ConversationComponent implements OnInit {
    public title: string;
    
    public lesson_states = LESSON_STATES;
    
    @Input() lesson;
    
    constructor(private _location:Location) {
        this.title = 'Conversación';
        
    }

    ngOnInit(): void {
        
    }

    onBackButton(){
        this._location.back();
    }
}
