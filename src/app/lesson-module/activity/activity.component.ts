import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import { Lesson } from 'src/app/models/lesson.model';

@Component({
    selector: 'activity',
    templateUrl: './activity.component.html'
    
})
export class ActivityComponent implements OnInit {
    public title: string;
    
    @Input() lesson;
    
    constructor(private _location:Location) {
        this.title = 'Actividad';
        
    }

    ngOnInit(): void {
        
    }

    onBackButton(){
        this._location.back();
    }
}
