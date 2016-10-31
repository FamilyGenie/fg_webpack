import { Component, Input, Output, EventEmitter } from "@angular/core";
import { DataService } from "../data-service";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
    selector: "personchange",
    styles: [`
        .pairbond-item {
            margin-bottom: 0.5em;
        }
    `],
    template: `
        <div class="row pairbond-item">
            <div *ngIf="this.personChange" class="col-xs-2 custom-input">
                <input
                    data-toggle="tooltip" data-placement="top" title="If only year is known, enter it as Jan 1"
                    class="form-control"
                    type="date"
                    [ngModel]="this.dataService.getFormattedDate(personChange.dateChange)"
                    (blur)="onUpdate($event, 'dateChange')"
                />
            </div>
            <div *ngIf="this.personChange" class="col-xs-2 custom-input">
                <input
                    class="form-control"
                    type="text"
                    [ngModel]="personChange.fName"
                    (blur)="onUpdate($event, 'fName')"
                />
            </div>
            <div *ngIf="this.personChange" class="col-xs-2 custom-input">
                <input
                    class="form-control"
                    type="text"
                    [ngModel]="personChange.mName"
                    (blur)="onUpdate($event, 'mName')"
                />
            </div>
            <div *ngIf="this.personChange" class="col-xs-2 custom-input">
                <input
                    class="form-control"
                    type="text"
                    [ngModel]="personChange.lName"
                    (blur)="onUpdate($event, 'lName')"
                />
            </div>
            <div *ngIf="this.personChange" class="col-xs-1 custom-input">
                <input
                    class="form-control"
                    type="text"
                    [ngModel]="personChange.sex"
                    (blur)="onUpdate($event, 'sex')"
                />
            </div>
            <div class="col-xs-1 custom-input">
                <button class="btn btn-primary btn-round" 
                (click)="deleteRec(personChange._id)">-</button>
            </div>
        </div>
    `
})
export class PersonChangeComponent {
    @Input() personChange;
    @Output() onUpdatePersonChange = new EventEmitter();
    router: Router;
    // this ir to store what person we are showing the changes for
    star_id: string;

    constructor (
        private dataService: DataService,
        private route: ActivatedRoute,
        private _router: Router
    ) {
        this.router = _router;
    }

    ngOnInit () {
        this.route.params.subscribe(function(params) {
            this.star_id = params._id;
        }.bind(this));
    }

    onUpdate(evt, field) {
        console.log("in personChange.onUpdate", field, evt.target.value);
        switch (field) {
            case "dateChange":
                this.personChange.dateChange = evt.target.value;
                break;
            case "fName":
                this.personChange.fName = evt.target.value;
                break;
            case "mName":
                this.personChange.mName = evt.target.value;
            case "lName":
                this.personChange.lName = evt.target.value;
                break;
            case "sex":
                this.personChange.sex = evt.target.value;
                break;
            default:
                console.log("in default of update person change switch statement");
                break;
        }

        this.onUpdatePersonChange.emit(this.personChange);
    }

    deleteRec(_id) {
        console.log("in personChange.deleteRel, with:", _id);
        this.dataService.deletePersonChange(_id).subscribe();
    }
}