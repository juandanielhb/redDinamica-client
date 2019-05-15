import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';

import { LandingComponent } from './components/landing/landing.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { RecoverPasswordComponent } from './components/recoverPassword/recoverPassword.component';
import { SearchComponent } from './components/search/search.component';
import { SecurityOptionsComponent } from './components/securityOptions/securityOptions.component';
import { LandingGuard } from './guards/landing.guard';


const routes: Routes = [
    { path: '', component: LandingComponent, canActivate: [LandingGuard]},        
    { path: 'login', component: LoginComponent,canActivate: [LandingGuard]},
    { path: 'registro', component: RegisterComponent,canActivate: [LandingGuard]},
    { path: 'recuperar-pass', component: RecoverPasswordComponent,canActivate: [LandingGuard]},
    { path: 'buscar', component: SearchComponent,canActivate: [LandingGuard]},
    { path: 'seguridad', component: SecurityOptionsComponent},
    { path: '**', component: LandingComponent, canActivate: [LandingGuard]}
];

export const appRoutingProviders: any[] = [];
export const Routing: ModuleWithProviders = RouterModule.forRoot(routes, { scrollPositionRestoration: 'disabled', onSameUrlNavigation: 'reload'});
