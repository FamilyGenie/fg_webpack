import { Component, Input, Output, EventEmitter } from "@angular/core";
import { DataService } from "../data-service";
// import { FORM_DIRECTIVES } from "@angular/common";
import { Router } from "@angular/router";
import { MyDatePickerModule } from "mydatepicker";

declare let $;

@Component({
    selector: "parentalrelationship",
    styles: [`
        .parent-item {
            margin-bottom: 0.5em;
        }
    `],
    template: `
        <div class="row parent-item">
            <div id="parentselect" *ngIf="!this.personFullName" class="container select-container col-xs-10">
            
                <div *ngIf="!this.personFullName" class="col-xs-6">
                    <br>
                    <h4>Select person to add as parent</h4>
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
                    [ngModel]="parentalRel.relationshipType"
                    (change)="onUpdate($event, 'relationshipType')"
                >
                    <option *ngFor="let parentalRelType of this.dataService.parentalRelTypes"
                        [ngValue]="parentalRelType.parentalRelType"
                    >
                        {{parentalRelType.parentalRelType}}
                    </option>
                </select>
            </div>
            <div *ngIf="this.personFullName" class="col-xs-2 custom-input">
                <select 
                    class="form-control" 
                    [ngModel]="parentalRel.subType"
                    (change)="onUpdate($event, 'subType')"
                >
                    <option *ngFor="let subType of subTypes"
                        [ngValue]="subType"
                    >
                        {{subType}}
                    </option>
                </select>
            </div>
            <div *ngIf="this.personFullName" class="col-xs-2 custom-input">
                <my-date-picker 
                    [options]="myDatePickerOptions"
                    [selDate]="this.dataService.getFormattedDateMMDDYYYY(parentalRel.startDate)"
                    (dateChanged)="onUpdate($event, 'startDate')"
                >
                </my-date-picker>
                <!-- <input 
                    data-toggle="tooltip" data-placement="top" title="If only year is known, enter it as Jan 1"
                    class="form-control"
                    type="date"
                    [ngModel]="this.dataService.getFormattedDate(parentalRel.startDate)"
                    (blur)="onUpdate($event, 'startDate')"
                /> -->
            </div>
            <div *ngIf="this.personFullName" class="col-xs-2 custom-input">
                <my-date-picker 
                    [options]="myDatePickerOptions"
                    [selDate]="this.dataService.getFormattedDateMMDDYYYY(parentalRel.endDate)"
                    (dateChanged)="onUpdate($event, 'endDate')"
                >
                </my-date-picker>
                <!-- <input
                    data-toggle="tooltip" data-placement="top" title="If only year is known, enter it as Jan 1"
                    class="form-control"
                    type="date"
                    [ngModel]="this.dataService.getFormattedDate(parentalRel.endDate)"
                    (blur)="onUpdate($event, 'endDate')"
                /> -->
            </div>
            <div class="col-xs-2 custom-input">
                <button class="btn btn-primary btn-round" 
                (click)="deleteRel(parentalRel._id)">-</button>
            </div>
        </div>
    `
})
export class ParentalRelationshipComponent {

    @Input() parentalRel;
    @Output() onUpdateParentalRel = new EventEmitter();
    router: Router;
    // set the myDatePickerOptions so it shows correctly. Use a global service from dataService so that all datepickers across the app work the same way
    myDatePickerOptions: any = this.dataService.setMyDatePickerOptions();

    personFullName: string;
    parentRelTypes = [ "Father", "Mother"];
    subTypes = [ "Biological", "Step", "Adopted"];

    constructor ( private dataService: DataService, _router: Router) {
        this.router = _router;
    }

    ngOnInit () {
        // console.log("loading parentalRel Component with", this.parentalRel);

        // on page load, set the class property "personFullName" to the full name of the parent in the parentRel record. This will be an uneditable field on this screen.
        // need error handling here: what if this doesn't return anyone
        let person = this.dataService.getPersonById(this.parentalRel.parent_id);

        // if there is a person selected in the record
        if (person) {
            if (person.fName) {
                this.personFullName = person.fName;
            }
            if (person.lName) {
                this.personFullName += " " + person.lName;
            }

            // if the relationship type is not yet set and there is a sexAtBirth set for the parent, then default the Parent Type field
            if (!this.parentalRel.relationshipType && person.sexAtBirth) {
                if (person.sexAtBirth === "F") {
                    this.parentalRel.relationshipType = "1: Mother";
                } else {
                    this.parentalRel.relationshipType = "0: Father";
                }
            }
        }
    }

    openNewDetail () {
        this.router.navigate([
            "peopledetails",
            this.parentalRel.parent_id
            ]);
    }

    getAllPeople() {
        // if the first object in the array is not the blank person, then add them to the persons dataService. This is so the dropdown that is shown shows the user that they need to select a person. This value is not pushed to the database. Only put into the local data model.
        // debugger;
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
        console.log("in onselect, anything here:", evt.target.value);
        this.onUpdate(evt, "parent_id");
        this.ngOnInit();
    }

    parentRelTypeSelect(evt) {
        console.log("parent rel type select", evt);
        this.onUpdate(evt, "relationshipType");
    }

    // Does this need to go through PeopleDetails.component????
    deleteRel(_id) {
        console.log("in parental relationship deleteRel, with:", _id);
        this.dataService.deleteParentalRel(_id).subscribe();
    }

    onUpdate(evt, field) {
        switch (field) {
            case "parent_id":
                this.parentalRel.parent_id = evt.target.value;
                break;
            case "relationshipType":
                this.parentalRel.relationshipType = evt.target.value;
                break;
            case "subType":
                this.parentalRel.subType = evt.target.value;
                // if the subType is biological, set the startDate to star's birthday
                if ( /[Bb]iological/.test(this.parentalRel.subType) ) {
                    // get the star of the page
                    let star = this.dataService.getPersonById(this.parentalRel.child_id);
                    // if there is a birthdate on record for the star, set the startDate of the parental relationship to it
                    if (star.birthDate) {
                        this.parentalRel.startDate = star.birthDate;
                    }
                }
                break;
            case "startDate":
                // this.parentalRel.startDate = evt.target.value;
                this.parentalRel.startDate = this.dataService.dateConvertMMDDYYYYtoYYYYMMDD(evt.formatted);
                break;
            case "endDate":
                // this.parentalRel.endDate = evt.target.value;
                this.parentalRel.endDate = this.dataService.dateConvertMMDDYYYYtoYYYYMMDD(evt.formatted);
                break;
            default:
                console.log("in default of update parentalRel switch statement");
                break;
        }

        this.onUpdateParentalRel.emit(this.parentalRel);
    }
}