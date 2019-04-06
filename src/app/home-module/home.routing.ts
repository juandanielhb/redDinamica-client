import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { MainComponent } from './main/main.component';
import { UsersComponent } from './users/users.component';




const homeRoutes: Routes = [
    { 
        path: 'inicio', 
        component: HomeComponent,
        children: [
            //{ path: '', redirectTo: 'add', pathMatch: 'full'},
            { path: '', component: MainComponent},
            { path: 'post', component: MainComponent},
            { path: 'post/:page', component: MainComponent},
            { path: 'usuarios', component: UsersComponent},
            { path: 'usuarios/:page', component: UsersComponent},
            { path: '**', component: MainComponent}
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(homeRoutes)],
    exports: [RouterModule]
})
export class HomeRoutingModule {}
