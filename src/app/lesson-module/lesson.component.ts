import { Component, OnInit } from '@angular/core';
import { LESSON_MENU } from './services/lessonMenu';

@Component({
    selector: 'lesson',
    templateUrl: './lesson.component.html',
    styleUrls: ['./lesson.component.css']
})
export class LessonComponent implements OnInit {
    public title: string;
    public menuOptions = LESSON_MENU;    

    constructor() {
        this.title = 'Lecciones';
    }

    ngOnInit(): void {
        
    }
}
