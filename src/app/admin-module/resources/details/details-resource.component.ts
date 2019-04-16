import { Component, OnInit, Input } from '@angular/core';

import { Validators, FormControl, FormGroup } from '@angular/forms';
import { Resource } from 'src/app/models/resource.model';
import { UserService } from 'src/app/services/user.service';
import { ResourceService } from 'src/app/services/resource.service';

import { GLOBAL } from 'src/app/services/global';
import { UploadService } from 'src/app/services/upload.service';
import { FIELDS_FORM,  ICON_STYLE } from '../resources/resourcesData';

@Component({
    selector: 'details-resource',
    templateUrl: './details-resource.component.html'

})
export class DetailsResourceComponent implements OnInit {
    public title;
    public identity;
    public token;
    public url;

    public fields;
    public types;

    @Input() resource;

    constructor(
        private _userService: UserService

    ) {
        this.title = 'Agregar recurso';
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.url = GLOBAL.url;

        this.fields = FIELDS_FORM;

        this.types = ICON_STYLE;    

    }

    ngOnInit(): void {

    }


    getLink(url){
        if(url.includes('http://') || url.includes('https://')){
            return url;
        }else{
            return `http://${url}`;
        }
    }
    
}
