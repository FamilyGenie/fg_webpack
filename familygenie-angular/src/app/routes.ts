import { ModuleWithProviders }  from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

// routes specific to this app
import { AppComponent } from "./app.component";
import { AboutComponent } from "./about.component";
import { MapComponent } from "./map-component/map.component";
import { PeopleSearchComponent } from "./peoplesearch.component/peoplesearch.component";
import { PeopleDetailsComponent } from "./peopledetails.component/peopledetails.component";
import { LoginComponent } from "./login-component/login.component";
import { AuthGuard } from "./auth-service/auth-guard.service";
import { UploadComponent } from "./upload-component/upload.component";

// export const routes: RouterConfig = [
const appRoutes: Routes = [
    {
        path: "",
        component: AppComponent
        // , canActivate: [AuthService] // this line will be needed when auth is enabled
    },
    {
        path: "about",
        component: AboutComponent,
        canActivate: [AuthGuard] // this line will be needed when auth is enabled
    },
    {
        path: "map",
        component: MapComponent,
        canActivate: [AuthGuard] // this line will be needed when auth is enabled
    },
    {
        path: "map/:_id",
        component: MapComponent,
        canActivate: [AuthGuard] // this line will be needed when auth is enabled
    },
    {
        path: "peoplesearch",
        component: PeopleSearchComponent,
        canActivate: [AuthGuard] // this line will be needed when auth is enabled
    },
    {
        path: "peopledetails",
        component: PeopleDetailsComponent,
        canActivate: [AuthGuard] // this line will be needed when auth is enabled
    },
    {
        path: "peopledetails/:_id",
        component: PeopleDetailsComponent,
        canActivate: [AuthGuard] // this line will be needed when auth is enabled
    },
    {
        path: "login",
        component: LoginComponent
        // , canActivate: [AuthService] // this line will be needed when auth is enabled
    },
    {
        path: "upload",
        component: UploadComponent
        // , canActivate: [AuthService] // this line will be needed when auth is enabled
    }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);

