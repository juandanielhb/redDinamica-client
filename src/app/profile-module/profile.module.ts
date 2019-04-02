import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { ProfileRoutingModule } from './profile.routing';

import { ProfileComponent } from './profile.component';
import { EditInfoComponent } from './editInfo/editInfo.component';
import { InfoComponent } from './info/info.component';
import { LessonsComponent } from './lessons/lessons.component';
import { FollowsComponent } from './follows/follows.component';
import { NgSelectModule } from '@ng-select/ng-select';


@NgModule({
    declarations: [
        ProfileComponent,
        EditInfoComponent,
        InfoComponent,
        LessonsComponent,
        FollowsComponent
        
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        ProfileRoutingModule,
        NgSelectModule
    ],
    exports: [
        ProfileComponent
    ],
    providers: [],
})
export class ProfileModule { }