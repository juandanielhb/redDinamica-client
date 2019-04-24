import { Component, OnInit } from '@angular/core';
import { GLOBAL } from 'src/app/services/global';
import { UserService } from 'src/app/services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ResourceService } from 'src/app/services/resource.service';
import { ICON_STYLE } from 'src/app/services/DATA';


@Component({
    selector: 'proposed-resource',
    templateUrl: './proposed-resource.component.html'
  
})
export class ProposedResourceComponent implements OnInit {
    public title: string;
    public identity;
    public token;
    public url;

    public types;


    public resources = [];
    public iconResource = ICON_STYLE;    

    // Pagination
    public page; // Actual page
    public pages; // Number of pages
    public total; // Total of records
    public prevPage;
    public nextPage;

    public areas;  

    constructor(
        private _userService: UserService,
        private _resourceService: ResourceService,
        private _router: Router,
        private _route: ActivatedRoute
    ) { 
        this.title = 'Recursos propuestos';
        this.url = GLOBAL.url;
        this.token = this._userService.getToken();
        this.identity = this._userService.getIdentity();
        this.areas = localStorage.getItem('areas');
        
    }

    ngOnInit(): void {
        this.actualPage();
    }

    ngDoCheck(): void {
        if(this.needReloadData){
            this.actualPage();
            this.needReloadData = false;
        }
    }

    getResources(page = 1) {        

        this._resourceService.getSuggestedResources(this.token, page).subscribe(
            response => {               
                
                if (response.resources) {
                    this.resources = response.resources;
                    this.total = response.total;
                    this.pages = response.pages;

                    if (page > this.pages) {
                        this._router.navigate(['/admin/recursos-propuestos']);
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

    editResource(resource){
        resource.accepted = true;

        this._resourceService.editResource(this.token, resource).subscribe(
            response =>{                
                if(response && response.resource._id){
                    console.log(response)
                    this.getResources(this.page);
                }
             },
             error => {
                 console.log(<any>error);
             }
        )
    }

    
    goToUrl(url){

        if(url.includes('http://') || url.includes('https://')){
            window.open(url, '_blank');            
        }else{
            window.open(`http://${url}`, '_blank');
        }
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
    setNeedReload(){
        this.needReloadData = true;
    }

}
