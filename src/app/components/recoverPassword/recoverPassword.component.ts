import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';



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
        private _formBuilder: FormBuilder,
        private _userService: UserService
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
        let user = new User();

        // stop here if form is invalid
        if (this.recoverPassForm.invalid) {
            return;
        }

        user.email = this.recoverPassForm.value.email;

        this._userService.recoverPass(user).subscribe(
            response => {
                if(response.user && response.user._id){
                    this.status = 'success';

                }else{
                    this.status = 'error';
                }

            },
            error =>{
                this.status = 'error';
                console.log(<any>error);
            }
        )
        
    }    
}
