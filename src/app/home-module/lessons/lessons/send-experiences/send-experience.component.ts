import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FIELDS_SEND_FORM } from '../lessonsData';

import { UserService } from 'src/app/services/user.service';


import { GLOBAL } from 'src/app/services/global';


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
    
    constructor(
        private _userService: UserService,
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
        
    }

    get f() { return this.sendForm.controls; }

    restartValues() {
        this.status = null;
        this.submitted = false;
    }

    onSubmit() {
        this.submitted = true;
        this.status = 'error';

        if (this.sendForm.invalid) {
            return;
        }
    }
}
