import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { Validators, FormControl, FormGroup } from '@angular/forms';
import { Resource } from 'src/app/models/resource.model';
import { UserService } from 'src/app/services/user.service';
import { ResourceService } from 'src/app/services/resource.service';
import { FIELDS_FORM } from '../resourcesData';
import { GLOBAL } from 'src/app/services/global';
import { UploadService } from 'src/app/services/upload.service';
import { CachedSource } from 'webpack-sources';
import { MAX_FILE_SIZE } from 'src/app/services/DATA';

@Component({
    selector: 'add-resource',
    templateUrl: './add-resource.component.html'

})
export class AddResourceComponent implements OnInit {
    public title;
    public identity;
    public token;
    public url;

    public fields;
    public addForm;

    public status;
    public submitted;

    public errorMsg;
    public successMsg;

    public resource;

    public MAX_FILE_SIZE = MAX_FILE_SIZE;
    public maxSize = MAX_FILE_SIZE * 1024 * 1024;
    public maxSizeError = false;

    @Output() added = new EventEmitter();

    constructor(
        private _userService: UserService,
        private _resourceService: ResourceService,
        private _uploadService: UploadService,
    ) {
        this.title = 'Agregar recurso';
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.url = GLOBAL.url;

        this.fields = FIELDS_FORM;

        this.errorMsg = 'Hubo un error agregando el nuevo recurso. Intentalo de nuevo más tarde.';
        this.successMsg = 'Se ha creado el nuevo recurso correctamente.';

        this.addForm = new FormGroup({
            name: new FormControl('', Validators.required),
            type: new FormControl('', Validators.required),
            description: new FormControl('', Validators.required),
            source: new FormControl('', Validators.required),
            file: new FormControl('', Validators.required),
            url: new FormControl('', Validators.required)
        });



    }

    ngOnInit(): void {

    }

    get f() { return this.addForm.controls; }

    restartValues() {
        this.status = null;
        this.submitted = false;
        this.maxSizeError = false;
    }

    setDisabled() {
        this.addForm.get('type').valueChanges.subscribe(
            value => {
                if (['video', 'document', 'software'].includes(value)) {
                    this.addForm.controls.url.disable();
                    this.addForm.controls.url.setValue('');
                    this.addForm.controls.file.enable();
                } else {
                    this.addForm.controls.url.enable();
                    this.addForm.controls.file.setValue('');
                    this.filesToUpload = null;
                    this.addForm.controls.file.disable();
                }
            }
        );
    }

    public filesToUpload: Array<File>;
    fileChangeEvent(fileInput: any) {

        this.filesToUpload = <Array<File>>fileInput.target.files;
        
        if (this.maxSize < fileInput.target.files[0].size) {
            this.maxSizeError = true;
            return;
        }

        this.maxSizeError = false;

    }

    onSubmit() {
        this.submitted = true;

        if (this.addForm.invalid) {
            return;
        }

        this.resource = new Resource(
            this.addForm.value.name,
            this.addForm.value.type,
            this.addForm.value.source,
            this.addForm.value.description,
            this.identity._id);

        if (this.addForm.value.url) {
            this.resource.url = this.addForm.value.url;
        }

        this.resource.accepted = true;


        this._resourceService.addResource(this.token, this.resource).subscribe(
            response => {

                if (response.resource && response.resource._id) {
                    this.status = 'success';


                    if (this.filesToUpload && this.filesToUpload.length > 0) {

                        // Upload post image
                        this._uploadService.makeFileRequest(
                            this.url + 'upload-resource/' + response.resource._id,
                            [],
                            this.filesToUpload,
                            this.token,
                            'file'
                        ).then((result: any) => {

                            if (result.resource._id) {
                                this.status = 'success';
                                this.added.emit();

                            } else {
                                this.status = 'error';

                            }

                        }).catch( error =>{
                            console.log(<any>error)
                            this.status = 'error';
                        }

                        );

                        this.added.emit();                       

                    } else {
                        this.status = 'error';
                    }

                    this.addForm.reset();   
                    this.status = 'success';
                    
                } else {
                    this.status = 'error';
                }
            },
            error => {
                this.status = 'error';
                console.log(<any>error);
            }
        );
        
        document.querySelector('.modal-body').scrollTop = 0;
        this.submitted = false;
        this.added.emit();
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
