import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

import { FIELDS_FORM } from '../services/profileData';

@Component({
    selector: 'info',
    templateUrl: './info.component.html'
})
export class InfoComponent {
    public title: string;
    public fieldsForm;
    public identity;

    constructor(
        private _userService: UserService
    ) {
        this.identity = _userService.getIdentity();
        this.title = 'Información';
        this.fieldsForm = FIELDS_FORM;
    }


}
