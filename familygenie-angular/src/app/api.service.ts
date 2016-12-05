// All services are decorated with the @Injectable decorator
import { Injectable } from "@angular/core";
import { CoolLocalStorage } from "angular2-cool-storage";

// Import the HTTP libraries from the angular http folder
import { Http, Headers, Response } from "@angular/http";

// Import async functionality from the rxjs ("reactive js") library, which
// angular 2 uses to manage async requests.
import { Observable } from "rxjs/Observable";
import "rxjs/Rx";
import "rxjs/add/observable/throw";
import { isDevMode } from "@angular/core";

@Injectable()
export class ApiService {
    // for local storage to get the token to put into the headers
    localStorage: CoolLocalStorage;

    // this is the URL of our server, it is set in the constructor of this function, depending on if we are running in dev mode.
    url: string;

    constructor(
        private http: Http,
        localStorage: CoolLocalStorage
    ) {
        this.localStorage = localStorage;

        // if this is being run in dev mode, point to the local host for the api server. If this is being run in prod mode, point to familygenie server. The assumption is that it will only run on prod mode on our production server running on digital ocean.
        if (isDevMode()) {
            this.url = "http://localhost:3500";
        } else {
            this.url = "https://familygenie.me:3500";
        }
        console.log("Is dev mode:", isDevMode());
    }

    // a helper function which returns an object version of the response JSON
    private getJSON(res: Response) {
        return res.json();
    }

    // a helper function to check to see if our response has an error or not. We can change this to make a good error message to the user at some point
    private checkForError(res: Response) {
        if (res.status >= 200 && res.status < 300) {
            return res;
        } else {
            let error = new Error(res.statusText);
            error["response"] = res;
            throw error;
        }
    }

    get(path: string): Observable<any> {
        let tokenHolder: String;
        let loginName: String;
        let getHeaders: Headers;

        // debugger;
         if ( this.localStorage.getItem("token")) {
            tokenHolder = this.localStorage.getItem("token");
            loginName = this.localStorage.getItem("login");
        } else {
            tokenHolder = "";
            loginName = "";
        }
        // GET requests do not send any content, and just accept the JSON returned
        getHeaders = new Headers({
            "Accept": "application/json",
            "x-access-token": tokenHolder,
            "loginName": loginName
        });
        return this.http.get(
            this.url + path,
            {headers: getHeaders}
        )
        .map(this.checkForError)
        .catch(err => Observable.throw(err))
        .map(this.getJSON);
    }

    post(path: string, body: string): Observable<any> {
        let tokenHolder: String;
        let loginName: String;
        let postHeaders: Headers;

         if ( this.localStorage.getItem("token")) {
            tokenHolder = this.localStorage.getItem("token");
            loginName = this.localStorage.getItem("login");
        } else {
            tokenHolder = "";
            loginName = "";
        }
        postHeaders = new Headers({
            "Content-Type": "application/json",
            "Accept": "application/json",
            "x-access-token": tokenHolder,
            "loginName": loginName
        });

        return this.http.post(
            this.url + path,
            body,
            {headers: postHeaders}
        )
        .map(this.checkForError)
        .catch(err => Observable.throw(err))
        .map(this.getJSON);
    }

    // this is specifically for the gedcom file upload process
    xhr_post(xhrToSend, url, formData) {
        let tokenHolder: string;
        let loginName: string;

         if ( this.localStorage.getItem("token")) {
            tokenHolder = this.localStorage.getItem("token");
            loginName = this.localStorage.getItem("login");
        } else {
            tokenHolder = "";
            loginName = "";
        }

        xhrToSend.open("POST", url, true);
        xhrToSend.setRequestHeader("x-access-token", tokenHolder);
        xhrToSend.setRequestHeader("loginName", loginName);
        xhrToSend.send(formData);
    }
}