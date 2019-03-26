import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';
import { Router } from '@angular/router';



@Component({
    selector: 'login',
    templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
    public title: string;
    public invalid: boolean;
    public emailFound: boolean;
    public submitted = false;
    public loginForm: FormGroup;
    public user: User;
    public identity;
    public token;

    constructor(
        private _formBuilder: FormBuilder,
        private _userService: UserService,
        private _router:Router
    ) {
        this.user = new User();
        this.title = 'Iniciar sesión';
        
    }

    ngOnInit() {
        this.loginForm = this._formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required],
        })
    }



    get f() { return this.loginForm.controls; }

    onSubmit() {
        this.submitted = true;

        if (this.loginForm.invalid) {
            return;
        }

        this.user.email = this.loginForm.value.email;
        this.user.password = this.loginForm.value.password;

        this._userService.signup(this.user).subscribe(
            response => {
                this.identity = response.user;
                console.log(this.identity);
                if (!this.identity || !this.identity._id) {
                    this.invalid = true;
                    this.emailFound = response.email;
                    
                } else {
                    localStorage.setItem('identity', JSON.stringify(this.identity));

                    this._userService.signup(this.user, true).subscribe(
                        response => {
                            this.token = response.token;
                            
                            if (this.token.length <= 0) {
                                this.invalid = true;
                            }else{
                                localStorage.setItem('token', this.token);
                                this._router.navigate(['/inicio']);
                            }
                        },
                        error => {
                            console.log(<any>error);
                            this.invalid = true;                            
                        }
                    );
                }

            },
            error => {
                console.log(<any>error);
                this.invalid = true;
            }
        );
    }
}
