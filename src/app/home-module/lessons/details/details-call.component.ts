import { Component, Input, Output, EventEmitter } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { GLOBAL } from 'src/app/services/global';
import { LABEL_PROFILE } from '../../homeData';
import { LessonService } from 'src/app/services/lesson.service';

@Component({
    selector: 'details-call',
    templateUrl: './details-call.component.html'
})
export class DetailsCallComponent {
    public title;
    public identity;
    public token;
    public url;

    public fields;
    public types;

    public profile_label;

    @Input() lesson;
    @Input() isJoin;
    @Output() isJoined = new EventEmitter();

    constructor(
        private _userService: UserService,
        private _lessonService: LessonService
    ) {
        this.title = 'Agregar recurso';
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.url = GLOBAL.url;

        this.profile_label = LABEL_PROFILE;

    }

    ngOnInit(): void {

    }

    getLink(url) {
        if (url.includes('http://') || url.includes('https://')) {
            return url;
        } else {
            return `http://${url}`;
        }
    }

    hasJoined(lesson) {
        let tempArray = [];
        
        if (lesson.call.interested.length > 0) {

            lesson.call.interested.forEach(interested => {
                tempArray.push(interested._id);
            });

            if (tempArray.indexOf(this.identity._id) >= 0) {
                return true;
            } else {
                return false;
            }
        }

    }

    editLesson(lesson, action) {
        let editLesson = lesson;
        let tempArray = [];

        lesson.call.interested.forEach(interested => {
            tempArray.push(interested._id);
        });

        editLesson.call.interested = tempArray;

        if (action == 'remove') {
            let ix = editLesson.call.interested.indexOf(this.identity._id);
            console.log(ix)
            lesson.call.interested.splice(ix, 1);

        } else if (action == 'add') {

            if (editLesson.call.interested.indexOf >= 0) {
                return;
            }

            editLesson.call.interested.push(this.identity._id);
        }

        this._lessonService.editLesson(this.token, lesson).subscribe(
            response => {

                if (response && response.lesson._id) {
                    this.lesson = response.lesson;

                    this.isJoined.emit();
                }
            },
            error => {
                console.log(<any>error);
            }
        )
    }
}
