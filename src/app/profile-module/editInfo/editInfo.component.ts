import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

import { FIELDS_FORM } from '../services/profileData';

@Component({
    selector: 'editInfo',
    templateUrl: './editInfo.component.html'
})
export class EditInfoComponent {
    public title: string;
    public fieldsForm;
    public identity;

    constructor(
        private _userService: UserService
    ) {
        this.identity = _userService.getIdentity();
        this.title = 'Editar perfil';
        this.fieldsForm = FIELDS_FORM;
    }


}
