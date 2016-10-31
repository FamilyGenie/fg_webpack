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

@Injectable()
export class ApiService {
    // for local storage to get the token to put into the headers
    localStorage: CoolLocalStorage;

    // this is the URL of our server, will need to update if the server changes
    url: string = "http://localhost:3500";

    // We have different headers for post and get. For post, we are sending
    // content and need a "content-type" header
    // postHeaders: Headers;
    // = new Headers({
    //     "Content-Type": "application/json",
    //     "Accept": "application/json",
    //     "token": this.tokenHolder
    //     // "token": this.localStorage.getItem("token")
    // });

    // GET requests do not send any content, and just accept the JSON returned
    // getHeaders: Headers;
    //  = new Headers({
    //     "Accept": "application/json",
    // });

    constructor(
        private http: Http,
        localStorage: CoolLocalStorage
    ) {
        this.localStorage = localStorage;
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
        let postHeaders: Headers
        
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
}