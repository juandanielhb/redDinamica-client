import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { HomeComponent } from './home.component';
import { MainComponent } from './main/main.component';
import { UsersComponent } from './users/users.component';
import { LessonsComponent } from './lessons/lessons/lessons.component';
import { ResourcesComponent } from './resources/resources.component';
import { MyLessonsComponent } from './lessons/my-lessons/my-lessons.component';
import { CallsComponent } from './lessons/calls/calls.component';
import { LessonComponent } from './lesson/lesson.component';
import { LessonDetailsComponent } from './lesson/details/lesson-details.component';
import { GroupComponent } from './lesson/group/group.component';
import { ActivityComponent } from './lesson/activity/activity.component';
import { EditComponent } from './lesson/edit/edit.component';
import { RatingComponent } from './lesson/rating/rating.component';

const homeRoutes: Routes = [
    {
        path: 'inicio',
        component: HomeComponent,
        children: [
            //{ path: '', redirectTo: 'add', pathMatch: 'full'},
            { path: '', component: MainComponent },
            { path: 'post', component: MainComponent },
            { path: 'post/:page', component: MainComponent },
            { path: 'usuarios', component: UsersComponent },
            { path: 'usuarios/:page', component: UsersComponent },
            { path: 'lecciones', component: LessonsComponent },
            { path: 'lecciones/:page', component: LessonsComponent },
            { path: 'mis-lecciones', component: MyLessonsComponent },
            { path: 'mis-lecciones/:page', component: MyLessonsComponent },
            { path: 'convocatorias', component: CallsComponent },
            { path: 'convocatorias/:page', component: CallsComponent },
            { path: 'recursos', component: ResourcesComponent },
            { path: 'recursos/:page', component: ResourcesComponent },            
            {
                path: 'leccion/:id',
                component: LessonComponent,                
                children:[
                    { path: '', component: LessonDetailsComponent},
                    { path: 'detalles', component: LessonDetailsComponent},
                    { path: 'grupo', component: GroupComponent},
                    { path: 'actividad', component: ActivityComponent},
                    { path: 'calificar', component: RatingComponent},
                    { path: 'editar', component: EditComponent},
                ]
            },
            { path: '**', component: MainComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(homeRoutes)],
    exports: [RouterModule]
})
export class HomeRoutingModule { }
