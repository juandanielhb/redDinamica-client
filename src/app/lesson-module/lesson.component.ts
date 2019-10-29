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

    public parentUrl;
    
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
        
        this._route.parent.url.subscribe(value => {
            this.parentUrl = value[0].path;
        });
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
                    
                    this._router.navigate([this.parentUrl,'lecciones']);
                }

            },
            error => {
                console.log(<any>error);                
                this._router.navigate([this.parentUrl,'lecciones']);
            }
        );       
    }
    
    setSelectedOption(selectedOption){
        this.selectedOption = selectedOption;
        
        this.needReloadData = true;
    }

    public needReloadData;
    setNeedReload(event){   
        this.needReloadData = true;
    }

    isInTheDevelopmentGroup(){
        let response;

        if(this.lesson.development_group){
            response = this.lesson.development_group.find(user => {
                return this.identity._id == user._id;
            })
        }
 
        if(response || this.lesson.expert && this.lesson.expert._id == this.identity){
            return true;
        }else{            
            return false;
        }
    }

    showCommentsOrConversations(){
        let response = this.isInTheDevelopmentGroup();
        
        if(response || this.parentUrl == 'admin'){
            response = true;
        }else{
            response = false;
        }

        if(response && this.lesson.state != 'proposed'){
            response = true;
        }else{
            response = false;
        }

        if(response && this.lesson.expert && this.lesson.leader){
            response = true;
        }else{
            response = false;
        }

        return response;        
    }

    showEdit(){
        let response;

        if(this.lesson.leader && this.identity._id == this.lesson.leader._id 
            && ['proposed', 'assigned', 'development', 'test'].includes(this.lesson.state)){
            response = true;
        }else{
            response = false;
            if(this.parentUrl == 'admin'){
                response = true;
            }
        }

        return response;

    }
}
