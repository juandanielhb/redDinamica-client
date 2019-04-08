import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ProfileComponent } from './profile.component';
import { EditInfoComponent } from './editInfo/editInfo.component';
import { InfoComponent } from './info/info.component';
import { LessonsComponent } from './lessons/lessons.component';
import { FollowsComponent } from './follows/follows.component';
import { ProfileGuard } from './guards/profile.guard';
import { PublicationsComponent } from './publications/publications.component';


const profileRoutes: Routes = [
    {
        path: 'perfil/:id',
        component: ProfileComponent,
        children: [
            { path: '', component: PublicationsComponent},
            { path: 'editar', component: EditInfoComponent, canActivate: [ProfileGuard]},
            { path: 'info', component: InfoComponent},
            { path: 'lecciones', component: LessonsComponent},
            { path: 'posts', component: PublicationsComponent},
            { path: 'red', component: FollowsComponent},
            { path: '**', component: PublicationsComponent},
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
