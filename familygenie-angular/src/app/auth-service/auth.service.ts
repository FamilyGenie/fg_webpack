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

  login(un: string, pw: string) {
    this.dataService.login(un, pw).subscribe(function(res){
            // we only get in here if the login is successful
            this.localStorage.setItem("token", res.token);
            this.localStorage.setItem("userName", res.userName);
            this.dataService.loadAllData();
            alert("Successful login. Welcome " + localStorage.getItem("userName"));
            this.router.navigate([""]);
        }.bind(this));
  }

  logout(): void {
    // clear the token, and other login info, from local storage
    this.localStorage.clear();
    this.dataService.clearAllData();
    this.router.navigate([""]);
    alert("Thank you for using Family Genie. You are now logged out.");
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

