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
import { MAX_FILE_SIZE } from 'src/app/services/DATA';

@Component({
    selector: 'main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.css']

})
export class MainComponent {
    public title: string;
    public identity;
    public token;
    public url;

    public publication;
    public publications = [];

    public postForm;
    public status;
    public submitted = false;

    // Pagination
    public page; // Actual page
    public pages; // Number of pages
    public total; // Total of records
    public prevPage;
    public nextPage;
    public itemsPerPage;
    public noMore = false;

    public MAX_FILE_SIZE = MAX_FILE_SIZE;
    public maxSize = MAX_FILE_SIZE * 1024 * 1024;
    public maxSizeError = false;

    // Comments
    public commentForm;
    public comment;
    public loading = true;

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
                    
                    this.loading = false;
                }
            },
            error => {
                this.loading = false;
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
    public typeError = false;
    onSubmit() {
        this.submitted = true;
        this.status = null;

        // Validate not null text or file
        if (!this.postForm.value.textPost && this.filesToUpload.length <= 0) {
            this.formError = true;
            return;
        } else {
            this.formError = false;
        }

        if (this.filesToUpload[0]) {
            // Validate file type
            if (['image/jpeg', 'image/gif', 'image/png'].includes(this.filesToUpload[0].type)) {
                this.typeError = false;
            } else {
                this.typeError = true;
                return;
            }

            // Validate file size
            if (this.maxSize < this.filesToUpload[0].size) {
                this.maxSizeError = true;
                return;
            } else {
                this.maxSizeError = false;
            }
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
                            this.status = 'success';
                            this.getPublications(this.page);

                        }).catch((error) => {
                            console.log(<any>error);
                            this.status = 'error';
                            return;
                        });

                    } else {
                        this.status = 'success';
                    }

                } else {
                    this.status = 'error';
                }

                this.submitted = false;
                this.postForm.reset();
                this.getPublications(this.page);

                setInterval(() => { this.status = null; }, 5000);
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
    setFocusPublication(publicationId) {
        this.focusPublication = publicationId;
    }


    onCommentSubmit(publicationId) {

        this.comment = new Comment(
            this.commentForm.value.text,
            this.identity._id
        );

        this._commentService.addComment(this.token, this.comment).subscribe(
            response => {
                if (response.comment && response.comment._id) {
                    this._publicationService.updatePublicationComments(this.token, publicationId, response.comment).subscribe(
                        response => {
                            if (response.publication && response.publication._id) {
                                this.getPublications(this.page);
                                this.commentForm.reset();
                            }
                        },
                        error => { console.log(<any>error) }
                    );
                }
            },
            error => {
                console.log(<any>error);
            }

        )


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
