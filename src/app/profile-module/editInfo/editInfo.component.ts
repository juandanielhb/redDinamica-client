import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

import { FIELDS_FORM } from '../services/profileData';
import { FormBuilder, FormGroup } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { UploadService } from 'src/app/services/upload.service';
import { GLOBAL } from 'src/app/services/global';

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
    

    constructor(
        private _formBuilder: FormBuilder,
        private _userService: UserService,
        private _uploadService: UploadService
    ) {
        this.url = GLOBAL.url;
        this.identity = this._userService.getIdentity();                
        this.user = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.title = 'Editar perfil';
        this.fieldsForm = FIELDS_FORM;
        this.filesToUpload = [];
    }

    ngDoCheck(): void {
    }

    ngOnInit(): void {
        this.userEditForm = this._formBuilder.group({
            editName: this.identity.name,
            editSurname: this.identity.surname,
            editAbout: this.identity.about,
            editCity: this.identity.city,
            editProfession: this.identity.profession,
            editInstitution: this.identity.institution,
            editPostgraduate: this.identity.postgraduate,
            profileImage: ''
        });

    }
    
    onSubmit(){
        this.user.name = this.userEditForm.value.editName;
        this.user.surname = this.userEditForm.value.editSurname;
        this.user.about = this.userEditForm.value.editAbout;
        this.user.city = this.userEditForm.value.editCity;
        this.user.profession = this.userEditForm.value.editProfession;
        this.user.institution = this.userEditForm.value.editInstitution;
        this.user.postgraduate = this.userEditForm.value.editPostgraduate;

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
}
