import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';



@Component({
    selector: 'login',
    templateUrl: './login.component.html'    
})
export class LoginComponent implements OnInit {
    public title:string;
    public status:string;
    public submitted = false;
    public loginForm: FormGroup;
    

    constructor(
        private _formBuilder:FormBuilder
    ) { 
        this.title = 'Iniciar sesión';
        this.status = '';        
    }

    ngOnInit(){
        this.loginForm = this._formBuilder.group({
            email:['', [Validators.required, Validators.email]],
            password:['', Validators.required],
        })        
    }

    get f() {return this.loginForm.controls; }

    onSubmit(){
        this.submitted = true;

        if (this.loginForm.invalid) {
            return;
        }

        alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.loginForm.value));
    }
}
