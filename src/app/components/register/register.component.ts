import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MustMatch } from './helpers/must-match.validator';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'register',
    templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {
    public title: string;
    public registerForm: FormGroup;
    public submitted = false;

    public user: User;
    public message:String;

    constructor(
        private _formBuilder: FormBuilder,
        private _userService: UserService,
        private _route: ActivatedRoute,
        private _router:Router
    ) {
        this.title = 'Registro';
        this.user = new User();
    }

    ngOnInit() {
        
        this.registerForm = this._formBuilder.group({ 
            name: ['', Validators.required],
            surname: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]],
            confirmPassword: ['', Validators.required],
            profession: ['', Validators.required],
            institution: ['', Validators.required],
            category: '',
            experience: ''
        }, 
        {
            validator: MustMatch('password', 'confirmPassword')
        });

    }

    
    get f() { return this.registerForm.controls; }

    onSubmit() {
        this.submitted = true;    

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }

        this.user.name = this.registerForm.value.name;
        this.user.surname = this.registerForm.value.surname;
        this.user.email = this.registerForm.value.email;
        this.user.password = this.registerForm.value.password;
        this.user.role = this.registerForm.value.category;
        this.user.about = this.registerForm.value.experience;
        this.user.profession = this.registerForm.value.profession;
        this.user.institution = this.registerForm.value.institution;
        //this.user.picture = "user-default.png";

        if(['student', 'guest'].includes(this.f.category.value)){
            this.user.about = '';
        }                  

        console.log(this.user);

        this._userService.register(this.user).subscribe(
            response => {
                if(response.user && response.user._id){
                    localStorage.setItem('identity', JSON.stringify(response.user));
                    this._router.navigate(['/inicio']);                    
                }else{
                    this.message = 'No ha sido posible realizar el registro, el correo electrónico ya se encuentra registrado.'                   
                }
            },
            error => {
                console.log(<any>error);
            }
        );
        
    }
}
