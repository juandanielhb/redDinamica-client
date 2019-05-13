import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { PublicationService } from 'src/app/services/publication.service';
import { UploadService } from 'src/app/services/upload.service';
import { CommentService } from 'src/app/services/comment.service';

import { GLOBAL } from 'src/app/services/global';
import { Publication } from 'src/app/models/publication.model';
import { Comment } from 'src/app/models/comment.model';

@Component({
    selector: 'main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.css']

})
export class MainComponent{
    public title: string;
    public identity;
    public token;
    public url;

    public publication;
    public publications = [];

    public postForm;
    public status;
    public submitted;

    // Pagination
    public page; // Actual page
    public pages; // Number of pages
    public total; // Total of records
    public prevPage;
    public nextPage;
    public itemsPerPage;
    public noMore = false;

    // Comments
    public commentForm;
    public comment;

    constructor(
        private _userService: UserService,
        private _publicationService: PublicationService,
        private _commentService: CommentService,
        private _uploadService: UploadService,
        private _route: ActivatedRoute,
        private _router: Router
    ) {
        this.title = 'Bienvenidos a';
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.url = GLOBAL.url;

        this.filesToUpload = [];

        this.postForm = new FormGroup({
            textPost: new FormControl(''),
            filePost: new FormControl('')
        });

        this.submitted = false;
        this.page = 1;

        this.getPublications(this.page);

        this.commentForm = new FormGroup({
            text: new FormControl('', Validators.required)
        });

    }

    // Get controls form
    get f() { return this.postForm.controls; }

    onChanges(): void {
        this.postForm.get('textPost').valueChanges.subscribe(val => {
            if (val) {
                this.status = null;
                this.submitted = false;
            }
        });
    }

    getPublications(page, add = false) {
        let arrayA, arrayB;

        this._publicationService.getPublications(this.token, page).subscribe(
            response => {

                if (response.publications) {
                    this.total = response.total;
                    this.pages = response.pages;
                    this.itemsPerPage = response.itemsPerPage;

                    if (this.page >= this.pages) {
                        this.noMore = true;
                    }

                    if (!add) {
                        this.publications = response.publications;
                    } else {
                        arrayA = this.publications;
                        arrayB = response.publications;
                        this.publications = arrayA.concat(arrayB);
                    }

                    // $('html, body').animate({scrollTop: $('body').prop("scrollHeight")}, 500);

                    if (page > this.pages && this.pages > 0) {
                        this._router.navigate(['/inicio/post', 1]);
                    }
                } else {
                    this.status = 'error';
                }
            },
            error => {
                this.status = 'error';
                console.log(<any>error);
            }
        )
    }

    setUpload() {
        this.status = null;
        this.submitted = false;
    }

    public filesToUpload: Array<File>;
    fileChangeEvent(fileInput: any) {
        this.filesToUpload = <Array<File>>fileInput.target.files;
    }
    
    
    public formError = false;
    onSubmit() {
        this.submitted = true;

        if (!this.postForm.value.textPost && this.filesToUpload.length <= 0) {
            this.formError = true;
            return;
        }

        this.publication = new Publication(
            this.postForm.value.textPost,
            this.identity._id
        );

        this._publicationService.addPost(this.token, this.publication).subscribe(
            response => {
                if (response.publication) {
                    if (this.filesToUpload.length > 0) {

                        // Upload post image
                        this._uploadService.makeFileRequest(
                            this.url + 'upload-file-post/' + response.publication._id,
                            [],
                            this.filesToUpload,
                            this.token,
                            'image'
                        ).then((result: any) => {

                            this.publication = result;
                            this.publication = response.publication;
                            this.getPublications(this.page);

                        }).catch((error)=>{
                            console.log(<any> error);
                            this.status = 'error';
                            return;
                        });

                    } else {
                        this.getPublications(this.page);
                    }

                    this.status = 'success',
                    this.formError = false;
                    this.submitted = false;
                    this.postForm.reset();

                } else {
                    this.status = 'error';
                }
            },
            error => {
                console.log(<any>error);
                this.status = 'error';
            }
        )
    }

    public tempPublicationId;    
    setDelete(publicationId) {
        this.tempPublicationId = publicationId;
        
    }

    deletePost() {
        this._publicationService.removePost(this.token, this.tempPublicationId).subscribe(
            response => {
                if (response.publication) {
                    this.tempPublicationId = null;
                    this.getPublications(this.page);
                }
            },
            error => {
                console.log(<any>error);
            }
        );
    }

    public tempCommentId;    
    setDeleteComment(commentId) {
        this.tempCommentId = commentId;        
    }

    deleteComment() {
        this._commentService.removeComment(this.token, this.tempCommentId).subscribe(
            response => {
                if (response.comment) {
                    this.tempCommentId = null;
                    this.getPublications(this.page);
                }
            },
            error => {
                console.log(<any>error);
            }
        );
    }    

    viewMore() {
        this.page += 1;

        if (this.page >= this.pages) {
            this.noMore = true;
        }       

        this.getPublications(this.page, true);
    }


    public focusPublication
    setFocusPublication(publicationId){
        this.focusPublication = publicationId;
    }


    onCommentSubmit(publicationId) {
        
        this.comment = new Comment(
            this.commentForm.value.text,
            this.identity._id
        );

        this._commentService.addComment(this.token, this.comment).subscribe(
            response => {
                if(response.comment && response.comment._id){
                    this._publicationService.updatePublicationComments(this.token, publicationId, response.comment).subscribe(
                        response => {
                            if(response.publication && response.publication._id){
                                this.getPublications(this.page);                                this.commentForm.reset();
                            }
                        },
                        error => {console.log(<any>error)}
                    );
                }
            },
            error => {
                console.log(<any>error);
            }

        )


    }    
}
