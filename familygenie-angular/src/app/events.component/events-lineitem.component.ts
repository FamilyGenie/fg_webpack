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
    template: `
            <div class="row event-item"> 
                <div class="col-xs-2 custom-input">
                    <input
                        class="form-control"
                        type="text"
                        [ngModel]="event.person_id"
                        (blur)="onUpdate($event, 'person_id')"
                    />
                </div>
                <div class="col-xs-2 custom-input">
                    <input
                        class="form-control"
                        type="text"
                        [ngModel]="event.type"
                        (blur)="onUpdate($event, 'type')"
                    />
                </div>
                <div class="col-xs-2 custom-input">
                    <input
                        class="form-control"
                        type="text"
                        [ngModel]="event.eventDate | date:dateFormat"
                        (blur)="onUpdate($event, 'eventDate')"
                    />
                </div>
                <div class="col-xs-2 custom-input">
                    <input
                        class="form-control"
                        type="text"
                        [ngModel]="event.place"
                        (blur)="onUpdate($event, 'place')"
                    />
                </div>
                <div class="col-xs-3 custom-input">
                    <textarea
                        class="form-control"
                        type="textarea"
                        [ngModel]="event.details"
                        (blur)="onUpdate($event, 'details')"
                    ></textarea>
                </div>
                <div class="col-xs-1 custom-input">
                <button class="btn btn-primary btn-round" (click)="deleteEvent(event._id)">-</button>
                <div>
            </div>
    `
})
export class EventsLineItemComponent {

    @Input() event;
    @Output() onUpdateEvent = new EventEmitter();

    router: Router;

    constructor (_router: Router, private dataService: DataService) {
        this.router = _router;
    }

    get dateFormat() {
        return "MM/dd/yyyy";
    }

        onUpdate(evt, field) {
        console.log("in event lineitem update", field, evt);
        switch (field) {
            case "person_id":
                this.event.person_id = evt.target.value;
                break;
            case "type":
                this.event.type = evt.target.value;
                break;
            case "eventDate":
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
        console.log("in events lineitem delete, with:", _id);
        this.dataService.deleteEvent(_id).subscribe();
    }
}