import { Component, OnInit, Input } from '@angular/core';
import { FIELDS_SUGGEST_FORM } from '../lessonsData';
import { Validators, FormControl, FormGroup } from '@angular/forms';

import { UserService } from 'src/app/services/user.service';

import { GLOBAL } from 'src/app/services/global';
import { Lesson } from 'src/app/models/lesson.model';
import { LessonService } from 'src/app/services/lesson.service';

@Component({
    selector: 'suggest-lesson',
    templateUrl: './suggest-lesson.component.html'
  
})
export class SuggestLessonComponent implements OnInit {
    public title;
    public identity;
    public token;
    public url;

    public fields;
    public addForm;

    public status;
    public submitted;
    public loading = false;

    public errorMsg;
    public successMsg;
    
    public lesson;

    constructor(
        private _userService: UserService,
        private _lessonService:LessonService
    ) { 
        this.title = 'Sugerir lección';
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.url = GLOBAL.url;

        this.fields = FIELDS_SUGGEST_FORM;

        this.errorMsg = 'Hubo un error al enviar la sugerencia para una lección. Intentalo de nuevo más tarde.';
        this.successMsg = 'Se ha enviado la sugerencia para la nueva lección correctamente. Gracias por tu sugerencia.';

        this.addForm = new FormGroup({
            title: new FormControl('', Validators.required),
            resume: new FormControl('', Validators.required),
            references: new FormControl('', Validators.required),
            justification: new FormControl('', Validators.required)
        });
    }

    ngOnInit(): void { 
        
    }

    get f() { return this.addForm.controls; }

    restartValues() {
        this.status = null;
        this.submitted = false;
    }

    onSubmit() {
        this.submitted = true;
        this.loading = true;
        
        if (this.addForm.invalid) {  
            this.loading = false;          
            return;
        }

        this.lesson = new Lesson();

        this.lesson.title = this.addForm.value.title;
        this.lesson.resume = this.addForm.value.resume;
        this.lesson.references = this.addForm.value.references;
        this.lesson.justification = this.addForm.value.justification;        
        this.lesson.accepted = false;
        this.lesson.author = this.identity._id;
        this.lesson.class = 'suggest';
        
        this._lessonService.addLesson(this.token, this.lesson).subscribe(
            response => {
                if (response.lesson && response.lesson._id) {
                    this.loading = false;
                    this.addForm.reset();
                    this.status = 'success';
                    
                } else {
                    this.status = 'error';
                    this.loading = false;          
                    console.log(<any>response);
                }
        
            },
            error => {
                this.status = 'error';
                this.loading = false;          
                console.log(<any>error);
            }
        );
  
        document.querySelector('.modal-body').scrollTop = 0;
        this.submitted = false;        
    }

    onChanges(): void {

        this.addForm.valueChanges.subscribe(val => {
            if (val) {
                this.status = null;
                this.submitted = false;
            }
        });
    }
}
