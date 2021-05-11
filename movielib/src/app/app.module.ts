import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthLayoutComponent } from './shared/components/layouts/auth-layout/auth-layout.component';
import { SiteLayoutComponent } from './shared/components/layouts/site-layout/site-layout.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { TokenInterceptor } from './shared/services/auth/token.interceptor';
import { LoaderComponent } from './shared/components/loader/loader.component';
import { MoviesPageComponent } from './movies-page/movies-page.component';
import { PaginationComponent } from './shared/components/pagination/pagination.component';
import { MovieListComponent } from './movies-page/movie-list/movie-list.component';
import { MoviePageComponent } from './movies-page/movie-page/movie-page.component';
import { ReviewComponent } from './movies-page/movie-page/review/review.component';
import { ReviewFormComponent } from './movies-page/movie-page/review-form/review-form.component';

@NgModule({
    declarations: [
        AppComponent,
        LoginPageComponent,
        AuthLayoutComponent,
        SiteLayoutComponent,
        RegisterPageComponent,
        LoaderComponent,
        MoviesPageComponent,
        PaginationComponent,
        MovieListComponent,
        MoviePageComponent,
        ReviewComponent,
        ReviewFormComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            multi: true,
            useClass: TokenInterceptor,
        },
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
