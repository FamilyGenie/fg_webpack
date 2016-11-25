import { Component, Input, Output, EventEmitter, Directive, ElementRef } from "@angular/core";
import { DataService } from "../data-service";
import { Router, ActivatedRoute } from "@angular/router";
import { MyDatePickerModule } from "mydatepicker";

// this Directive code and the export class that follows is to set the focus to the first name field when the page is loaded
// @Directive({
//     selector: "[focusDirective]"
// })
// @Directive({
//     selector: "my-date-picker"
// })
export class FocusDirective {
    constructor(private el: ElementRef) {}
    ngOnInit() {
        this.el.nativeElement.focus();
    }
}

@Component({
    selector: "peopledetails-lineitem",
    styles: [`
        .person-item {
            margin-bottom: 0.5em;
        }
    `],
    templateUrl: "peopledetails-lineitem-component.html"
})
export class PeopleDetailsLineItemComponent {

    @Input() person;
    @Output() onUpdatePerson = new EventEmitter();

    router: Router;
    myDatePickerOptions: any = {
        dateFormat: "mm/dd/yyyy",
        firstDayOfWeek: "su",
        sunHighlight: false,
        showDateFormatPlaceholder: true
    };

    constructor ( private dataService: DataService, _router: Router) {
        this.router = _router;
    }

    ngOnInit () {
        console.log("in OnInit of PeopleDetailsLineItemComponent:", this.person);
    }

    showMap(evt) {
        // console.log(evt, this.person);
        this.router.navigate([
            "map",
            this.person._id
            ]);
    }

    onDateChange(evt) {
        console.log("in onDateChange: ", evt.valid);
    }

    onDateLeave(evt) {
        console.log("in onDateLeave: ", evt);
    }

    onUpdate(evt, field) {
        // console.log("in people details lineitem update", field, evt);
        switch (field) {
            case "fName":
                this.person.fName = evt.target.value;
                break;
            case "mName":
                this.person.mName = evt.target.value;
                break;
            case "lName":
                this.person.lName = evt.target.value;
                break;
            case "birthDate":
                console.log("birthdate update with: ", evt.formatted);
                this.person.birthDate = this.dataService.dateConvertMMDDYYYYtoYYYYMMDD(evt.formatted);
                break;
            case "birthPlace":
                this.person.birthPlace = evt.target.value;
                break;
            case "deathDate":
                // this.person.deathDate = evt.target.value;
                console.log("deathDate update with: ", evt.formatted);
                this.person.deathDate = this.dataService.dateConvertMMDDYYYYtoYYYYMMDD(evt.formatted);
                break;
            case "deathPlace":
                this.person.deathPlace = evt.target.value;
                break;
            case "sexAtBirth":
                let arr = evt.target.value.split("");
                arr.splice(0, arr.indexOf(":") + 2);
                this.person.sexAtBirth = arr.join();
                break;
            default:
                console.log("in default of update people details line item switch statement");
                break;
        }
        console.log("Update Person: ", this.person);
        this.onUpdatePerson.emit(this.person);

    }
}