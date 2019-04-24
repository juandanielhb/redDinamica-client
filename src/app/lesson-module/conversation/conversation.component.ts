import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LESSON_STATES, ICON_STYLE, MAX_FILE_SIZE } from 'src/app/services/DATA';
import { UserService } from 'src/app/services/user.service';
import { LessonService } from 'src/app/services/lesson.service';
import { UploadService } from 'src/app/services/upload.service';
import { GLOBAL } from 'src/app/services/global';
import { Validators, FormControl } from '@angular/forms';
import { LessonFile } from 'src/app/models/lesson-file.model';
import { LessonMessage } from 'src/app/models/lesson-message.model';

@Component({
    selector: 'conversation',
    templateUrl: './conversation.component.html'

})
export class ConversationComponent implements OnInit {
    public title: string;
    public identity;
    public token;
    public url;

    public lesson_states = LESSON_STATES;
    public icon_style = ICON_STYLE;

    public name;
    public message;
    public files;

    public submitted = false;
    public status;
    public errorMsg;
    public successMsg;

    public groups;

    public selectedGroup;

    @Input() lesson;
    @Output() added = new EventEmitter();

    public MAX_FILE_SIZE = MAX_FILE_SIZE;
    public maxSize = MAX_FILE_SIZE * 1024 * 1024;
    public maxSizeError = false;

    constructor(
        private _userService: UserService,
        private _lessonService: LessonService,
        private _uploadService: UploadService
    ) {
        this.title = 'Conversación';
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.url = GLOBAL.url;
        this.groups = [];

        this.errorMsg = 'Hubo un error agregando la conversación. Intentalo de nuevo más tarde.';
        this.successMsg = 'Se ha creado la conversación correctamente.';

        this.name = new FormControl('', Validators.required);
        this.message = new FormControl('', Validators.required);
        this.files = new FormControl('');

    }

    ngOnInit(): void {
        this.getGroups();
        this.selectedGroup = this.groups[0];
    }

    getGroups() {
        this.groups = [];

        if (this.lesson.conversations.length > 0) {
            this.lesson.conversations.forEach(message => {
                if (!this.groups.includes(message.conversationTitle)) {
                    this.groups.push(message.conversationTitle);
                }
            });
        }

    }


    restartValues(group) {

        this.selectedGroup = group;
        this.status = null;
        this.maxSizeError = false;
        this.submitted = false;
        this.filesToUpload = [];
        this.getGroups();

    }

    getMessages(group) {
        let messages = [];

        if (this.lesson.conversations.length > 0) {
            messages = this.lesson.conversations.filter(message => {
                return message.conversationTitle == group;
            });
        }
        return messages;
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

    onSubmit(group = null) {
        let tempFile, tempMessage;
        this.submitted = true;
        
        tempMessage = new LessonMessage(this.message.value);

        if(group){
            tempMessage.conversationTitle = group;
            this.name.setValue('dummy');
        }else{
            tempMessage.conversationTitle = this.name.value;            
        }

        if (this.name.invalid || this.files.invalid || this.message.invalid || this.maxSizeError) {
            return;
        }
        

        if (this.filesToUpload.length > 0) {

            tempFile = new LessonFile();

            tempFile.fileName = this.filesToUpload[0].name;
            tempFile.created_at = this.filesToUpload[0].lastModified / 1000;
            tempFile.mimetype = this.filesToUpload[0].type;

        }

        tempMessage.created_at = Math.floor(Date.now() / 1000);
        tempMessage.file = tempFile;

        tempMessage.author = this.identity._id;
        
        this.lesson.conversations = this.lesson.conversations.concat(tempMessage);

        console.log(this.lesson.conversations )

        this.editLesson(this.lesson);

    }

    editLesson(lesson) {
        this._lessonService.editLesson(this.token, lesson).subscribe(
            response => {

                console.log(response)
                if (response.lesson && response.lesson._id) {
                    this.lesson = response.lesson;
                    this.status = 'success';
                    this.submitted = false;
                    this.name.reset();

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
                    this.message.reset();
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
}
