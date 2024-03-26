import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { BlogModule } from './blog/blog.module';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { MaterialModule } from './material/material.module';
import { UserModule } from './user/user.module';

import { appInterceptorProvider } from './app-interceptor.interceptor';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MainComponent } from './main/main.component';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  declarations: [AppComponent, HomeComponent, MainComponent, NotFoundComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    BlogModule,
    CoreModule,
    SharedModule,
    UserModule,
    AppRoutingModule,
  ],
  providers: [appInterceptorProvider],
  bootstrap: [AppComponent],
})
export class AppModule {}
