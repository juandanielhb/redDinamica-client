import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Validators, FormControl, FormGroup } from '@angular/forms';
import { Resource } from 'src/app/models/resource.model';
import { UserService } from 'src/app/services/user.service';
import { ResourceService } from 'src/app/services/resource.service';

import { GLOBAL } from 'src/app/services/global';
import { UploadService } from 'src/app/services/upload.service';
import { FIELDS_FORM } from '../resources/resourcesData';
import { MAX_FILE_SIZE } from 'src/app/services/DATA';

@Component({
    selector: 'edit-resource',
    templateUrl: './edit-resource.component.html'

})
export class EditResourceComponent implements OnInit {
    public title;
    public identity;
    public token;
    public url;

    public fields;
    public editForm;

    public status;
    public submitted;

    public errorMsg;
    public successMsg;

    public prevResource = new Resource('', '', '', '', '');
    @Input() resource = new Resource('', '', '', '', '');

    @Output() edited = new EventEmitter();

    public MAX_FILE_SIZE = MAX_FILE_SIZE;
    public maxSize = MAX_FILE_SIZE * 1024 * 1024;
    public maxSizeError = false;

    constructor(
        private _userService: UserService,
        private _resourceService: ResourceService,
        private _uploadService: UploadService,
    ) {
        this.title = 'Editar recurso';
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.url = GLOBAL.url;

        this.fields = FIELDS_FORM;

        this.errorMsg = 'Hubo un error al editar el recurso. Intentalo de nuevo más tarde.';
        this.successMsg = 'Se ha editado el recurso correctamente.';

        this.editForm = new FormGroup({
            name: new FormControl('', Validators.required),
            type: new FormControl('', Validators.required),
            description: new FormControl('', Validators.required),
            source: new FormControl('', Validators.required),
            file: new FormControl(''),
            url: new FormControl('', Validators.required)
        });

        this.editForm.controls.type.disable();
    }

    ngOnInit(): void {
        this.editForm.patchValue({
            name: this.resource.name,
            type: this.resource.type,
            description: this.resource.description,
            source: this.resource.source,
            url: this.resource.url
        });


    }

    ngDoCheck(): void {
        if (this.prevResource._id != this.resource._id) {
            this.editForm.patchValue({
                name: this.resource.name,
                type: this.resource.type,
                description: this.resource.description,
                source: this.resource.source,
                url: this.resource.url
            });

            if (['video', 'document', 'software'].includes(this.resource.type)) {
                this.editForm.controls.url.disable();
                this.editForm.controls.url.setValue('');
                this.editForm.controls.file.enable();
            } else {
                this.editForm.controls.url.enable();
                this.editForm.controls.file.setValue('');
                this.filesToUpload = null;
                this.editForm.controls.file.disable();
            }


            this.prevResource = this.resource;
        }
    }

    get f() { return this.editForm.controls; }

    restartValues() {
        this.status = null;
        this.submitted = false;
        this.edited.emit();
        this.editForm.controls.file.reset();
    }

    setDisabled() {
        this.editForm.get('type').valueChanges.subscribe(
            value => {
                if (['video', 'document', 'software'].includes(value)) {
                    this.editForm.controls.url.disable();
                    this.editForm.controls.url.setValue('');
                    this.editForm.controls.file.enable();
                } else {
                    this.editForm.controls.url.enable();
                    this.editForm.controls.file.setValue('');
                    this.filesToUpload = null;
                    this.editForm.controls.file.disable();
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

        if (this.editForm.invalid) {
            return;
        }

        if (this.editForm.value.url) {
            this.resource.url = this.editForm.value.url;
        }

        this.resource.name = this.editForm.value.name;
        this.resource.description = this.editForm.value.description;
        this.resource.source = this.editForm.value.source;

        this._resourceService.editResource(this.token, this.resource).subscribe(
            response => {
                if (response.resource && response.resource._id) {

                    this.resource = response.resource;

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
                                this.resource = result.resource;
                            }

                        });

                    } else {
                        this.status = 'error';
                    }

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

    }

    onChanges(): void {

        this.editForm.valueChanges.subscribe(val => {
            if (val) {
                this.status = null;
                this.submitted = false;
            }
        });
    }
}
