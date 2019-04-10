import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

import { FIELDS_FORM } from '../services/profileData';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { UploadService } from 'src/app/services/upload.service';
import { GLOBAL } from 'src/app/services/global';
import { BasicDataService } from 'src/app/services/basicData.service';

import { City } from 'src/app/models/city.model';
import { Profession } from 'src/app/models/profession.model';
import { Institution } from 'src/app/models/institution.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'editInfo',
    templateUrl: './editInfo.component.html',
    styleUrls: ['./editInfo.component.css']
})
export class EditInfoComponent {
    public title: string;
    public url: string;
    public token: string;
    public identity;
    public addCity = false;
    public fieldsForm;

    public filesToUpload: Array<File>;

    public status;
    public city = new City();
    public profession = new Profession('');
    public institution = new Institution();
    public state;
    public country;
    public editForm: FormGroup;
    public user;

    public items;
    public allCities;
    public allProfessions;
    public allInstitutions;

    constructor(
        private _formBuilder: FormBuilder,
        private _userService: UserService,
        private _uploadService: UploadService,
        private _bDService: BasicDataService,
        private _router: Router,
        private _route: ActivatedRoute,
    ) {

        this.title = 'Editar perfil';
        this.identity = this._userService.getIdentity();
        this.url = GLOBAL.url;

        this.user = this._userService.getIdentity();
        this.token = this._userService.getToken();

        this.fieldsForm = FIELDS_FORM;
        this.filesToUpload = [];

        this.state = new FormControl('');
        this.country = new FormControl('');
        this.items = {
            city: [],
            institution: [],
            profession: []
        };
    }


    ngOnInit(): void {
        this.loadPage();
        this.getAllCities();
        this.getAllInstitutions();
        this.getAllProfessions();

        console.log(this.identity.profession)

        this.editForm = this._formBuilder.group({
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
    

    onChanges(): void {
        this.editForm.valueChanges.subscribe(val => {
            if (val) {
                this.status = null;
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
                    this.identity = response.user;
                } else {

                    this.identity = this.identity;
                    
                }

            },
            error => {
                console.log(<any>error);
                this.identity = this.identity;
                
            }
        );
    }


    async onSubmit() {

        this.user.name = this.editForm.value.name;
        this.user.surname = this.editForm.value.surname;
        this.user.about = this.editForm.value.about;
        this.user.postgraduate = this.editForm.value.postgraduate;

        if (this.editForm.value.city) {
            this.user.city = this.editForm.value.city._id;
        }

        if (this.editForm.value.profession) {
            this.user.profession = this.editForm.value.profession._id;
        }

        if (this.editForm.value.institution) {
            this.user.institution = this.editForm.value.institution._id;
        }

        if (!this.user.city && this.editForm.value.city) {

            if (this.editForm.value.city.name) {
                this.city.name = this.editForm.value.city.name;
            } else {
                this.city.name = this.editForm.value.city;
            }

            this.city.state = this.state.value;
            this.city.country = this.country.value;
            this.city.used = true;

            let responseAddCity = await this._bDService.addCity(this.city).toPromise();

            if (responseAddCity.city && responseAddCity.city._id) {
                this.user.city = responseAddCity.city._id;
                this.state.reset();
                this.country.reset();
            } else {
                console.log(<any>responseAddCity);
            }

            localStorage.removeItem('cities');
            this.getAllCities();
        }

        if (!this.user.profession && this.editForm.value.profession) {

            this.profession.used = true;

            if (this.editForm.value.profession.name) {
                this.profession.name = this.editForm.value.profession.name;
            } else {
                this.profession.name = this.editForm.value.profession;
            }

            let responseAddProfession = await this._bDService.addProfession(this.profession).toPromise();

            if (responseAddProfession.profession && responseAddProfession.profession._id) {
                this.user.profession = responseAddProfession.profession._id;
            } else {
                console.log(<any>responseAddProfession);
            }

            localStorage.removeItem('professions');
            this.getAllProfessions();
        }

        if (!this.user.institution && this.editForm.value.institution) {

            if (this.editForm.value.institution.name) {
                this.institution.name = this.editForm.value.institution.name;
            } else {
                this.institution.name = this.editForm.value.institution;
            }

            this.institution.used = true;

            let responseAddinstitution = await this._bDService.addInstitution(this.institution).toPromise();
            if (responseAddinstitution.institution && responseAddinstitution.institution._id) {
                this.user.institution = responseAddinstitution.institution._id;
            } else {
                console.log(<any>responseAddinstitution);
            }
            localStorage.removeItem('institutions');
            this.getAllInstitutions();
        }


        let response = await this._userService.updateUser(this.user).toPromise().catch((error) => {
            this.status = "error";
            console.log(<any>error);
        });

        if (response.user && response.user._id) {
            this.identity = response.user;
            this.status = 'success';
            localStorage.setItem('identity', JSON.stringify(this.identity));

            if (this.filesToUpload.length > 0) {

                //Upload profile imaage
                this._uploadService.makeFileRequest(
                    this.url + 'upload-image-user/' + this.identity._id,
                    [],
                    this.filesToUpload,
                    this.token,
                    'image'
                ).then((result: any) => {
                    this.identity.picture = result.user.picture;
                    localStorage.setItem('identity', JSON.stringify(this.identity));

                });
            }

            this.getAllCities();
            this.getAllInstitutions();
            this.getAllProfessions();


        } else {
            this.status = "error";
        }
    }

    fileChangeEvent(fileInput: any) {
        this.filesToUpload = <Array<File>>fileInput.target.files;
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

    addCityData(e, controlName) {
        if (e && !e._id && controlName == "city") {
            this.addCity = true;
        } else {
            this.addCity = false;
        }
    }

}
