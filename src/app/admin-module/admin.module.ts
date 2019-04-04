import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgSelectModule } from '@ng-select/ng-select';

import { AdminRoutingModule } from './admin.routing';

import { AdminComponent } from './admin.component';
import { LessonsComponent } from './lessons/news.component';
import { NewsComponent } from './news/news.component';
import { CitiesComponent } from './basicData/cities/cities.component';
import { InstitutionsComponent } from './basicData/institutions/institutions.component';
import { KnowledgeAreasComponent } from './basicData/knowledgeAreas/knowledgeAreas.component';
import { NewUsersComponent } from './users/newUsers/newUsers.component';
import { UsersComponent } from './users/users/users.component';
import { ProfessionsComponent } from './basicData/professions/professions.component';
import { AdminGuard } from './guards/admin.guard';
import { FilterPipe } from './pipes/filter.pipe';

@NgModule({
    declarations: [
        AdminComponent,
        NewUsersComponent,
        LessonsComponent,
        NewsComponent,
        CitiesComponent,
        InstitutionsComponent,
        KnowledgeAreasComponent,
        ProfessionsComponent,
        UsersComponent,
        FilterPipe
        
    ],
    imports: [
        CommonModule,
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule,
        NgSelectModule,
        AdminRoutingModule,
        
    ],
    exports: [
        AdminComponent
    ],
    providers: [AdminGuard],
})
export class AdminModule { }