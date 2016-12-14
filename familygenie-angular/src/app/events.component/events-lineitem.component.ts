import { Component, Input, Output, EventEmitter } from "@angular/core";
import { DataService } from "../data-service";
import { FormsModule } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
    selector: "events-lineitem",
    styles: [`
        .event-item {
            margin-bottom: 0.5em;
        }
    `],
    templateUrl: "events-lineitem.component.html"
})
export class EventsLineItemComponent {

    @Input() event;
    @Output() onUpdateEvent = new EventEmitter();
    // this variable is to access for 
    personFullName;

    router: Router;

    constructor (_router: Router, private dataService: DataService) {
        this.router = _router;
    }

    ngOnInit () {
        let person = this.dataService.getPersonById(this.event.person_id);
        // console.log("In events lineitem OnInit, with: ", person);
        if (person) {
            if (person.fName) {
                this.personFullName = person.fName;
            }
            if (person.lName) {
                this.personFullName += " " + person.lName;
            }
        }
    };

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
        // console.log("in event lineitem onSelect, with: ", evt.target.value);
        this.onUpdate(evt, "person_id");
        this.ngOnInit();
    }

    get dateFormat() {
        return "MM/dd/yyyy";
    }

        onUpdate(evt, field) {
        // console.log("in event lineitem update", field, evt);
        switch (field) {
            case "person_id":
                this.event.person_id = evt.target.value;
                break;
            case "type":
                this.event.type = evt.target.value;
                break;
            case "eventDate":
                console.log("in event lineitem update eventDate: ", evt.target.value);
                this.event.eventDate = evt.target.value;
                break;
            case "place":
                this.event.place = evt.target.value;
                break;
            case "details":
                this.event.details = evt.target.value;
                break;
            default:
                console.log("in default of update event line item switch statement");
                break;
        }
        // console.log("Update Event: ", this.person);
        this.onUpdateEvent.emit(this.event);

    }

    deleteEvent(_id) {
        // console.log("in events lineitem delete, with:", _id);
        this.dataService.deleteEvent(_id).subscribe();
    }
}