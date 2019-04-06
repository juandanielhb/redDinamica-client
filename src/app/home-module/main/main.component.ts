import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { GLOBAL } from 'src/app/services/global';
import { ActivatedRoute, Router } from '@angular/router';
import { Publication } from 'src/app/models/publication.model';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { PublicationService } from 'src/app/services/publication.service';
import { UploadService } from 'src/app/services/upload.service';
import * as $ from 'jquery';

@Component({
    selector: 'main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.css']
  
})
export class MainComponent implements OnInit {
    public title:string;
    public identity;
    public token;
    public url;

    public publication;
    public publications = [];

    public filesToUpload:Array<File>;

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

    constructor(
        private _userService:UserService,
        private _publicationService: PublicationService,
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
            textPost: new FormControl(null, Validators.required),
            filePost: new FormControl()
        });

        this.submitted = false;
        this.page = 1;

        this.getPublications(this.page);
    }

    // Get controls form
    get f() { return this.postForm.controls; }

    onChanges(): void {
        this.postForm.get('textPost').valueChanges.subscribe(val => {

          if(val){
              this.status = null;
              this.submitted = false;
          }
        });
      }

    ngOnInit(): void { 
        
    }

    getPublications(page, add = false){
        let arrayA, arrayB;

        this._publicationService.getPublications(this.token, page).subscribe(
            response => {
                if(response.publications){
                    this.total = response.total;
                    this.pages = response.pages;
                    this.itemsPerPage = response.itemsPerPage;

                    if(!add){
                        this.publications = response.publications;
                    }else{
                        arrayA = this.publications;
                        arrayB = response.publications;
                        this.publications = arrayA.concat(arrayB);
                    }
                    
                    // $('html, body').animate({scrollTop: $('body').prop("scrollHeight")}, 500);

                    if(page > this.pages){
                        this._router.navigate(['/inicio/post', 1]);
                    }
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

    onSubmit(){

        this.submitted = true;

        if (this.postForm.invalid) {
            return;
        }

        this.publication = new Publication(
            this.postForm.value.textPost,
            this.identity._id
        );
        
        this._publicationService.addPost(this.token, this.publication).subscribe(
            response => {
                if(response.publication){

                    if(this.filesToUpload.length > 0){

                        //Upload profile imaage
                        // this._uploadService.makeFileRequest(
                        //     this.url+'upload-image-user/'+ this.identity._id,
                        // [],
                        // this.filesToUpload,
                        // this.token,
                        // 'image'
                        // ).then((result:any)=>{
                        //     this.identity.picture = result.user.picture;
                        //     localStorage.setItem('identity', JSON.stringify(this.identity));
                        // });
                    }


                    this.publication = response.publication;
                    this.status = 'success',
                    this.submitted = false;
                    this.postForm.reset();
                    this.getPublications(1);

                }else{
                    this.status = 'error';
                }
            },
            error => {
                console.log(<any>error);
                this.status = 'error';
            }

        )


    }

    fileChangeEvent(fileInput:any){
        this.filesToUpload = <Array<File>>fileInput.target.files;
    }

    viewMore(){
        if(this.publications.length == this.total){
            this.noMore = true;
        }else{
            this.page += 1;
        }

        this.getPublications(this.page, true);

    }
}
