import { Component } from "@angular/core";
import { DataService } from "../data-service";
import { Router, ActivatedRoute } from "@angular/router";

import { PeopleDetailsLineItemComponent } from "./peopledetails-lineitem.component";
import { ParentalRelationshipComponent } from "./parentalrelationship.component";
import { PairBondRelationshipComponent } from "./pairbondrelationship.component";
import { PersonChangeComponent } from "./personchange.component";

@Component({
    selector: "people-details",
    providers: [
        ParentalRelationshipComponent
    ],
    templateUrl: "peopledetails.component.html"
})
export class PeopleDetailsComponent {

    star_id: string;
    newParentalRel_id: string;

    router: Router;

    constructor (
        private dataService: DataService,
        private route: ActivatedRoute,
        private _router: Router,
        private parentalRelComp: ParentalRelationshipComponent
    ) { this.router = _router; }

    ngOnInit () {
        // when page loads, grab the parameter from the URL and assign it to the variable "star_id"
        this.route.params.subscribe(function(params) {
            // console.log("In people details OnInit. Here are the params:", params._id);
            this.star_id = params._id;
            // Couldn't get this code below to work. Leaving it in case I find someone who can help me with it
            // if (!this.dataService.getPersonById(params._id)) {
            //     alert("No person with that ID, you are being directed to the PeopleSearch page");
            //     // route to new person created
            //     this.router.navigate([
            //         "peoplesearch"
            //         ]);
            //     // return;
            // } else {
            //     this.star_id = params._id;
            // }
        }.bind(this));
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

    // Does this need to go through PeopleDetails.component????
    deletePerson(_id) {
        console.log("in people details deletePerson, with:", _id);
        this.dataService.deletePerson(_id).subscribe( function() {
            this.router.navigate([
                "peoplesearch"
                ]
            );
        }.bind(this));
    }

    createParent() {
        console.log("create new parent clicked");
        this.dataService.createParent(this.star_id).subscribe();
    }

    createPairBond() {
        console.log("create new pair bond clicked");
        this.dataService.createPairBond(this.star_id).subscribe();
    }

    createPersonChange() {
        console.log("create new person change clicked");
        this.dataService.createPersonChange(this.star_id).subscribe();
    }

    getPersonDetails() {
        // console.log("in peopledetails.component.getPersonDetails with:", this.star_id, this.dataService.getPersonById(this.star_id));
        return this.dataService.getPersonById(this.star_id);
    }

    getParentalRelationships() {
        // get all the parentalRel records where main person on the page is the child in the relationship
        // console.log("in getParentalRelationships of peopledetails.component for:", this.star_id);
        let result = this.dataService.parentalRelationships.filter(
            function(rel)
            { return rel.child_id === this.star_id; }
        .bind(this));
        // console.log("result of find:", result);
        return result;
    }

    getPairBondRelationships() {
        // find all the pair bond reltionships where the person to edit on this page is either personOne in the pairBondRel record or personTwo
        let result = this.dataService.pairBondRelationships.filter(
            function(rel)
            { return (rel.personOne_id === this.star_id) ||
                (rel.personTwo_id === this.star_id);
            }
        .bind(this));
        return result;
    }

    getPersonChanges() {
        // console.log("in peopledetails.component.getPersonChanges");
        let result = this.dataService.personChanges.filter(
            function(rec)
            { return rec.person_id === this.star_id; }
        .bind(this));
        return result;
    }

    updatePairBondRel(evt) {
       // console.log("in peopledetails.component.updatePairBondRel with:", evt);
       this.dataService.updatePairBondRel(evt).subscribe();
    }

    updateParentalRel(evt) {
        // console.log("in peopledetails.component.updateParentalRel with:", evt);
        this.dataService.updateParentalRel(evt).subscribe();
    }

    updatePerson(evt) {
        // console.log("in peopledetails.component upDatePerson:", evt);
        this.dataService.updatePerson(evt).subscribe();
    }

    updatePersonChange(evt) {
        console.log("in peopledetails.component upDatePersonChange:", evt);
        this.dataService.updatePersonChange(evt).subscribe();
    }

}