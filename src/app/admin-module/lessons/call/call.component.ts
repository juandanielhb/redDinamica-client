import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LABEL_PROFILE } from '../../users/services/usersData';
import { UserService } from 'src/app/services/user.service';
import { LessonService } from 'src/app/services/lesson.service';
import { GLOBAL } from 'src/app/services/global';
import { User } from 'src/app/models/user.model';

@Component({
    selector: 'call',
    templateUrl: './call.component.html'
  
})
export class CallComponent implements OnInit {
    public title:string;
    public identity;
    public token;
    public url;

    public categories = {
        teacher: {
            label:"Docente",
            class:"badge-success"
        },
        guest: {
            label:"Invitado",
            class:"badge-orange"
        },
        student: {
            label:"Estudiante",
            class:"badge-info"
        },
        expert: {
            label:"Facilitador",
            class:"badge-purple"
        },
        admin: {
            label:"Administrador",
            class:"badge-green"
        },
        delegated_admin: {
            label:"Administrador",
            class:"badge-green"
        }
    };    

    public profile_label;
    
    public items = [];

    @Input() lesson;
    @Output() added = new EventEmitter();
    
    constructor(
        private _userService: UserService,
        private _lessonService: LessonService
    ) { 
        this.title = 'Detalles convocatoria';
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.url = GLOBAL.url;

        this.profile_label = LABEL_PROFILE;
        
    }

    ngOnInit(): void { 
    }

    addGroup(interested){
        this.lesson.development_group.push(interested);

        this.items = this.lesson.development_group;

        
        console.log(this.items)
    }

    removeGroup(interested){
        let found = this.lesson.development_group.find((item, ix) => {
            if(item._id == interested._id){
                this.lesson.development_group.splice(ix,1);
            }
            return item._id == interested._id;            
        });        

        this.items = this.lesson.development_group;
        
    }

    isInDevelopmentGroup(interested){
        let found = this.lesson.development_group.find(item => {
            return item._id == interested._id;
        });

        if(found){
            return true;
        }else{
            return false;
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

                    
                }
            },
            error => {
                console.log(<any>error);
            }
        )
    }
   
}
