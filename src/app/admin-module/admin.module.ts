import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { AdminRoutingModule } from './admin.routing';

import { AdminComponent } from './admin/admin.component';
import { UsersComponent } from './users/users.component';
import { LessonsComponent } from './lessons/news.component';
import { NewsComponent } from './news/news.component';
import { BasicDataComponent } from './basicData/basicData.component';
import { CitiesComponent } from './basicData/cities/cities.component';


@NgModule({
    declarations: [
        AdminComponent,
        UsersComponent,
        LessonsComponent,
        NewsComponent,
        BasicDataComponent,
        CitiesComponent
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