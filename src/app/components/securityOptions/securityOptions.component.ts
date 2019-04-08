import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';


import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { GLOBAL } from 'src/app/services/global';
import { ActivatedRoute, Router } from '@angular/router';
import { MustMatch } from 'src/app/helpers/must-match.validator';
import { Location } from '@angular/common';

@Component({
    selector: 'securityOptions',
    templateUrl: './securityOptions.component.html'

})
export class SecurityOptionsComponent {
    public title: string;
    public url: string;
    public token: string;
    public identity;
    public fieldsForm;
    public editPassword: FormGroup;
    public password: FormControl;

    public user: User = new User();
    public status: string;
    public deleteStatus: string;
    public submitted = false;
    public deleteSubmitted = false;
    public passwordMinLength;

    constructor(
        private _userService: UserService,
        private _formBuilder: FormBuilder,
        private _route: ActivatedRoute,
        private _router: Router,
        private _location:Location

    ) {
        this.title = 'Opciones de seguridad';
        this.url = GLOBAL.url;


        this.identity = this._userService.getIdentity();
        this.fieldsForm = [
            {
                id: "actualPassword",
                label: "Contraseña actual",
                type: "password",
                placeholder: "Contraseña actual",
                required: true
            },
            {
                id: "newPassword",
                label: "Nueva contraseña",
                type: "password",
                placeholder: "Nueva contraseña",
                required: true
            },
            {
                id: "confirmPassword",
                label: "Confirmar contraseña",
                type: "password",
                placeholder: "Confirmar nueva contraseña",
                required: true
            },
        ];




    }

    ngOnInit(): void {
        this.passwordMinLength = 6;

        this.editPassword = this._formBuilder.group({
            actualPassword: ['', Validators.required],
            newPassword: ['', [Validators.required, Validators.minLength(this.passwordMinLength)]],
            confirmPassword: ['', Validators.required]
        },
            {                
                validator: MustMatch('newPassword', 'confirmPassword')
            });

        this.password = new FormControl('', Validators.required);


    }

    get f() { return this.editPassword.controls; }

    onSubmit() {
        this.submitted = true;

        if (this.editPassword.invalid) {
            return;
        }

        this.user.password = this.editPassword.value.actualPassword;
        this.user.email = this.identity.email;

        this._userService.validatePass(this.user).subscribe(
            response => {
                if (response) {
                    this.status = 'success';
                    this.user.password = this.editPassword.value.newPassword;
                    
                    this._userService.changePass(this.user).subscribe(
                        response => {
                            if (response.user && response.user._id) {
                                this.status = 'success';
                            } else {
                                this.status = 'error';
                            }
                        },
                        error => {
                            this.status = 'error';
                            console.log(<any>error);
                        }
                    )
                } else {
                    this.status = 'error';
                }
                this.editPassword.reset();
                this.submitted = false;
            },
            error => {
                this.status = 'error';
                this.editPassword.reset();
                this.submitted = false;
                console.log(<any>error);
            }

        );
    }

    onDeleteAccount() {
        this.deleteSubmitted = true;
        this.user = this.identity;

        if (this.password.invalid) {
            return;
        }

        this.user.password = this.password.value;

        this._userService.validatePass(this.user).subscribe(
            response => {
                if (response) {
                    this.deleteStatus = 'success';                    
                    
                    this._userService.deleteUser().subscribe(
                        response => {

                            if (response.user && response.user._id) {
                                this.deleteStatus = 'success';                              
                                localStorage.clear();                                
                                
                                this._router.navigate(['/'])
                                    .finally(() => location.reload());
                                
                                
                            } else {
                                this.deleteStatus = 'error2';
                            }
                        },
                        error => {
                            this.deleteStatus = 'error2';
                            console.log(<any>error);
                        }
                    )
                } else {
                    this.deleteStatus = 'error';
                }
                this.editPassword.reset();
                this.submitted = false;
            },
            error => {
                this.deleteStatus = 'error';
                console.log(<any>error);
            }
        );
    }
}
