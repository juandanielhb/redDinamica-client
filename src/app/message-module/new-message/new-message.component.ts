import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from 'src/app/services/message.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { UserService } from 'src/app/services/user.service';

import { GLOBAL } from 'src/app/services/global';
import { LABEL_ROLE } from '../services/messageData';
import { User } from 'src/app/models/user.model';
import { Message } from 'src/app/models/message.model';


@Component({
    selector: 'newMessage',
    templateUrl: './new-message.component.html'
})
export class NewMessageComponent {
    public title: string;
    public identity;
    public token;
    public url;

    public messageForm;
    public message;
    public allUsers;
    public items = [{name:null, surname:null}];
    
    public status;
    public submitted;
    public categories;

    constructor(
        private _userService: UserService,
        private _messageService: MessageService,
        private _route: ActivatedRoute,
        private _router: Router,

    ) {
        this.title = 'Mensaje nuevo';
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.url = GLOBAL.url;

        this.categories = LABEL_ROLE;
        
        this.messageForm = new FormGroup({
            to: new FormControl(''),
            message: new FormControl('', Validators.required)
        });

        this.getAllUsers();
    }

    onChanges(): void {
        this.messageForm.valueChanges.subscribe(val => {

            if (val) {
                this.status = null;
                this.submitted = false;
            }
        });
    }

    // Get controls form
    get f() { return this.messageForm.controls; }

 
    public formError = false;
    onSubmit() {

        // this.submitted = true;
        // if (!this.messageForm.value.textPost) {
        //     this.formError = true;
        //     return;
        // }


        this.message = new Message(
            this.identity._id,
            this.messageForm.value.to,
            this.messageForm.value.message
        );

        this._messageService.addMessage(this.token, this.message).subscribe(
            response => {
                console.log(response)
                if(response && response.message._id){
                    this.status = 'success';
                }else{
                    this.status = 'error';

                }
            },
            error => {
                this.status = 'error';
                console.log(<any>error);
            }
        )
    }

    getAllUsers() {        
        this._userService.getAllUsers().subscribe(
            response => {
                if (response.users) {                    
                    this.allUsers = response.users;
                    this.items = this.allUsers;
                }
            }, error => {
                console.log(<any>error);
            });
    }

    customSearchFn(term: string, item: User) {
        let userRole = LABEL_ROLE[<string> item.role].label;

        term = term.toLocaleLowerCase();

        return item.name.toLocaleLowerCase().indexOf(term) > -1 || item.surname.toLocaleLowerCase().includes(term) || userRole.toLocaleLowerCase().includes(term)        
    }
}
