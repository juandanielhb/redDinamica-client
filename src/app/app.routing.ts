import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';

import { LandingComponent } from './components/landing/landing.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { RecoverPasswordComponent } from './components/recoverPassword/recoverPassword.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SearchComponent } from './components/search/search.component';
import { ResourcesComponent } from './components/resources/resources.component';
import { SecurityOptionsComponent } from './components/securityOptions/securityOptions.component';
import { LandingGuard } from './guards/landing.guard';


const routes: Routes = [
    { path: '', component: LandingComponent, canActivate: [LandingGuard]},        
    { path: 'login', component: LoginComponent },
    { path: 'registro', component: RegisterComponent },    
    { path: 'recuperar-pass', component: RecoverPasswordComponent },
    { path: 'perfil', component: ProfileComponent },
    { path: 'recursos', component: ResourcesComponent },
    { path: 'buscar', component: SearchComponent },
    { path: 'seguridad', component: SecurityOptionsComponent },
    { path: '**', component: LandingComponent }
];

export const appRoutingProviders: any[] = [];
export const Routing: ModuleWithProviders = RouterModule.forRoot(routes, { scrollPositionRestoration: 'disabled', onSameUrlNavigation: 'reload'});
