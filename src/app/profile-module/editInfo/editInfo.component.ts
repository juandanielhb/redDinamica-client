import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

import { FIELDS_FORM } from '../services/profileData';
import { FormBuilder, FormGroup } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { UploadService } from 'src/app/services/upload.service';
import { GLOBAL } from 'src/app/services/global';
import { BasicDataService } from 'src/app/services/basicData.service';
import { NgSelectConfig } from '@ng-select/ng-select';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'editInfo',
    templateUrl: './editInfo.component.html',
    styleUrls: ['./editInfo.component.css']
})
export class EditInfoComponent {
    public title: string;
    public url:string;
    public token:string;
    public identity;
    public userEditForm:FormGroup;
    public fieldsForm;
    public user:User = new User();
    public status:string;
    public filesToUpload:Array<File>;
    public items;
    public allCities;
    public allProfessions;
    public allInstitutions;

    constructor(
        private _formBuilder: FormBuilder,
        private _userService: UserService,
        private _uploadService: UploadService,
        private _bDService:BasicDataService,
        private config: NgSelectConfig,
        private _route: ActivatedRoute,
        private _router: Router,

    ) {
        this.url = GLOBAL.url;
        this.identity = this._userService.getIdentity();                
        this.user = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.title = 'Editar perfil';
        this.fieldsForm = FIELDS_FORM;
        this.filesToUpload = [];
        this.items = {
            city: [],
            institution: [],
            profession: []
        };
    }

    ngDoCheck(): void {
    }

    ngOnInit(): void {
        this.getAllCities();
        this.getAllInstitutions();
        this.getAllProfessions();

        this.userEditForm = this._formBuilder.group({
            name: this.identity.name,
            surname: this.identity.surname,
            about: this.identity.about,
            city: this.identity.city,
            profession: this.identity.profession,
            institution: this.identity.institution,
            postgraduate: this.identity.postgraduate,
            profileImage: ''
        });
    }
    
    onSubmit(){
        this.user.name = this.userEditForm.value.name;
        this.user.surname = this.userEditForm.value.surname;
        this.user.about = this.userEditForm.value.about;
        this.user.postgraduate = this.userEditForm.value.postgraduate;

        if(this.userEditForm.value.city){
            this.user.city = this.userEditForm.value.city._id;
        }

        if(this.userEditForm.value.profession){
            this.user.profession = this.userEditForm.value.profession._id;
        }

        if(this.userEditForm.value.institution){
            this.user.institution = this.userEditForm.value.institution._id;
        }

        console.log(this.user)
        this._userService.updateUser(this.user).subscribe(
            response => {
                
                if(!response.user){
                    this.status = 'error';
                }else{
                    this.identity = response.user;
                    this.status = 'success';
                    localStorage.setItem('identity', JSON.stringify(this.identity));

                    if(this.filesToUpload.length > 0){

                        //Upload profile imaage
                        this._uploadService.makeFileRequest(
                            this.url+'upload-image-user/'+ this.identity._id,
                        [],
                        this.filesToUpload,
                        this.token,
                        'image'
                        ).then((result:any)=>{
                            this.identity.picture = result.user.picture;
                            localStorage.setItem('identity', JSON.stringify(this.identity));
                        });
                    }
                }
            },
            error => {
                this.status = 'error';
                console.log(<any>error);
            }
        );

    }

    fileChangeEvent(fileInput:any){
        this.filesToUpload = <Array<File>>fileInput.target.files;
        console.log(this.filesToUpload);
    }

    
    getAllCities() {        
        this.allCities = JSON.parse(localStorage.getItem('cities'));

        if (!this.allCities) {
            
            this._bDService.getAllCities().subscribe(
                response => {
                    
                    if (response.cities) {
                        this.allCities = response.cities;
                        localStorage.setItem('cities', JSON.stringify(this.allCities));
                    }
                }, error => {
                    console.log(<any>error);
                });
        }

        this.items.city = this.allCities;

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

        
        this.items.profession = this.allProfessions;
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
        this.items.institution = this.allInstitutions;
    }
}
