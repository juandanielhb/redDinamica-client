import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AdminComponent } from './admin.component';
import { UsersComponent } from './components/users/users.component';
import { LessonsComponent } from './components/lessons/news.component';
import { NewsComponent } from './components/news/news.component';
import { BasicDataComponent } from './components/basicData/basicData.component';

const adminRoutes: Routes = [
    {
        path: 'admin',
        component: AdminComponent,
        children: [
            { path: '', component: UsersComponent},
            { path: 'usuarios', component: UsersComponent},
            { path: 'lecciones', component: LessonsComponent},
            { path: 'noticias', component: NewsComponent},
            { path: 'datos-basicos', component: BasicDataComponent}
        ]
    }

];

@NgModule({
    imports: [
        RouterModule.forChild(adminRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class AdminRoutingModule {}
