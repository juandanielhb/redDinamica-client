import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';

@Component({
    selector: 'group',
    templateUrl: './group.component.html'
    
})
export class GroupComponent implements OnInit {
    public title: string;
    
    @Input() lesson;  
    
    constructor(private _location:Location) {
        this.title = 'Grupo de desarrollo';
        
    }

    ngOnInit(): void {
        
    }

    onBackButton(){
        this._location.back();
    }
}
