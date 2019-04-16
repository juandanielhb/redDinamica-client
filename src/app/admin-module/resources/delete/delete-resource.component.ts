import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Validators, FormControl, FormGroup } from '@angular/forms';
import { Resource } from 'src/app/models/resource.model';
import { UserService } from 'src/app/services/user.service';
import { ResourceService } from 'src/app/services/resource.service';

import { GLOBAL } from 'src/app/services/global';
import { UploadService } from 'src/app/services/upload.service';
import { FIELDS_FORM } from '../resources/resourcesData';


@Component({
    selector: 'delete-resource',
    templateUrl: './delete-resource.component.html'

})
export class DeleteResourceComponent implements OnInit {
    public title;
    public identity;
    public token;
    public url;

    public resource;

    @Input() resourceId = '';
    @Output() deleted = new EventEmitter();


    constructor(
        private _userService: UserService,
        private _resourceService: ResourceService
        
    ) {
        this.title = 'Eliminar recurso';
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.url = GLOBAL.url;
    }

    ngOnInit(): void {

    }

    delete(){
        this._resourceService.deleteResource(this.token, this.resourceId).subscribe(
            response => {
                console.log(response)
                if(response && response.resource){

                    this.deleted.emit();
                    
                }

            },
            error =>{
                console.log(<any>error);
            }
        )
    }
}
