import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { AdminRoutingModule } from './admin.routing';

import { AdminComponent } from './admin.component';
import { UsersComponent } from './components/users/users.component';
import { LessonsComponent } from './components/lessons/news.component';
import { NewsComponent } from './components/news/news.component';
import { BasicDataComponent } from './components/basicData/basicData.component';

@NgModule({
    declarations: [
        AdminComponent,
        UsersComponent,
        LessonsComponent,
        NewsComponent,
        BasicDataComponent
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