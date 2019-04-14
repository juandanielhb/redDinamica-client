import { Component, OnInit } from '@angular/core';
import { ResourceService } from 'src/app/services/resource.service';
import { UserService } from 'src/app/services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TYPE_OF_RESOURCES } from './resourcesData';

@Component({
    selector: 'resources',
    templateUrl: './resources.component.html'

})
export class ResourcesComponent implements OnInit {
    public title: string;
    public identity;
    public token;

    public types;   

    public allResources = [];
    public resources = [];

    // Pagination
    public page; // Actual page
    public pages; // Number of pages
    public total; // Total of records
    public prevPage;
    public nextPage;

    // Filter
    public filter;
    public allUsers;
    public selectedTypes = [];

    public areas;

    constructor(
        private _userService: UserService,
        private _resourceService: ResourceService,
        private _router: Router,
        private _route: ActivatedRoute
    ) {
        this.title = 'Recursos';
        this.token = this._userService.getToken();
        this.identity = this._userService.getIdentity();
        this.areas = localStorage.getItem('areas');
        this.types = TYPE_OF_RESOURCES;
        
    }

    ngOnInit(): void {
        this.getAllResources();
        this.actualPage();
    }

    getAllResources() {
        this._resourceService.getAllResources(this.token).subscribe(
            response => {
                console.log(response.resources)
                if (response.resources) {
                    this.allResources = response.resources;

                }
            }, error => {
                console.log(<any>error);
            });
    }

    getResources(page = null) {

        this._resourceService.getResources(this.token, page).subscribe(
            response => {
                console.log(response)
                if (response.resources) {
                    this.resources = response.resources;
                    this.total = response.total;
                    this.pages = response.pages;

                    if (page > this.pages) {
                        this._router.navigate(['/admin/recursos']);
                    }
                }
            }, error => {
                console.log(<any>error);
            }
        );
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

            this.getResources(this.page);
        });
    }

    setType(selectedType){
        if (this.selectedTypes.indexOf(selectedType) >= 0) {
            this.selectedTypes.splice(this.selectedTypes.indexOf(selectedType), 1);

        } else {
            this.selectedTypes.push(selectedType);

        }
        console.log(this.selectedTypes);
        // this.getAllResources();
    }

    
}
