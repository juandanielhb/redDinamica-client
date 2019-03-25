import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { ProfileRoutingModule } from './profile.routing';

import { ProfileComponent } from './profile.component';
import { EditInfoComponent } from './editInfo/editInfo.component';
import { InfoComponent } from './info/info.component';
import { LessonsComponent } from './lessons/lessons.component';
import { FollowsComponent } from './follows/follows.component';


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
        HttpClientModule,
        ProfileRoutingModule
    ],
    exports: [
        ProfileComponent
    ],
    providers: [],
})
export class ProfileModule { }