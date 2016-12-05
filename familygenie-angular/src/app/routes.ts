import { ModuleWithProviders }  from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

// routes specific to this app
import { AppComponent } from "./app.component";
import { AboutComponent } from "./about.component";
import { MapComponent } from "./map-component/map.component";
import { PeopleSearchComponent } from "./peoplesearch.component/peoplesearch.component";
import { PeopleDetailsComponent } from "./peopledetails.component/peopledetails.component";
import { EventsComponent } from "./events.component/events.component";
import { LoginComponent } from "./login-component/login.component";
import { AuthGuard } from "./auth-service/auth-guard.service";
import { UploadComponent } from "./upload-component/upload.component";

// export const routes: RouterConfig = [
const appRoutes: Routes = [
    {
        path: "",
        component: AppComponent
        // , canActivate: [AuthGuard] // this line will be needed if we want to protect this page
    },
    {
        path: "about",
        component: AboutComponent,
        canActivate: [AuthGuard]
    },
    {
        path: "map",
        component: MapComponent,
        canActivate: [AuthGuard]
    },
    {
        path: "map/:_id",
        component: MapComponent,
        canActivate: [AuthGuard]
    },
    {
        path: "peoplesearch",
        component: PeopleSearchComponent,
        canActivate: [AuthGuard]
    },
    {
        path: "peopledetails",
        component: PeopleDetailsComponent,
        canActivate: [AuthGuard]
    },
    {
        path: "peopledetails/:_id",
        component: PeopleDetailsComponent,
        canActivate: [AuthGuard]
    },
    {
        path: "events",
        component: EventsComponent,
        canActivate: [AuthGuard]
    },
    {
        path: "login",
        component: LoginComponent
        // , canActivate: [AuthGuard] // this line will be needed if we want to protect this page
    },
    {
        path: "upload",
        component: UploadComponent,
        canActivate: [AuthGuard]
    }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);

