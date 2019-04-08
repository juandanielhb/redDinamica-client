import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';

import { BasicDataService } from 'src/app/services/basicData.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ADD_FIELDS_FORM, CATEGORIES, LABEL_PROFILE, EDIT_FIELDS_FORM } from './services/usersData';
import { UserService } from 'src/app/services/user.service';
import { FollowService } from 'src/app/services/follow.service';


import { Follow } from 'src/app/models/follow.model';
import { User } from 'src/app/models/user.model';
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
    public token;
    
    public addFieldsForm = ADD_FIELDS_FORM;
    public editFieldsForm = EDIT_FIELDS_FORM;
    public categories;
    public labelProfile = LABEL_PROFILE;
    public identity;
    public addCity = false;
    public openItem;

    public submitted = false;
    public editSubmitted = false;
    public status;
    public editStatus;
    public addForm;
    public city = new City();
    public profession = new Profession('');
    public institution = new Institution();
    public state;
    public country;
    public editForm;
    public user = new User();
    public users = [];
    public following;
    public followers;

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
        private _followService: FollowService,     
        private _route: ActivatedRoute,
        private _router: Router,        
    ) {

        this.title = 'Usuarios';
        this.identity = _userService.getIdentity();
        this.token = _userService.getToken();
        this.categories = CATEGORIES;
        this.url = GLOBAL.url;

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

    ngOnInit(): void {
        this.getAllUsers();
        this.getAllCities();
        this.getAllInstitutions();
        this.getAllProfessions();
        this.actualPage();
    }

    // Get controls form
    get f() { return this.addForm.controls; }
    get f2() { return this.editForm.controls; }

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
                    this.followers = response.followers;
                    this.following = response.following;
                    if (page > this.pages) {
                        this._router.navigate(['/inicio/usuarios']);
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
                    console.log(response.users)
                    this.allUsers = response.users;
                    this.followers = response.followers;
                    this.following = response.following;

                    if (this.selectedCategory.length > 0) {
                        this.selectedCategory.forEach((category) => {
                            filteredUsers = filteredUsers.concat(this.allUsers.filter((user) => {
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

    setCategory(category) {
        if (this.selectedCategory.indexOf(category) >= 0) {
            if(category == 'delegated_admin'){
                this.selectedCategory.splice(this.selectedCategory.indexOf('admin'), 1);
            }
            this.selectedCategory.splice(this.selectedCategory.indexOf(category), 1);
        } else {
            if(category == 'delegated_admin'){
                this.selectedCategory.push('admin');            
            }
            this.selectedCategory.push(category);
        }

        this.getAllUsers();
    }

    // Follower systems buttons
    public followUserOver;
    mouseEnter(userId){
        this.followUserOver = userId;        
    }

    
    mouseLeave(){
        this.followUserOver = 0;        
    }

    followUser(userId){
        let follow = new Follow();
        follow.user = this.identity._id;
        follow.followed = userId;

        this._followService.addFollow(this.token, follow).subscribe(
            response => {
                                
                if(response){
                    this.following.push(response.followed);
                }
                
            },
            error => {
                console.log(<any>error);
            }
        )
    }

    unfollowUser(userId){
        let index;

        this._followService.removeFollow(this.token, userId).subscribe(
            response => {
                index = this.following.indexOf(response.followed);
                
                if(index != -1){
                    this.following.splice(index,1);
                }
                
            },
            error => {
                console.log(<any>error);
            }
        )
    }
}
