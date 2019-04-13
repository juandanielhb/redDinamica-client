import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
    selector: 'edit',
    templateUrl: './edit.component.html'
    
})
export class EditComponent implements OnInit {
    public title: string;
    public menuOptions;    
    
    constructor(private _location:Location) {
        this.title = 'Editar';
        
    }

    ngOnInit(): void {
        
    }

    onBackButton(){
        this._location.back();
    }
}
