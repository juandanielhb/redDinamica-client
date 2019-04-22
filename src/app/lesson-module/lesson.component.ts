import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Lesson } from '../models/lesson.model';
import { UserService } from '../services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LessonService } from '../services/lesson.service';
import { GLOBAL } from '../services/global';

@Component({
    selector: 'lesson',
    templateUrl: './lesson.component.html',
    styleUrls: ['./lesson.component.css']
})
export class LessonComponent implements OnInit {
    public title: string;
    public identity;
    public token;
    public url;

    public status;
    
    public selectedOption = 'details';

    public lesson = new Lesson();
    
    constructor(
        private _userService:UserService,
        private _lessonService: LessonService,
        private _router: Router,
        private _route: ActivatedRoute
    ) {
        this.title = 'Leccion en';
        this.url = GLOBAL.url;
        this.token = this._userService.getToken();
        this.identity = this._userService.getIdentity();
        
    }

    ngOnInit(): void {
        this.loadLesson();
    }

    ngDoCheck(): void {
        if (this.needReloadData) {
            this.loadLesson();
            this.needReloadData = false;
        }
    }

    loadLesson(){
        this._route.params.subscribe(params => {
            let id = params['id'];

            this.getLesson(id);
        });
    }

    getLesson(lessonId){
        this._lessonService.getLesson(this.token,lessonId).subscribe(
            response => {
                
                if (response.lesson) {
                    this.status = 'success';
                    this.lesson = response.lesson;

                } else {
                    this.status = 'error';
                    
                    this._router.navigate(['admin','lecciones']);
                }

            },
            error => {
                console.log(<any>error);                
                this._router.navigate(['admin','lecciones']);
            }
        );       
    }
    
    setSelectedOption(selectedOption){
        this.selectedOption = selectedOption;
    }

    public needReloadData;
    setNeedReload() {
        this.needReloadData = true;
    }
}
