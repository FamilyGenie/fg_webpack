import { Component } from "@angular/core";
import { DataService } from "../data-service";
// import { PeopleSearchLineItemComponent } from "./peoplesearch-lineitem.component";
import { Router } from "@angular/router";
import { OrderByPipe } from "../pipes/orderBy";

@Component({
    selector: "events",
    template: `
        <div class="container">
            <h1>Family Life Fact Chronology</h1>
        </div>
        <div class="container select-container"> 
            
                    <div class="row">
                        <div class="col-xs-2 title bold can-click"
                            (click)="setSortBy('fName')"
                        >
                            When
                        </div>
                        <div class="col-xs-2 title bold can-click"
                            (click)="setSortBy('mName')"
                        >
                            Who
                        </div>
                        <div class="col-xs-2 title bold can-click"
                            (click)="setSortBy('lName')"
                        >
                            What
                        </div>
                        <div class="col-xs-2 title bold can-click"
                            (click)="setSortBy('birthDate')"
                        >
                            Where
                        </div>
                        <div class="col-xs-3 title bold can-click"
                            (click)="setSortBy('birthPlace')"
                        >
                            Context
                        </div>
                    </div>
                    <events-lineitem
                        *ngFor="let event of dataService.events | orderBy: sortBy"
                        [event]="event"
                        (onUpdateEvent)="updateEvent($event)"
                    ></events-lineitem>

                    <div class="row">
                        <div class="col-xs-1 title">
                            <br>
                            <button class="btn btn-primary btn-round" (click)="createEvent('','','','','')">Add Event</button>
                        </div>
                        <div class="col-xs-1 title">
                            <br>
                            <button class="btn btn-primary btn-round" (click)="addPeopleDatesPre()">Add People Dates</button>
                        </div>
                    </div>
        </div>
    `
})
export class EventsComponent {

    router: Router;
    varSortBy: string = "eventDate";

    constructor (private dataService: DataService, _router: Router) {
        this.router = _router;
    }

    get sortBy() {
        // this.varSortByAsc = !this.varSortByAsc;
        // console.log("in get sortBy: ", this.varSortByAsc);
        return this.varSortBy;
    }

    updateEvent(evt) {
        // console.log("in event.component updateEvent:", evt);
        this.dataService.updateEvent(evt).subscribe();
    }

    setSortBy(input: string): void {

        // if the last time was a desc search
        if ( this.varSortBy.substr(0, 1) === "-") {
            // then if the colunm was the same as last time, reverse the order
            if (this.varSortBy.substr(1, this.varSortBy.length) === input ) {
                this.varSortBy = input;
            }
            // if the column was not the same as last time, the we want to keep the sort asc
            else {
                this.varSortBy = input;
            }
        } else {
            // if the first character was not a "-", means that the last search was asc
            if (this.varSortBy.substr(0, this.varSortBy.length) === input ) {
                this.varSortBy = "-" + input;
            } else {
                this.varSortBy = input;
            }
        }
    }

    createEvent(person_id, type, eventDate, place, details) {
        this.dataService.createEvent(person_id, type, eventDate, place, details).subscribe();
    }

    addPeopleDatesPre(): void {
        if (confirm("If you click Continue, all the birthdays and deaths will that were entered in the People Details page will be added as events, but only if they currently do not exist as an event record. Hit Cancel to abort.")) {
            this.addPeopleDates();
        }
    }


    addPeopleDates() {
        let i: number;
        let event;
        let person;
        let alertTextBirth: string = "Birthdays Added:\n";
        let alertTextDeath: string = "Deaths Added:\n";

        for (i = 0; i < this.dataService.persons.length; i++) {
            person = this.dataService.persons[i];
            // console.log(this.dataService.persons[i].fName);
            /*******************
            Check for birthdays to add first
            ********************/
            event = this.dataService.events.find(
                    function(evt) {
                    return evt.person_id === person._id &&
                    this.dataService.getFormattedDate(evt.eventDate) === this.dataService.getFormattedDate(person.birthDate) &&
                    evt.type === "Birthday";
                    }.bind(this)
                );
            if (!event) {
                // if the event record does not exist, then need to add birthDate to events table only if there is a birthday to add
                if (person.birthDate) {
                    alertTextBirth += person.fName + " " + person.lName + " " + person.birthDate + "\n";
                    this.createEvent(person._id, "Birthday", person.birthDate, person.birthPlace, "Event created from data entered about person");
                }
            }

            /*******************
            Check for deaths to add 
            ********************/
            event = this.dataService.events.find(
                    function(evt) {
                    return evt.person_id === person._id &&
                    this.dataService.getFormattedDate(evt.eventDate) === this.dataService.getFormattedDate(person.deathDate) &&
                    evt.type === "Death";
                    }.bind(this)
                );
            if (!event) {
                // if the event record does not exist, then need to add deathDate to events table only if there is a birthday to add
                if (person.deathDate) {
                    alertTextDeath += person.fName + " " + person.lName + " " + person.deathDate + "\n";
                    this.createEvent(person._id, "Death", person.deathDate, person.deathPlace, "Event created from data entered about person");
                }
            }
        } // end of looping through each person
        alert(alertTextBirth);
        alert(alertTextDeath);
    }
}