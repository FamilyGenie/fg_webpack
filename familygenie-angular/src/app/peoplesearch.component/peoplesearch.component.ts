import { Component } from "@angular/core";
import { DataService } from "../data-service";
import { PeopleSearchLineItemComponent } from "./peoplesearch-lineitem.component";
import { Router } from "@angular/router";
import { Pipe, PipeTransform } from "@angular/core";
import { OrderByPipe } from "../pipes/orderBy";

@Component({
    selector: "people-search",
    template: `
        <div class="container">
            <h1>Family Members</h1>
        </div>
        <div class="container select-container"> 
            
                    <div class="row">
                        <div class="col-xs-2 title bold can-click"
                            (click)="setSortBy('fName')"
                        >
                            First Name
                        </div>
                        <div class="col-xs-2 title bold can-click"
                            (click)="setSortBy('mName')"
                        >
                            Middle
                        </div>
                        <div class="col-xs-2 title bold can-click"
                            (click)="setSortBy('lName')"
                        >
                            Last Name
                        </div>
                        <div class="col-xs-2 title bold can-click"
                            (click)="setSortBy('birthDate')"
                        >
                            Birth Date
                        </div>
                        <div class="col-xs-2 title bold can-click"
                            (click)="setSortBy('birthPlace')"
                        >
                            Birth Place
                        </div>
                        <div class="col-xs-1 title bold can-click"
                            (click)="setSortBy('sexAtBirth')"
                        >
                            Gender
                        </div>
                    </div>
                    <peoplesearch-lineitem
                        *ngFor="let person of dataService.persons | orderBy: sortBy"
                        [person]="person"
                    ></peoplesearch-lineitem>
            
                    <div class="row">
                        <div class="col-xs-1 title">
                            <br>
                            <button class="btn btn-primary btn-round" (click)="createPerson()">Add Person</button>
                        </div>
                    </div>
        </div>
    `
})
export class PeopleSearchComponent {

    router: Router;
    varSortBy: string = "birthDate";
    varSortByAsc: boolean = false;
    lastSortBy: string = "birthDate";

    constructor (private dataService: DataService, _router: Router) {
        this.router = _router;
    }

    get sortBy() {
        // this.varSortByAsc = !this.varSortByAsc;
        // console.log("in get sortBy: ", this.varSortByAsc);
        return this.varSortBy;
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

    ngOnInit() {
        // when this page is brought up, check to see if the firt person in the array has an id of 0. If so, remove that record. If it exists, it was added by the pairbondrelationship component, or the parentalrelationship component. In the getAllPeople method of that component. It is not needed here, and would cause an error if someone saw it and tried to delete it.
        if (this.dataService.persons.find( function(person) {
                return person._id === 0;
            })) {
            this.dataService.persons.splice(0, 1);
        }
    }

    createPerson() {
        this.dataService.createPerson().subscribe( function(newId) {
            // route to new person created
            this.router.navigate([
                "peopledetails",
                newId
                ]
            );
        }.bind(this));
    }
}