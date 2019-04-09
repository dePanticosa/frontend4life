import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {ServiceWorkerModule} from '@angular/service-worker';
import {FormsModule} from "@angular/forms";
import {AngularFirestoreModule} from "@angular/fire/firestore";
import {AngularFireModule} from "@angular/fire";
import {RouterModule} from "@angular/router";



import {AppComponent} from './app.component';
import {AuthComponent} from "./components/auth/auth.component";

import {appRoutes} from './app-routing.module'

import {environment, firebaseConfig} from '../environments/environment';


@NgModule({
    declarations: [
        AppComponent,
        AuthComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
        AngularFireModule.initializeApp(firebaseConfig),
        AngularFirestoreModule,
        RouterModule.forRoot(appRoutes),
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
