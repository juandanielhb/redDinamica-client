import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { User } from 'src/app/models/user.model';

import { BasicDataService } from 'src/app/services/basicData.service';
import { NgSelectConfig } from '@ng-select/ng-select';
import { ActivatedRoute, Router } from '@angular/router';
import { ADD_FIELDS_FORM, CATEGORIES_ADMIN, CATEGORIES, LABEL_PROFILE, EDIT_FIELDS_FORM } from '../services/usersData';
import { UserService } from 'src/app/services/user.service';

import { City } from 'src/app/models/city.model';
import { Profession } from 'src/app/models/profession.model';
import { Institution } from 'src/app/models/institution.model';
import { GLOBAL } from 'src/app/services/global';

@Component({
    selector: 'users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.css']
})
export class UsersComponent {
    public title: string;
    public url;
    public addFieldsForm = ADD_FIELDS_FORM;
    public editFieldsForm = EDIT_FIELDS_FORM;
    public categories;
    public labelProfile = LABEL_PROFILE;
    public identity;
    public addCity = false;
    public openItem;

    public submitted = false;
    public status;
    public addForm;
    public city = new City();
    public profession = new Profession('');
    public institution = new Institution();
    public state;
    public country;
    public editForm;
    public user = new User();
    public users = [];

    // Pagination
    public page; // Actual page
    public pages; // Number of pages
    public total; // Total of records
    public prevPage;
    public nextPage;

    // Filter
    public filter;
    public allUsers;
    public selectedCategory = [];

    // Select data
    public items;
    public allCities;
    public allProfessions: any;
    public allInstitutions;

    constructor(
        private _bDService: BasicDataService,
        private _userService: UserService,
        private config: NgSelectConfig,
        private _route: ActivatedRoute,
        private _router: Router,
        private _formBuilder: FormBuilder
    ) {

        this.title = 'Usuarios';
        this.identity = _userService.getIdentity();
        this.categories = CATEGORIES;
        this.url = GLOBAL.url;

        if (this.identity.role == 'admin') {
            this.categories = CATEGORIES_ADMIN;
        }

        this.addForm = new FormGroup({
            name: new FormControl('', Validators.required),
            surname: new FormControl('', Validators.required),
            email: new FormControl('', [Validators.required, Validators.email]),
            profession: new FormControl(''),
            institution: new FormControl(''),
            city: new FormControl(''),
            category: new FormControl('', Validators.required)
        });

        this.editForm = new FormGroup({
            name: new FormControl(''),
            surname: new FormControl(''),
            email: new FormControl(''),
            profession: new FormControl(''),
            institution: new FormControl(''),
            about: new FormControl(''),
            city: new FormControl(''),
            category: new FormControl(''),
            postgraduate: new FormControl('')
        });

        this.state = new FormControl('');
        this.country = new FormControl('');
        this.items = {
            city: [],
            institution: [],
            profession: []
        };

        this.filter = new FormControl();
        
    }

    ngDoCheck(): void {
        //Called every time that the input properties of a component or a directive are checked. Use it to extend change detection by performing a custom check.
        //Add 'implements DoCheck' to the class.
        
    }
    ngOnInit(): void {
        this.getAllUsers();
        this.getAllCities();
        this.getAllInstitutions();
        this.getAllProfessions();
        this.actualPage();

       
    }

