import { NgModule }      from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
// import { provideRouter } from "@angular/router";
import { routing } from "./routes";
import { FormsModule } from "@angular/forms";
// added for LocalStorage
import { CoolStorageModule } from "angular2-cool-storage";

// import { HTTP_PROVIDERS } from "@angular/http";
import { HttpModule } from "@angular/http";

import { AppComponent }  from "./app.component";
import { MainContainer } from "./main-container.component";
import { AboutComponent } from "./about.component";
import { MapComponent } from "./map-component/map.component";
import { DataService } from "./data-service";
import { PeopleSearchComponent } from "./peoplesearch.component/peoplesearch.component";
import { PeopleSearchLineItemComponent } from "./peoplesearch.component/peoplesearch-lineitem.component";
import { PeopleDetailsComponent } from "./peopledetails.component/peopledetails.component";
import { PeopleDetailsLineItemComponent } from "./peopledetails.component/peopledetails-lineitem.component";
import { ParentalRelationshipComponent } from "./peopledetails.component/parentalrelationship.component";
import { PairBondRelationshipComponent } from "./peopledetails.component/pairbondrelationship.component";
import { PersonChangeComponent } from "./peopledetails.component/personchange.component";
import { ApiService } from "./api.service";
import { LoginComponent } from "./login-component/login.component";
import { AuthGuard } from "./auth-service/auth-guard.service";
import { AuthService } from "./auth-service/auth.service";

@NgModule({
    imports:      [
        BrowserModule,
        routing,
        HttpModule,
        FormsModule,
        CoolStorageModule
    ],
    declarations: [
        AppComponent,
        AboutComponent,
        MapComponent,
        PeopleSearchComponent,
        PeopleSearchLineItemComponent,
        PeopleDetailsComponent,
        PeopleDetailsLineItemComponent,
        ParentalRelationshipComponent,
        PairBondRelationshipComponent,
        PersonChangeComponent,
        LoginComponent,
        MainContainer
    ],
    bootstrap:    [ MainContainer ],
    providers:    [
        ApiService,
        DataService,
        AuthGuard,
        AuthService
    ]
})
export class AppModule {
}

