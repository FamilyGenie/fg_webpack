import { Component } from "@angular/core";
import { DataService } from "../data-service";
import { Router } from "@angular/router";
import { CoolLocalStorage } from "angular2-cool-storage";
import { AuthService } from "../auth-service/auth.service";

@Component({
    selector: "login",
    styleUrls: ["login.component.css"],
    templateUrl: "login.component.html"
})
export class LoginComponent {

    router: Router;
    username: string;
    password: string;
    localStorage: CoolLocalStorage;

    constructor (
        private dataService: DataService,
        localStorage: CoolLocalStorage,
        _router: Router,
        public authService: AuthService
    ) {
        this.router = _router;
        this.localStorage = localStorage;
    }

    submitCredentials() {
        this.authService.login(this.username, this.password);
        // this.router.navigate([
        //     "peoplesearch"
        // ]);
        // this is a bad way to do this
        // window.location.href = "http://localhost:3000/peoplesearch";
    };

}