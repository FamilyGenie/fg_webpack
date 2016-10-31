import { Injectable } from "@angular/core";
import { CoolLocalStorage } from "angular2-cool-storage";
import { DataService } from "../data-service";
import { Router } from "@angular/router";

@Injectable()
export class AuthService {
  localStorage: CoolLocalStorage;

  // store the URL so we can redirect after logging in
  redirectUrl: string;

  constructor (
        localStorage: CoolLocalStorage,
        private dataService: DataService,
        private router: Router
    ) {
        this.localStorage = localStorage;
    }

  login(un: string, pw: string): void {
    this.dataService.login(un, pw).subscribe(function(res){
            this.localStorage.setItem("token", res.token);
            this.dataService.loadAllData();
            this.router.navigate([""]);
        }.bind(this));
  }

  logout(): void {
    // clear the token, and other login info, from local storage
    this.localStorage.clear();
    this.dataService.clearAllData();
    this.router.navigate([""]);
  }

  isLoggedIn (): boolean {
    // if there is a token in local storage, then return true
    if (this.localStorage.getItem("token")) {
      return true;
    }
    // if there is not a token in local storage, then return false
    return false;
  }
}

