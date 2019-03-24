import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';



@Component({
    selector: 'recoverPassword',
    templateUrl: './recoverPassword.component.html'    
})
export class RecoverPasswordComponent implements OnInit {
    public title:string;
    public status:string;
    public recoverPassForm: FormGroup;
    public submitted = false;
    

    constructor(
        private _formBuilder: FormBuilder
    ) { 
        this.title = '¿Olvidaste tu contraseña?';       
    }

    ngOnInit(){
        this.recoverPassForm = this._formBuilder.group({
            email: ['', [Validators.required,Validators.email]]
        })
    }

    get f() { return this.recoverPassForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.recoverPassForm.invalid) {
            return;
        }

        alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.recoverPassForm.value));
    }    
}
