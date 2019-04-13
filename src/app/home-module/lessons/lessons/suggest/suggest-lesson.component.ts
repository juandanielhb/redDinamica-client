import { Component, OnInit, Input } from '@angular/core';
import { FIELDS_SUGGEST_FORM } from '../lessonsData';
import { Validators, FormControl, FormGroup } from '@angular/forms';

import { UserService } from 'src/app/services/user.service';

import { GLOBAL } from 'src/app/services/global';

@Component({
    selector: 'suggest-lesson',
    templateUrl: './suggest-lesson.component.html'
  
})
export class SuggestLessonComponent implements OnInit {
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
    
    constructor(
        private _userService: UserService,
    ) { 
        this.title = 'Enviar experiencia';
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.url = GLOBAL.url;

        this.fields = FIELDS_SUGGEST_FORM;

        this.errorMsg = 'Hubo un error al enviar la sugerencia para una lección. Intentalo de nuevo más tarde.';
        this.successMsg = 'Se ha enviado la sugerencia para la nueva lección correctamente. Gracias por tu sugerencia.';

        this.addForm = new FormGroup({
            title: new FormControl('', Validators.required),
            resume: new FormControl('', Validators.required),
            references: new FormControl('', Validators.required),
            justification: new FormControl('', Validators.required)
        });
    }

    ngOnInit(): void { 
        
    }

    get f() { return this.addForm.controls; }

    restartValues() {
        this.status = null;
        this.submitted = false;
    }

    onSubmit() {
        this.submitted = true;
        this.status = 'error';

        if (this.addForm.invalid) {
            return;
        }

        
    }


}
