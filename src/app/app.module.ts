import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Routing, appRoutingProviders } from './app.routing';
import { HttpClientModule } from '@angular/common/http';

// Components
import { AppComponent } from './app.component';
import { LandingComponent } from './components/landing/landing.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { FooterComponent } from './components/footer/footer.component';


import { HomeModule } from './home/home.module';
import { HomeComponent } from './components/home/home.component';
import { RecoverPasswordComponent } from './components/recoverPassword/recoverPassword.component';
import { AdminModule } from './admin-module/admin.module';
import { ProfileComponent } from './components/profile/profile.component';



@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    RegisterComponent,
    LoginComponent,
    RecoverPasswordComponent,
    FooterComponent,
    ProfileComponent,
    HomeComponent     
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    Routing,
    HomeModule,
    AdminModule
  ],
  providers: [appRoutingProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
