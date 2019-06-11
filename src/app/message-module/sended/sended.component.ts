import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from 'src/app/services/message.service';

import { UserService } from 'src/app/services/user.service';

import { GLOBAL } from 'src/app/services/global';
import { LABEL_ROLE } from '../services/messageData';

@Component({
    selector: 'sended',
    templateUrl: './sended.component.html'
})
export class SendedComponent implements OnInit{
    public title: string;
    public identity;
    public token;
    public url;

    public categories;

    // Pagination
    public page; // Actual page
    public pages; // Number of pages
    public total; // Total of records
    public prevPage;
    public nextPage;

    public messages = [];
    
    public loading = true;

    constructor(
        private _userService: UserService,
        private _messageService: MessageService,
        private _route: ActivatedRoute,
        private _router: Router,

    ) {
        this.title = 'Enviados';        
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.url = GLOBAL.url;

        this.categories = LABEL_ROLE;

        this.page = 1;

        
        
    }

    ngOnInit(): void {
        this.actualPage();        
        
    }

    getEmittedMessages(page = 1){
        
        this._messageService.getEmittedMessages(this.token, page).subscribe(
            response => {
                
                if(response.messages){
                    this.messages = response.messages;
                    this.total = response.total;
                    this.pages = response.pages;
                }

                if (page > this.pages) {
                    this._router.navigate(['/mensajes/enviados']);
                }

                this.loading = false;

            },
            error => {
                this.loading = false;
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

            this.getEmittedMessages(this.page);

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
                    this.getEmittedMessages(this.page);
                }
            },
            error => {
                console.log(<any>error);
            }
        );
    }

    newLines(text) {
        let innerHtml = '';

        if (text) {
            text.split('\n').forEach(paragraph => {
                innerHtml += `<p>${paragraph}</p>`
            });
        }

        return innerHtml;
    }
}
