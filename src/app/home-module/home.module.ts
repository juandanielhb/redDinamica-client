import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MomentModule } from 'ngx-moment';
import { NgSelectModule } from '@ng-select/ng-select';


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
import { SuggestLessonComponent } from './lessons/lessons/suggest/suggest-lesson.component';
import { SendExperienceComponent } from './lessons/lessons/send-experiences/send-experience.component';
import { DetailsResourceComponent } from './resources/details/details-resource.component';
import { RatingResourceComponent } from './resources/rating/rating-resource.component';
import { DetailsCallComponent } from './lessons/details/details-call.component';
import { LessonModule } from '../lesson-module/lesson.module';
import { AdviseLessonComponent } from './lessons/advise-lesson/advise-lesson.component';



@NgModule({
    declarations: [
        HomeComponent,
        MainComponent,
        UsersComponent,
        ResourcesComponent,
        DetailsResourceComponent,
        SuggestComponent,
        RatingResourceComponent,
        LessonsComponent,
        MyLessonsComponent,
        AdviseLessonComponent,
        CallsComponent,
        DetailsCallComponent,
        SuggestLessonComponent,        
        SendExperienceComponent,
        FilterPipe
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MomentModule,  
        NgSelectModule,  
        LessonModule,    
        HomeRoutingModule
        
               
    ],
    exports: [
        HomeComponent
    ],
    providers: [],
})
export class HomeModule { }