import { Component, Input} from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { GLOBAL } from 'src/app/services/global';

import { FIELDS_DETAILS } from '../resourcesData';
import { ICON_STYLE } from 'src/app/services/DATA';


@Component({
    selector: 'details-resource',
    templateUrl: './details-resource.component.html'
})
export class DetailsResourceComponent {
    public title;
    public identity;
    public token;
    public url;

    public fields;
    public types;

    @Input() resource;

    constructor(
        private _userService: UserService
    ){
        this.title = 'Agregar recurso';
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.url = GLOBAL.url;

        this.fields = FIELDS_DETAILS;
        this.types = ICON_STYLE;
    }

    ngOnInit(): void {
    }

    getLink(url) {
        if (url.includes('http://') || url.includes('https://')) {
            return url;
        } else {
            return `http://${url}`;
        }
    }

}
