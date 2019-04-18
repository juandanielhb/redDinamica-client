import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MomentModule } from 'ngx-moment';

import { LessonComponent } from './lesson.component';
import { ActivityComponent } from './activity/activity.component';
import { EditComponent } from './edit/edit.component';
import { GroupComponent } from './group/group.component';
import { RatingComponent } from './rating/rating.component';
import { LessonDetailsComponent } from './details/lesson-details.component';



@NgModule({
    declarations: [
        LessonComponent,
        ActivityComponent,
        EditComponent,
        GroupComponent,
        RatingComponent,
        LessonDetailsComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        MomentModule
    ],
    exports: [
        LessonComponent
    ],
    providers: [

    ],
})
export class LessonModule { }