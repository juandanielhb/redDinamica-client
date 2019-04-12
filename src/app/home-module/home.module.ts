import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MomentModule } from 'ngx-moment';


import { HomeRoutingModule } from './home.routing';
import { HomeComponent } from './home.component';
import { MainComponent } from './main/main.component';
import { UsersComponent } from './users/users.component';
import { FilterPipe } from './pipes/filter.pipe';
import { ResourcesComponent } from './resources/resources.component';
import { LessonsComponent } from './lessons/lessons/lessons.component';
import { SuggestComponent } from './resources/suggest/suggest.component';
import { MyLessonsComponent } from './lessons/my-lessons/my-lessons.component';
import { CallsComponent } from './lessons/calls/calls.component';



@NgModule({
    declarations: [
        HomeComponent,
        MainComponent,
        UsersComponent,
        ResourcesComponent,
        LessonsComponent,
        MyLessonsComponent,
        CallsComponent,
        SuggestComponent,
        FilterPipe
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MomentModule,
        HomeRoutingModule
    ],
    exports: [
        HomeComponent
    ],
    providers: [],
})
export class HomeModule { }