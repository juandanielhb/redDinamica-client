import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
    selector: 'activity',
    templateUrl: './activity.component.html'
    
})
export class ActivityComponent implements OnInit {
    public title: string;
    public menuOptions;    
    
    constructor(private _location:Location) {
        this.title = 'Actividad';
        
    }

    ngOnInit(): void {
        
    }

    onBackButton(){
        this._location.back();
    }
}
