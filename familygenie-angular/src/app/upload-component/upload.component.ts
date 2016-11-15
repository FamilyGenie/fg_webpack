import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../auth-service/auth.service";

@Component({
    selector: "upload",
    templateUrl: "upload.component.html"
})
export class UploadComponent {

    filesToUpload: Array<File>;
    // fileDisplayName: string;
    fileDisplayName = "Hi";

    constructor() {
        this.filesToUpload = [];
        this.fileDisplayName = "Hello";
    }

    upload() {
        this.makeFileRequest("http://localhost:3500/uploads", [], this.filesToUpload).then((result) => {
            console.log(result);
        }, (error) => {
            console.error(error);
        });
    }

    fileChangeEvent(fileInput: any) {
        this.filesToUpload = <Array<File>> fileInput.target.files;
        this.fileDisplayName = fileInput.target.files[0].name;
        // console.log("file change event: ", fileInput.target.files, fileInput.target.files[0].name);
    }

    makeFileRequest(url: string, params: Array<string>, files: Array<File>) {
        return new Promise((resolve, reject) => {
            let formData: any = new FormData();
            let xhr = new XMLHttpRequest();
            // append the file into the formData. I have to admit, I'm not exactly sure how or why this works, just that is does after trial and error experimentation
            formData.append("gedcom", files[0]);
            // the below three lines are the code that came with the example found
            // for (let i = 0; i < files.length; i++) {
            //     formData.append("uploads[]", files[i], files[i].name);
            // }
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        // this line below was causing an unexpected end of JSON error, and I didn't see what it was doing, so commenting it out. Though I need to figure out what kind of repercussions this will have.
                        // resolve(JSON.parse(xhr.response));
                    } else {
                        console.log("not an xhr status 200");
                        reject(xhr.response);
                    }
                }
            };
            xhr.open("POST", url, true);
            xhr.send(formData);
        });
    }
}