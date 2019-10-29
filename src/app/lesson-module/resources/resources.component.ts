import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LESSON_STATES, ICON_STYLE, MAX_FILE_SIZE } from 'src/app/services/DATA';
import { Validators, FormControl } from '@angular/forms';
import { LessonService } from 'src/app/services/lesson.service';

import { UserService } from 'src/app/services/user.service';
import { GLOBAL } from 'src/app/services/global';
import { UploadService } from 'src/app/services/upload.service';
import { LessonFile } from 'src/app/models/lesson-file.model';
import { Router, ActivatedRoute } from '@angular/router';
import { resolveNaptr } from 'dns';

@Component({
    selector: 'resources',
    templateUrl: './resources.component.html'

})
export class ResourcesComponent implements OnInit {
    public title: string;
    public identity;
    public token;
    public url;

    public lesson_states = LESSON_STATES;
    public icon_style = ICON_STYLE;

    public name;
    public files;

    public submitted = false;
    public status;
    public errorMsg;
    public successMsg;
    public errorMsgEdit;
    public successMsgEdit;

    public groups;

    public editMode = false;
    public selectedGroup;

    public parentUrl;

    @Input() lesson;
    @Output() added = new EventEmitter();

    public MAX_FILE_SIZE = MAX_FILE_SIZE;
    public maxSize = MAX_FILE_SIZE * 1024 * 1024;
    public maxSizeError = false;

    constructor(
        private _userService: UserService,
        private _lessonService: LessonService,
        private _uploadService: UploadService,
        private _router: Router,
        private _route: ActivatedRoute
    ) {
        this.title = 'Recursos';
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.url = GLOBAL.url;
        this.groups = [];

        this.errorMsg = 'Hubo un error agregando el grupo. Intentalo de nuevo más tarde.';
        this.successMsg = 'Se ha creado el grupo de recursos correctamente.';
        this.errorMsgEdit = 'Hubo un error editando el grupo. Intentalo de nuevo más tarde.';
        this.successMsgEdit = 'Se ha editado el grupo de recursos correctamente.';

        this.name = new FormControl('', Validators.required);
        this.files = new FormControl('', Validators.required);
    }

    ngOnInit(): void {
        this.getGroups();
        this.selectedGroup = this.groups[0];

        this._route.parent.url.subscribe(value => {
            this.parentUrl = value[0].path;
        });
    }

    getGroups() {
        this.groups = [];

        if (this.lesson.files.length > 0) {
            this.lesson.files.forEach(file => {
                if (!this.groups.includes(file.groupTitle)) {
                    this.groups.push(file.groupTitle);
                }
            });
        }
    }

    restartValues(group) {
        this.selectedGroup = group;
        this.status = null;
        this.maxSizeError = false;
        this.submitted = false;
        this.editMode = false;
        this.files.setValidators(Validators.required);
        this.getGroups();

    }

    deleteFile(id){
        let tempfilesArray = [];
        this.lesson.files.forEach(file => {
            if(file._id != id){
                tempfilesArray.push(file);
            }
        });

        this.lesson.files = tempfilesArray;

        this.editLesson(this.lesson);
    }

    getfiles(group) {
        let files = [];

        if (this.lesson.files.length > 0) {
            files = this.lesson.files.filter(file => {
                return file.groupTitle == group;
            });
        }

        return files;
    }

    removeSpaces(text) {
        return text.trim().replace(' ', '');
    }

    public filesToUpload = [];
    fileChangeEvent(fileInput: any) {
        this.filesToUpload = <Array<File>>fileInput.target.files;

        if (this.filesToUpload.length > 0) {
            for (let i = 0; i < this.filesToUpload.length; i++) {
                if (this.maxSize < this.filesToUpload[i].size) {
                    this.maxSizeError = true;
                    return;
                } else {
                    this.maxSizeError = false;
                }
            }
        }

    }

    deleteGroup(group) {
        let tempFilesArray = [];

        tempFilesArray = this.lesson.files.filter(file => {
            return file.groupTitle != group;
        });

        this.lesson.files = tempFilesArray;

        this.groups.splice(this.groups.indexOf(group), 1);

        this.editLesson(this.lesson);
    }

    initEditGroup(event, group) {
        event.stopPropagation();

        this.editMode = true;
        this.name.setValue(group);

        this.files.clearValidators();
    }

    public filesUploaded = [];
    onSubmit(group = null) {
        let tempFile;
        this.submitted = true;

        if (this.name.invalid || this.files.invalid || this.maxSizeError) {
            return;
        }

        if (this.filesToUpload.length > 0) {
            
            for (let i = 0; i < this.filesToUpload.length; i++) {
                tempFile = new LessonFile();

                tempFile.groupTitle = this.name.value;
                tempFile.fileName = this.filesToUpload[i].name;
                tempFile.created_at = this.filesToUpload[i].lastModified / 1000;
                tempFile.mimetype = this.filesToUpload[i].type;

                this.filesUploaded.push(tempFile);
            }

        }

        
        this.lesson.files = this.lesson.files.concat(this.filesUploaded);
        this.filesUploaded = [];
        
        if (group != null) {
            
            if (group != this.name.value) {
                
                this.filesUploaded = this.lesson.files.map(file => {
                    if(file.groupTitle == group){
                        file.groupTitle = this.name.value;
                    }
                    return file;
                });
                
                this.lesson.files = this.filesUploaded;
                this.filesUploaded = [];
            }
        }
        
        this.editLesson(this.lesson);
        
    }
    
    editLesson(lesson) {
        this._lessonService.editLesson(this.token, lesson).subscribe(
            response => {
                
                if (response.lesson && response.lesson._id) {
                    this.lesson = response.lesson;

                    if (!this.editMode) {
                        this.name.reset();                        
                    }

                    if (this.filesToUpload.length > 0) {
                        //Upload profile imaage
                        this._uploadService.makeFileRequest(
                            this.url + 'upload-lesson/' + this.lesson._id,
                            [],
                            this.filesToUpload,
                            this.token,
                            'files'
                        ).then((result: any) => {
                            
                    
                        }).catch((error) => {
                            this.status = 'error';
                            console.log(<any>error);
                        });
                    }

                    this.files.reset();
                    this.status = 'success';
                    this.submitted = false;
                    this.getGroups();

                } else {
                    this.status = 'error';

                }
            },
            error => {
                if (error != null) {
                    this.status = 'error';
                    console.log(<any>error);
                }
            }
        );

    }

    showResources(){
        let response;
        if(this.lesson.leader && this.lesson.leader._id == this.identity._id
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

    onChanges(){
        this.name.valueChanges.subscribe(val => {
            if (val) {
                this.status = null;
                this.submitted = false;
            }
        });
    }
}
