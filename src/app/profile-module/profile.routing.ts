import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ProfileComponent } from './profile.component';
import { EditInfoComponent } from './editInfo/editInfo.component';
import { InfoComponent } from './info/info.component';
import { LessonsComponent } from './lessons/lessons.component';
import { FollowsComponent } from './follows/follows.component';


const profileRoutes: Routes = [
    {
        path: 'perfil',
        component: ProfileComponent,
        children: [
            { path: '', component: InfoComponent},
            { path: 'editar', component: EditInfoComponent},
            { path: 'info', component: InfoComponent},
            { path: 'lecciones', component: LessonsComponent},
            { path: 'red', component: FollowsComponent},
            { path: '**', component: InfoComponent},
        ]
    }

];

@NgModule({
    imports: [
        RouterModule.forChild(profileRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class ProfileRoutingModule {}
