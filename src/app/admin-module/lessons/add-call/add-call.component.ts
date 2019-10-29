import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Validators, FormControl, FormGroup } from '@angular/forms';

import { UserService } from 'src/app/services/user.service';


import { GLOBAL } from 'src/app/services/global';
import { UploadService } from 'src/app/services/upload.service';
import { LessonService } from 'src/app/services/lesson.service';
import { BasicDataService } from 'src/app/services/basicData.service';

import { Call } from 'src/app/models/call.model';
import { Lesson } from 'src/app/models/lesson.model';

@Component({
    selector: 'add-call',
    templateUrl: './add-call.component.html'

})
export class AddCallComponent implements OnInit {
    public title;
    public identity;
    public token;
    public url;

    public callForm;
    public call;

    public status;
    public submitted;
    public check;

    public errorMsg;
    public successMsg;

    public newLesson = new Lesson();

    @Input() areas;
    @Input() lesson;
    @Input() nextVersion;
    @Output() added = new EventEmitter();

    constructor(
        private _userService: UserService,
        private _lessonService: LessonService,
        private _bDService: BasicDataService,
        private _uploadService: UploadService,
    ) {
        this.title = 'Crear convocatoria';
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.url = GLOBAL.url;

        this.errorMsg = 'Hubo un error creando la convocatoria. Intentalo de nuevo más tarde.';
        this.successMsg = 'Se ha creado la convocatoria correctamente.';

        this.callForm = new FormGroup({
            text: new FormControl('', Validators.required),
            areas: new FormControl('', Validators.required),
            level: new FormControl('', Validators.required),
        });


    }

    ngOnInit(): void {

        this.callForm.patchValue({
            areas: this.lesson.knowledge_area
        });
    }

    ngDoCheck(): void {

        if (this.check && this.lesson._id) {

            this.callForm.patchValue({
                areas: this.lesson.knowledge_area,
                level: '',
                text: ''
            });

            this.check = false;
        }

    }

    get f() { return this.callForm.controls; }

    restartValues() {
        this.status = null;
        this.submitted = false;
        this.check = true;
        this.lesson._id = null;
        this.added.emit();
    }

    onSubmit() {
        let tempArray = [];
        this.submitted = true;


        if (this.callForm.invalid) {
            return;
        }

        this.callForm.value.areas.forEach(element => {
            tempArray.push(element._id);
        });


        this.lesson.knowledge_area = tempArray;
        this.lesson.level = this.callForm.value.level;

        this.call = new Call(this.callForm.value.text);
        this.call.visible = true;
        this.call.author = this.identity.id;        

        if (this.nextVersion) {
            this.newLesson.state = 'proposed';

            this.newLesson.title = this.lesson.title;
            this.newLesson.resume = this.lesson.resume;
            this.newLesson.references = this.lesson.references;
            this.newLesson.accepted = true;
            this.newLesson.author = this.lesson.author;
            this.newLesson.version = this.lesson.version + 1;

            this.newLesson.justification = this.lesson.justification;

            this.newLesson.knowledge_area = tempArray;
            this.newLesson.level = this.callForm.value.level;

            this.saveLesson(this.newLesson, this.call);

        } else {

            this.lesson.call = this.call;
            this.editLesson(this.lesson);
        }


    }

    editLesson(lesson) {
        this._lessonService.editLesson(this.token, lesson).subscribe(
            response => {
                if (response.lesson._id) {
                    this.status = 'success';
                    this.added.emit();


                } else {
                    this.status = 'error';
                }
            },
            error => {
                this.status = 'error';
                console.log(<any>error);
            }
        );

        this.submitted = false;
    }

    saveLesson(lesson, call) {
        this._lessonService.addLesson(this.token, lesson).subscribe(
            response => {
                if (response.lesson._id) {
                    this.status = 'success';

                    this.lesson.son_lesson = response.lesson._id;
                    this.editLesson(this.lesson);
                    
                    this.newLesson = response.lesson;
                    delete call._id;
                    delete call.interested;
                    this.newLesson.call = call;
                    this.newLesson.father_lesson = this.lesson._id;
                    this.editLesson(this.newLesson);
                    this.added.emit();


                } else {
                    this.status = 'error';
                }
            },
            error => {
                this.status = 'error';
                console.log(<any>error);
            }
        );

        this.submitted = false;
    }
}
