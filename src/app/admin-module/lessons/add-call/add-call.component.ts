import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Validators, FormControl, FormGroup } from '@angular/forms';
import { Lesson } from 'src/app/models/lesson.model';
import { UserService } from 'src/app/services/user.service';
import { CallService } from 'src/app/services/call.service';

import { GLOBAL } from 'src/app/services/global';
import { UploadService } from 'src/app/services/upload.service';
import { LessonService } from 'src/app/services/lesson.service';
import { BasicDataService } from 'src/app/services/basicData.service';

import { Call } from 'src/app/models/call.model';

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

    @Input() areas;
    @Input() lesson;
    @Output() added = new EventEmitter();

    constructor(
        private _userService: UserService,
        private _lessonService: LessonService,
        private _bDService: BasicDataService,
        private _callService: CallService,
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
        
        this.lesson.call = this.call;
        this._lessonService.editLesson(this.token, this.lesson).subscribe(
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


}
