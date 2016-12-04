import { Component, Input } from "@angular/core";
import { DataService } from "../data-service";
import { FormsModule } from "@angular/forms";
import { Router } from "@angular/router";


@Component({
    selector: "peoplesearch-lineitem",
    styles: [`
        .person-item {
            margin-bottom: 0.5em;
        }
    `],
    template: `
            <div class="row person-item"> 
                <div class="col-xs-2 custom-input">
                    <input
                        class="form-control"
                        type="text"
                        readonly
                        [ngModel]="person.fName"
                    />
                </div>
                <div class="col-xs-2 custom-input">
                    <input
                        class="form-control"
                        type="text"
                        readonly
                        [ngModel]="person.mName"
                    />
                </div>
                <div class="col-xs-2 custom-input">
                    <input
                        class="form-control"
                        type="text"
                        readonly
                        [ngModel]="person.lName"
                    />
                </div>
                <div class="col-xs-2 custom-input">
                    <input
                        class="form-control"
                        type="text"
                        readonly
                        [ngModel]="person.birthDate | date:dateFormat"
                    />
                </div>
                <div class="col-xs-2 custom-input">
                    <input
                        class="form-control"
                        type="text"
                        readonly
                        [ngModel]="person.birthPlace"
                    />
                </div>
                <div class="col-xs-1 custom-input">
                    <input
                        class="form-control"
                        type="text"
                        readonly
                        [ngModel]="person.sexAtBirth"
                    />
                </div>
                <div class="col-xs-1 custom-input">
                <button class="btn btn-primary btn-round" (click)="showPerson()">Details</button>
                <div>
            </div>
    `
})
export class PeopleSearchLineItemComponent {

    @Input() person;

    router: Router;

    constructor (_router: Router, private dataService: DataService) {
        this.router = _router;
    }

    ngOnInit (): void {
        // console.log(this.person.birthDate.substr(0, this.person.birthDate.length));
        // console.log(this.person.lName.substr(0, this.person.lName.length));
    }

    get dateFormat() {
        return "MM/dd/yyyy";
    }
    showPerson() {
        this.router.navigate([
            "peopledetails",
            this.person._id
            ]);
    }
}