    // Get controls form
    get f() { return this.addForm.controls; }

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
    }

    setAdd() {
        this.status = null;
        this.submitted = false;
        this.items.city = this.allCities;
        this.items.institution = this.allInstitutions;
        this.items.profession = this.allProfessions;
    }

    async onSubmit() {
        this.submitted = true;

        if (this.addForm.invalid) {
            return;
        }

        this.user.name = this.addForm.value.name;
        this.user.surname = this.addForm.value.surname;
        this.user.email = this.addForm.value.email;

        if(this.addForm.value.city){
            this.user.city = this.addForm.value.city._id;
        }

        if(this.addForm.value.profession){
            this.user.profession = this.addForm.value.profession._id;
        }

        if(this.addForm.value.institution){
            this.user.institution = this.addForm.value.institution._id;
        }

        this.user.role = this.addForm.value.category;

        if (!this.user.city && this.addForm.value.city) {

            this.city.name = this.addForm.value.city.name;
            this.city.state = this.state.value;
            this.city.country = this.country.value;
            this.city.used = true;

            let responseAddCity = await this._bDService.addCity(this.city).toPromise();

            if (responseAddCity.city && responseAddCity.city._id) {
                this.user.city = responseAddCity.city._id;
            } else {
                console.log(<any>responseAddCity);
            }

            this.getAllCities();
        }

        if (!this.user.profession && this.addForm.value.profession) {

            this.profession.name = this.addForm.value.profession.name;
            this.profession.used = true;

            let responseAddProfession = await this._bDService.addProfession(this.profession).toPromise();

            if (responseAddProfession.profession && responseAddProfession.profession._id) {
                this.user.profession = responseAddProfession.profession._id;
            } else {
                console.log(<any>responseAddProfession);
            }

            this.getAllProfessions();
        }

        if (!this.user.institution && this.addForm.value.institution) {

            this.institution.name = this.addForm.value.institution.name;
            this.institution.used = true;

            let responseAddinstitution = await this._bDService.addInstitution(this.institution).toPromise();
            if (responseAddinstitution.institution && responseAddinstitution.institution._id) {
                this.user.institution = responseAddinstitution.institution._id;
            } else {
                console.log(<any>responseAddinstitution);
            }

            this.getAllInstitutions();
        }

        let responseAddUser = await this._userService.registerByAdmin(this.user).toPromise().catch((error) => {
            this.status = "error";
            console.log(<any>error);
        });

        if (responseAddUser.user && responseAddUser.user._id) {
            this.addForm.reset();
            this.status = "success";
            this.submitted = false;
        } else {
            this.status = "error";
        }

        this.getUsers(this.page);
        this.getAllUsers();
    }

    public tempUser;
    setEdit(user) {
        let city;
        let profession;
        let institution;

        this.status = null;
        this.submitted = false;


        this.tempUser = user;

        if(this.tempUser.city){
           city = `${this.tempUser.city.name}, ${this.tempUser.city.state}, ${this.tempUser.city.country}`;
        }
        

        if(this.tempUser.profession){
            profession = this.tempUser.profession.name;
        }

        if(this.tempUser.institution){
            institution = this.tempUser.institution.name;
        }


        this.editForm.patchValue({
            name: this.tempUser.name,
            surname: this.tempUser.surname,
            about: this.tempUser.about,
            email: this.tempUser.email,
            city: city,
            profession: profession,
            institution: institution,
            category: this.tempUser.role
        });

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

            this.getUsers(this.page);

        });
    }

    getUsers(page) {
        this._userService.getUsers(page).subscribe(
            response => {
                if (response.users) {
                    this.users = response.users;

                    this.total = response.total;
                    this.pages = response.pages;
                    if (page > this.pages) {
                        this._router.navigate(['/admin/usuarios']);
                    }
                }
            }, error => {
                console.log(<any>error);
            }
        );
    }

    getAllUsers() {
        let filteredUsers = [];
        this._userService.getAllUsers().subscribe(
            response => {
                if (response.users) {
                    this.allUsers = response.users;   
                    
                    if(this.selectedCategory.length > 0)
                    {
                        this.selectedCategory.forEach((category) => {
                            filteredUsers = filteredUsers.concat(this.allUsers.filter((user)=>{
                                return user.role == category;
                            }));
                        });

                        this.allUsers = filteredUsers;         

                    }
                }



            }, error => {
                console.log(<any>error);
            });
    }


    onKeydown(e) {
        if (e.keyCode === 13) {
            // Cancel the default action, if needed
            e.preventDefault();
            // Trigger the button element with a click
            document.getElementById("save").click();
        }
    }

    removeUser(userId) {
        this._userService.deleteUser(userId).subscribe(
            response => {
                if (response.user) {
                    this.users = this.users.filter((item) => {
                        return item._id != response.user._id;
                    });
                    this.getUsers(this.page);
                    this.getAllUsers();
                }

            }, error => {
                console.log(<any>error);
            }
        );
    }


    addToOpenItem(userId) {
        this.openItem = userId;
    }

    addCityData(e, controlName) {
        if (e && !e._id && controlName == "city") {
            this.addCity = true;
        } else {
            this.addCity = false;
        }
    }

    setCategory(category){
        if(this.selectedCategory.indexOf(category) >= 0){
            this.selectedCategory.splice(this.selectedCategory.indexOf(category),1);
        }else{
            this.selectedCategory.push(category);  
        }

        this.getAllUsers();
    }
}
