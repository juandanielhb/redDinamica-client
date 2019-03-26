import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routing, appRoutingProviders } from './app.routing';
import { HttpClientModule } from '@angular/common/http';

// Modules
import { HomeModule } from './home-module/home.module';
import { AdminModule } from './admin-module/admin.module';
import { LessonModule } from './lesson-module/lesson.module';
import { ProfileModule } from './profile-module/profile.module';

// Components
import { AppComponent } from './app.component';
import { LandingComponent } from './components/landing/landing.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { FooterComponent } from './components/footer/footer.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RecoverPasswordComponent } from './components/recoverPassword/recoverPassword.component';
import { SearchComponent } from './components/search/search.component';
import { UserService } from './services/user.service';
import { ResourcesComponent } from './components/resources/resources.component';
import { UploadService } from './services/upload.service';

// Guards
import { AdminGuard } from './services/admin.guard';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    RegisterComponent,
    LoginComponent,
    RecoverPasswordComponent,
    FooterComponent,
    ProfileComponent,
    ResourcesComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    Routing,
    ReactiveFormsModule,
    HomeModule,
    AdminModule,
    LessonModule,
    ProfileModule
  ],
  providers: [
    appRoutingProviders,
    UserService,
    UploadService,
    AdminGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
