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
                            Who
                        </div>
                        <div class="col-xs-2 title bold can-click"
                            (click)="setSortBy('mName')"
                        >
                            What
                        </div>
                        <div class="col-xs-2 title bold can-click"
                            (click)="setSortBy('lName')"
                        >
                            When
                        </div>
                        <div class="col-xs-2 title bold can-click"
                            (click)="setSortBy('birthDate')"
                        >
                            Where
                        </div>
                        <div class="col-xs-4 title bold can-click"
                            (click)="setSortBy('birthPlace')"
                        >
                            Details
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
                            <button class="btn btn-primary btn-round" (click)="createEvent()">Add Event</button>
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
        console.log("in event.component updateEvent:", evt);
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

    createEvent() {
        this.dataService.createEvent().subscribe();
    }
}