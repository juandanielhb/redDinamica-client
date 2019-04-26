import { Component, OnInit } from '@angular/core';
import { ResourceService } from 'src/app/services/resource.service';
import { UserService } from 'src/app/services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TYPE_OF_RESOURCES } from './resourcesData';
import { FormControl } from '@angular/forms';
import { GLOBAL } from 'src/app/services/global';
import { ICON_STYLE } from 'src/app/services/DATA';

@Component({
    selector: 'resources',
    templateUrl: './resources.component.html'

})
export class ResourcesComponent implements OnInit {
    public title: string;
    public identity;
    public token;
    public url;

    public types;

    public allResources = [];
    public resources = [];
    public iconResource = ICON_STYLE;

    public visible = new FormControl();

    // Pagination
    public page; // Actual page
    public pages; // Number of pages
    public total; // Total of records
    public prevPage;
    public nextPage;

    // Filter
    public filter;
    public selectedTypes = [];
    public selectedOrder = [];
    public orderControl;

    public areas;    

    constructor(
        private _userService: UserService,
        private _resourceService: ResourceService,
        private _router: Router,
        private _route: ActivatedRoute
    ) {
        this.title = 'Recursos';
        this.url = GLOBAL.url;
        this.token = this._userService.getToken();
        this.identity = this._userService.getIdentity();
        this.areas = localStorage.getItem('areas');

        this.types = TYPE_OF_RESOURCES;        

        this.orderControl = new FormControl('');
        this.filter = new FormControl('');
    }

    ngOnInit(): void {
        this.getAllResources();
        this.actualPage();
    }

    ngDoCheck(): void {
        if(this.needReloadData){
            this.actualPage();
            this.needReloadData = false;
        }
    }

    setOrder(){
        
        if(this.orderControl){
            
            if(this.orderControl.value == 'downloads'){
                return 'downloads';
            }else if(this.orderControl.value == 'score'){
                return 'score';
            }
            
        }
        return '';
    }

    getAllResources() {
        let filteredResources = [];
        let orderBy = this.setOrder();

        this._resourceService.getAllResources(this.token, orderBy).subscribe(
            response => {                
                if (response.resources) {
                    this.allResources = response.resources;

                    // Filter by category
                    if (this.selectedTypes.length > 0) {
                        this.selectedTypes.forEach((type) => {
                            filteredResources = filteredResources.concat(this.allResources.filter((resource) => {
                                return resource.type == type;
                            }));
                        });                     

                        this.allResources = filteredResources;
                    }                    
                }
            }, error => {
                console.log(<any>error);
            });
    }

    getResources(page = 1) {        

        this._resourceService.getResources(this.token, page).subscribe(
            response => {               
                
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

    setType(selectedType) {
        if (this.selectedTypes.indexOf(selectedType) >= 0) {
            this.selectedTypes.splice(this.selectedTypes.indexOf(selectedType), 1);

        } else {
            this.selectedTypes.push(selectedType);

        }        
        this.getAllResources();
    }

    reloadResources(){        
        this.getAllResources();
    }

    goToUrl(url){

        if(url.includes('http://') || url.includes('https://')){
            window.open(url, '_blank');            
        }else{
            window.open(`http://${url}`, '_blank');
        }
    }

   
    editResource(resource, setVisibility = null){
        
        if(setVisibility){
            if(resource.visible){
                resource.visible = false;
            }else{
                resource.visible = true;                
            }
        }

        this._resourceService.editResource(this.token, resource).subscribe(
            response =>{                
                if(response && response.resource._id){
                    this.getResources(this.page);
                }
             },
             error => {
                 console.log(<any>error);
             }
        )
    }

    public detailsResourceItem;
    setDetailResource(resource){
        this.detailsResourceItem = resource;
    }

    public editResourceItem;
    public reloadForm;
    setEditResource(resource){        
        this.reloadForm = true;
        this.editResourceItem = resource;
    }

    public deleteResourceId;
    setDeleteResource(resourceId){
        this.deleteResourceId = resourceId;
    }

    public needReloadData;
    setNeedReload(event){
        this.needReloadData = true;
    }
}
