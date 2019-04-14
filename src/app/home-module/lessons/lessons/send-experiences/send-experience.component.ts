import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FIELDS_SEND_FORM } from '../lessonsData';

import { UserService } from 'src/app/services/user.service';


import { GLOBAL } from 'src/app/services/global';
import { Lesson } from 'src/app/models/lesson.model';
import { LessonService } from 'src/app/services/lesson.service';
import { BasicDataService } from 'src/app/services/basicData.service';
import { KnowledgeArea } from 'src/app/models/knowledge-area.model';


@Component({
    selector: 'send-experience',
    templateUrl: './send-experience.component.html'

})
export class SendExperienceComponent implements OnInit {
    public title;
    public identity;
    public token;
    public url;

    public fields;
    public sendForm;

    public status;
    public submitted;

    public errorMsg;
    public successMsg;

    public lesson;


    public items = {
        areas: []
    };

    public allAreas;
    public area;

    constructor(
        private _userService: UserService,
        private _lessonService: LessonService,
        private _bDService: BasicDataService
    ) {
        this.title = 'Enviar experiencia';
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.url = GLOBAL.url;

        this.fields = FIELDS_SEND_FORM;

        this.errorMsg = 'Hubo un error al enviar la experiencia. Intentalo de nuevo más tarde.';
        this.successMsg = 'Se ha enviado la experiencia correctamente. Gracias por tu participación.';

        this.sendForm = new FormGroup({
            title: new FormControl('', Validators.required),
            resume: new FormControl('', Validators.required),
            references: new FormControl('', Validators.required),
            level: new FormControl('', Validators.required),
            type: new FormControl('', Validators.required),
            areas: new FormControl('', Validators.required)
        });
    }

    ngOnInit(): void {
        this.getAllAreas();
    }

    get f() { return this.sendForm.controls; }

    restartValues() {
        this.status = null;
        this.submitted = false;
    }

    async onSubmit() {
        let tempArray = [];
        let areasToAdd = [];

        this.submitted = true;
        

        if (this.sendForm.invalid) {
            return;
        }

        this.lesson = new Lesson();

        this.lesson.title = this.sendForm.value.title;
        this.lesson.resume = this.sendForm.value.resume;
        this.lesson.references = this.sendForm.value.references;
        this.lesson.level = this.sendForm.value.level;
        this.lesson.type = this.sendForm.value.type;
        this.lesson.accepted = false;
        this.lesson.knowledge_area = [];

        this.sendForm.value.areas.forEach(element => {
            if (element._id) {
                tempArray.push(element._id);
            } else {
                let area = new KnowledgeArea(element.name);
                area.used = true;
                areasToAdd.push(area);
            }
        });

        this.lesson.knowledge_area = tempArray;

        if (areasToAdd.length > 0) {            

            let responseAddAreas = await this._bDService.addKnowledgeAreas(areasToAdd)
            .toPromise()
            .catch((error) => {
                this.status = 'error';
                console.log(<any>error);
            });

            if (responseAddAreas.areas) {
                responseAddAreas.areas.forEach(element => {
                    this.lesson.knowledge_area.push(element._id);
                });                
            } else {
                this.status = 'error';
                return;
            }

            localStorage.removeItem('areas');
            this.getAllAreas();
        }

        let responseAddLesson = await this._lessonService.addLesson(this.token, this.lesson)
            .toPromise()
            .catch((error) => {
                this.status = 'error';
                console.log(<any>error);
            });

        if (responseAddLesson.lesson && responseAddLesson.lesson._id) {
            this.status = 'success';
            this.sendForm.reset();
        } else {
            this.status = 'error';
            console.log(<any>responseAddLesson);
        }

        this.submitted = false;
    }

    getAllAreas() {
        this.allAreas = JSON.parse(localStorage.getItem('areas'));

        if (!this.allAreas) {

            this._bDService.getAllKnowledgeAreas().subscribe(
                response => {
                    if (response.areas) {
                        this.allAreas = response.areas;
                        this.items.areas = this.allAreas;
                        localStorage.setItem('areas', JSON.stringify(this.allAreas));
                    }
                }, error => {
                    console.log(<any>error);
                });
        } else {
            this.items.areas = this.allAreas;
        }
    }
}
