import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "./auth-service/auth.service";

@Component({
    selector: "main-container",
    templateUrl: "main-container-component.html"
})
export class MainContainer {

    constructor (
        private router: Router,
        private authService: AuthService
        ) {}

    logOut() {
        this.authService.logout();
    }
}