import { Component, Input, Output, EventEmitter } from "@angular/core";
import { DataService } from "../data-service";
import { Router, ActivatedRoute } from "@angular/router";
import { MyDatePickerModule } from "mydatepicker";

@Component({
    selector: "pairbondrelationship",
    styles: [`
        .pairbond-item {
            margin-bottom: 0.5em;
        }
    `],
    template: `
        <div class="row pairbond-item">
            <div id="pairbondselect" *ngIf="!this.personFullName" class="container select-container col-xs-8">
            
                <div *ngIf="!this.personFullName" class="col-xs-6">
                    <br>
                    <h4>Select person to add as pair bond</h4>
                </div>
                <div *ngIf="!this.personFullName" class="col-xs-3">
                    <br>
                    <select class="form-control dropdown" (change)="onSelect($event)">
                        <option
                            *ngFor="let person of getAllPeople()" 
                            value= {{person._id}}
                        >{{person.fName}} {{person.lName}}
                        </option>
                    </select>
                </div>
            
             </div>
            <div *ngIf="this.personFullName" class="col-xs-2 custom-input" (click)="openNewDetail()">
                <input
                    class="form-control can-click"
                    type="text"
                    readonly
                    [ngModel]="personFullName"
                />
            </div>
            <div *ngIf="this.personFullName" class="col-xs-2 custom-input">
                <select 
                    class="form-control" 
                    [ngModel]="pairBondRel.relationshipType"
                    (change)="onUpdate($event, 'relationshipType')"
                >
                    <option *ngFor="let relType of relTypes"
                        [ngValue]="relType"
                    >
                        {{relType}}
                    </option>
                </select>
            </div>
            <div *ngIf="this.personFullName" class="col-xs-2 custom-input">
                <my-date-picker 
                    [options]="myDatePickerOptions"
                    [selDate]="this.dataService.getFormattedDateMMDDYYYY(pairBondRel.startDate)"
                    (dateChanged)="onUpdate($event, 'startDate')"
                >
                </my-date-picker>
                <!-- <input
                    data-toggle="tooltip" data-placement="top" title="If only year is known, enter it as Jan 1"
                    class="form-control"
                    type="date"
                    [ngModel]="this.dataService.getFormattedDate(pairBondRel.startDate)"
                    (blur)="onUpdate($event, 'startDate')"
                /> -->
            </div>
            <div *ngIf="this.personFullName" class="col-xs-2 custom-input">
                <my-date-picker 
                    [options]="myDatePickerOptions"
                    [selDate]="this.dataService.getFormattedDateMMDDYYYY(pairBondRel.endDate)"
                    (dateChanged)="onUpdate($event, 'endDate')"
                >
                </my-date-picker>
                <!-- <input
                    data-toggle="tooltip" data-placement="top" title="If only year is known, enter it as Jan 1"
                    class="form-control"
                    type="date"
                    [ngModel]="this.dataService.getFormattedDate(pairBondRel.endDate)"
                    (blur)="onUpdate($event, 'endDate')"
                /> -->
            </div>
            <div class="col-xs-2 custom-input">
                <button class="btn btn-primary btn-round" 
                (click)="deleteRel(pairBondRel._id)">-</button>
            </div>
        </div>

    `
})
export class PairBondRelationshipComponent {
    @Input() pairBondRel;
    @Output() onUpdatePairBondRel = new EventEmitter();
    // personOneFullName: string;
    // personTwoFullName: string;
    personFullName: string;

    person_id: string;
    pairBond_id: string;
    relTypes = ["Marriage", "Informal"];
    router: Router;
    // set the myDatePickerOptions so it shows correctly. Use a global service from dataService so that all datepickers across the app work the same way
    myDatePickerOptions: any = this.dataService.setMyDatePickerOptions();

    constructor (
        private dataService: DataService,
        private route: ActivatedRoute,
        private _router: Router
    ) {
        this.router = _router;
    }

    ngOnInit () {

        // on page load, find the full name of the person in the pairbondRel that is not the main person on this screen. This will be an uneditable field on this screen.

        // when page loads, grab the parameter from the URL and assign it to the class property "person_id".
        this.route.params.subscribe(function(params) {
            this.person_id = params._id;
        }.bind(this));
        // console.log("in pairbondRelationship.component.OnInit, with:", this.person_id);

        // check to see if the person_id for this page is personOne or personTwo. Whichever one is the person for this page, we want to show the name for the other person (who the person for this page is in a pair bond with)

        if (this.person_id === this.pairBondRel.personOne_id) {
            this.pairBond_id = this.pairBondRel.personTwo_id;
        } else if (this.person_id === this.pairBondRel.personTwo_id) {
            this.pairBond_id = this.pairBondRel.personOne_id;
        }
        // need error handling here: what if this doesn't return anyone
        let person = this.dataService.getPersonById(this.pairBond_id);
        if (person) {
            if (person.fName) {
                this.personFullName = person.fName;
            }
            if (person.lName) {
                this.personFullName += " " + person.lName;
            }
        }
        // this.personFullName = person.fName + " " + person.lName;
    }

    openNewDetail () {

        this.router.navigate([
            "peopledetails",
            this.pairBond_id
            ]);
    }

    getAllPeople() {
        // if the first object in the array is not the blank person, then add them to the persons dataService. This is so the dropdown that is shown shows the user that they need to select a person. This value is not pushed to the database. Only put into the local data model.
        // debugger;
        // if ( this.dataService.persons[0]._id ) {
        //     if ( this.dataService.persons[0]._id !== 0 ) {
        if (!this.dataService.persons.find( function(person) {
                return person._id === 0;
            })) {
            this.dataService.persons.splice(0, 0,
                {_id: 0,
                fName: "Select",
                lName: "Person"}
            );
        }
        return this.dataService.persons;
    }

    onSelect (evt) {
        console.log("in onselect, anything here:", evt, this.pairBondRel);
        this.onUpdate(evt, "personTwo_id");
        this.ngOnInit();
    }

    // Does this need to go through PeopleDetails.component????
    deleteRel(_id) {
        console.log("in pairbond relationship deleteRel, with:", _id);
        this.dataService.deletePairBondRel(_id).subscribe();
    }

    onUpdate(evt, field) {
        switch (field) {
            case "personTwo_id":
                this.pairBondRel.personTwo_id = evt.target.value;
                break;
            case "relationshipType":
                this.pairBondRel.relationshipType = evt.target.value;
                break;
            case "startDate":
                // this.pairBondRel.startDate = evt.target.value;
                this.pairBondRel.startDate = this.dataService.dateConvertMMDDYYYYtoYYYYMMDD(evt.formatted);
                break;
            case "endDate":
                // this.pairBondRel.endDate = evt.target.value;
                this.pairBondRel.endDate = this.dataService.dateConvertMMDDYYYYtoYYYYMMDD(evt.formatted);
                break;
            default:
                console.log("in default of update pairbond switch statement");
                break;
        }

        this.onUpdatePairBondRel.emit(this.pairBondRel);

    }
}
