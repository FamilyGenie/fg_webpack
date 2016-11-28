import { Component, Input } from "@angular/core";
import { DataService } from "../data-service";
// import { FORM_DIRECTIVES } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Router } from "@angular/router";
// import { MD_BUTTON_DIRECTIVES } from "@angular2-material/button";
// import { MD_RIPPLE_DIRECTIVES } from "@angular2-material/core";
// import { MD_GRID_LIST_DIRECTIVES } from "@angular2-material/grid-list";


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
                        [ngModel]="this.dataService.getFormattedDateMMDDYYYY(person.birthDate)"
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

    showPerson() {
        this.router.navigate([
            "peopledetails",
            this.person._id
            ]);
    }
}