import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LABEL_PROFILE } from '../../users/services/usersData';
import { UserService } from 'src/app/services/user.service';
import { LessonService } from 'src/app/services/lesson.service';
import { GLOBAL } from 'src/app/services/global';
import { User } from 'src/app/models/user.model';
import { FormControl, Validators } from '@angular/forms';

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

    public expertUsers = [];
    public profile_label;
    
    public expert;
    public leader;

    public submitted;
    public status;

    @Input() lesson;
    @Output() assigned = new EventEmitter();
    
    constructor(
        private _userService: UserService,
        private _lessonService: LessonService
    ) { 
        this.title = 'Detalles convocatoria';
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.url = GLOBAL.url;

        this.leader = new FormControl('', Validators.required);
        this.leader.disable();
        this.expert = new FormControl('', Validators.required);

        this.profile_label = LABEL_PROFILE;
        
    }

    ngOnInit(): void { 
        this.getExpertUsers();
    }

    
    restartValues() {
        this.status = null;
        this.submitted = false;
        this.assigned.emit();
    }

    getExpertUsers(){
        this._userService.getAllUsers().subscribe(
            response => {             
                this.expertUsers = response.users.filter(user => {
                    return user.role == 'expert';
                });
            },
            error => {
                console.log(<any>error);
            }
        )
    }

    addGroup(interested){
        this.lesson.development_group.push(interested);

        if(this.lesson.development_group.length > 0){
            this.leader.enable();
        } 

    }

    removeGroup(interested){
        let found = this.lesson.development_group.find((item, ix) => {
            if(item._id == interested._id){
                this.lesson.development_group.splice(ix,1);
            }
            return item._id == interested._id;            
        });

        if(this.lesson.development_group.length == 0){
            this.leader.disable();
        }
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

    editLesson() {
        this.submitted = true;

        if(this.expert.invalid || this.leader.invalid){
            return;
        }

        this.lesson.leader = this.leader.value;
        this.lesson.expert = this.expert.value;    
        this.lesson.state = 'assigned';
        this.lesson.visible = false;

        this._lessonService.editLesson(this.token, this.lesson).subscribe(
            response => {
                if (response && response.lesson._id) {
                    this.status = 'success';
                    this.assigned.emit();
                }
            },
            error => {
                this.status = 'error';
                console.log(<any>error);
            }
        )
    }
   
}
