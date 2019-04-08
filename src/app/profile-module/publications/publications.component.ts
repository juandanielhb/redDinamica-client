import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

import { Router, ActivatedRoute } from '@angular/router';
import { PublicationService } from 'src/app/services/publication.service';
import { UploadService } from 'src/app/services/upload.service';
import { GLOBAL } from 'src/app/services/global';
import { FormGroup, FormControl, Validators } from '@angular/forms';


import { User } from 'src/app/models/user.model';
import { Publication } from 'src/app/models/publication.model';

@Component({
    selector: 'publications',
    templateUrl: './publications.component.html'
})
export class PublicationsComponent {
    public title: string;
    public identity;
    public token;
    public url;
    public ownProfile = new User;

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
    public comment;

    constructor(
        private _userService: UserService,
        private _publicationService: PublicationService,
        private _uploadService: UploadService,
        private _route: ActivatedRoute,
        private _router: Router,

    ) {

        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.url = GLOBAL.url;

        this.filesToUpload = [];

        this.postForm = new FormGroup({
            textPost: new FormControl(null),
            filePost: new FormControl('')
        });

        this.submitted = false;
        this.page = 1;

        this._route.parent.params.subscribe(params => {
            let id = params['id'];
            this.ownProfile._id = id;
        });

        this.loadPage();
        this.getUserPublications(this.page);

        this.comment = new FormControl('');
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

    loadPage() {
        this.identity = this._userService.getIdentity();

        this._route.parent.params.subscribe(params => {
            let id = params['id'];

            this.getUser(id);
        })
    }

    getUser(userId) {
        this._userService.getUser(userId).subscribe(
            response => {
                if (response.user) {
                    this.ownProfile = response.user;
                } else {
                    this.status = 'error';
                    this.ownProfile = this.identity;
                }
            },
            error => {
                console.log(<any>error);
                this.ownProfile = this.identity;
                // this._router.navigate(['/perfil/', this.identity._id + '']);
            }
        );
    }

    getUserPublications(page, add = false) {
        let arrayA, arrayB;

        this._publicationService.getUserPublications(this.token, this.ownProfile._id, page).subscribe(
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
                        this._router.navigate(['/perfil', this.ownProfile._id, 1]);
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

    setUpload(){
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

        console.log(this.publication)
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
                            this.getUserPublications(this.page);

                        });
                    } else {
                        this.getUserPublications(this.page);
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

    public tempPublicationId
    setDelete(publicationId) {
        this.tempPublicationId = publicationId;
    }

    deletePost() {
        this._publicationService.removePost(this.token, this.tempPublicationId).subscribe(
            response => {
                if (response.publication) {
                    this.tempPublicationId = null;
                    this.getUserPublications(this.page);
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

        this.getUserPublications(this.page, true);

    }
}
