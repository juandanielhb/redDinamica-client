import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';
import { Router } from '@angular/router';
import { BasicDataService } from 'src/app/services/basicData.service';
import { MessageService } from 'src/app/services/message.service';



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
    public user;
    public identity;
    public token;


    public allProfessions = [];
    public allInstitutions = [];
    public allAreas = [];

    constructor(
        private _formBuilder: FormBuilder,
        private _userService: UserService,
        private _bDService: BasicDataService,
        private _messageService: MessageService,
        private _router: Router
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

    onChanges(): void {
        this.loginForm.valueChanges.subscribe(val => {
            if (val) {
                this.invalid = null;
            }
        });
    }

    // Get controls form
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
                            } else {
                                localStorage.setItem('token', this.token);

                                this.getAllInstitutions();
                                this.getAllProfessions();
                                this.getCounters();
                                this.getAllAreas();
                                this.getUnviewMessages();  

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

    getAllAreas() {
        this.allAreas = JSON.parse(localStorage.getItem('areas'));

        if (!this.allAreas) {

            this._bDService.getAllKnowledgeAreas().subscribe(
                response => {
                    if (response.areas) {
                        this.allAreas = response.areas;                        
                        localStorage.setItem('areas', JSON.stringify(this.allAreas));
                    }
                }, error => {
                    console.log(<any>error);
                });                   
        }
    }

    getAllProfessions() {
        this.allProfessions = JSON.parse(localStorage.getItem('professions'));

        if (!this.allProfessions) {
            this._bDService.getAllProfessions().subscribe(
                response => {
                    if (response.professions) {
                        this.allProfessions = response.professions;
                        localStorage.setItem('professions', JSON.stringify(this.allProfessions));
                    }
                }, error => {
                    console.log(<any>error);
                });
        }
    }


    getAllInstitutions() {
        this.allInstitutions = JSON.parse(localStorage.getItem('institutions'));

        if (!this.allInstitutions) {
            this._bDService.getAllInstitutions().subscribe(
                response => {
                    if (response.institutions) {
                        this.allInstitutions = response.institutions;
                        localStorage.setItem('institutions', JSON.stringify(this.allInstitutions));
                    }
                }, error => {
                    console.log(<any>error);
                });
        }
    }

    getCounters() {
        this._userService.getCounters().subscribe(
            response => {
                if(response){
                    localStorage.setItem('stats', JSON.stringify(response));
                }
            },
            error => {
                console.log(<any>error);
            });
    }
    
    getUnviewMessages(){
        this._messageService.getUnviewMessages(this.token).subscribe(
            response => {     
                if(response){                    
                    localStorage.setItem('unviewedMessages', response.unviewed);
                }
            },
            error => {
                console.log(<any>error);
            }
        )
    }
}
