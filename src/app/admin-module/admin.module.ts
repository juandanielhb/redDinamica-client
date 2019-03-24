import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { AdminRoutingModule } from './admin.routing';

import { AdminComponent } from './admin.component';
import { LessonsComponent } from './lessons/news.component';
import { NewsComponent } from './news/news.component';
import { BasicDataComponent } from './basicData/basicData.component';
import { CitiesComponent } from './basicData/cities/cities.component';
import { InstitutionsComponent } from './basicData/institutions/institutions.component';
import { KnowledgeAreasComponent } from './basicData/knowledgeAreas/knowledgeAreas.component';
import { NewUsersComponent } from './users/newUsers/newUsers.component';
import { UsersComponent } from './users/users/users.component';


@NgModule({
    declarations: [
        AdminComponent,
        NewUsersComponent,
        LessonsComponent,
        NewsComponent,
        BasicDataComponent,
        CitiesComponent,
        InstitutionsComponent,
        KnowledgeAreasComponent,
        UsersComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        HttpClientModule,
        AdminRoutingModule
    ],
    exports: [
        AdminComponent
    ],
    providers: [],
})
export class AdminModule { }