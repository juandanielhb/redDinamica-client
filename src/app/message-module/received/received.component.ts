import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from 'src/app/services/message.service';

import { UserService } from 'src/app/services/user.service';

import { GLOBAL } from 'src/app/services/global';
import { LABEL_ROLE } from '../services/messageData';

@Component({
    selector: 'received',
    templateUrl: './received.component.html'
})
export class ReceivedComponent {
    public title: string;
    public identity;
    public token;
    public url;

    public status;

    public categories;

    // Pagination
    public page; // Actual page
    public pages; // Number of pages
    public total; // Total of records
    public prevPage;
    public nextPage;

    public messages = [];

    constructor(
        private _userService: UserService,
        private _messageService: MessageService,
        private _route: ActivatedRoute,
        private _router: Router,
    ) {

        this.title = 'Recibidos';     
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.url = GLOBAL.url;

        this.categories = LABEL_ROLE;

        this.page = 1;
    }

    
    ngOnInit(): void {
        this.actualPage();
        // this.setviewed();
    }

    getReceivedMessages(page = 1){
        
        this._messageService.getReceivedMessages(this.token, page).subscribe(
            response => {
                
                if(response.messages){
                    this.messages = response.messages;
                    this.total = response.total;
                    this.pages = response.pages;
                }

                if (page > this.pages) {
                    this._router.navigate(['/mensajes/recibidos']);
                }
            },
            error => {
                console.log(<any>error);
            }
        )
    }

    actualPage() {
        this._route.params.subscribe(params => {
            let page = +params['page'];

            this.page = page;

            if (!page) {
                this.page = 1;
                this.nextPage = this.page + 1;
            } else {
                this.nextPage = page + 1;
                this.prevPage = page - 1;

                if (this.prevPage <= 0) {
                    this.prevPage = 1;
                }
            }

            this.getReceivedMessages(this.page);

        });
    }    
    
    public tempMessageId
    setDelete(messageId) {
        this.tempMessageId = messageId;
    }

    delete() {
        this._messageService.removeMessage(this.token, this.tempMessageId).subscribe(
            response => {
                if (response.message) {
                    this.tempMessageId = null;
                    this.getReceivedMessages(this.page);
                }
            },
            error => {
                console.log(<any>error);
            }
        );
    }

    setviewed(){
        this._messageService.setViewedMessage(this.token).subscribe(
            response => {
                console.log(response)
            },
            error => {
                console.log(<any>error);
            }
        )
    }


}
