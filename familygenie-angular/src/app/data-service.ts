import { Injectable } from  "@angular/core";
import { ApiService } from "./api.service";

@Injectable()
export class DataService {

    // only doing this while we don't have a backend database that we can get the unique ID from
    // next_id: number = 1000;
    persons = [];
    parentalRelationships = [];
    pairBondRelationships = [];
    parentalRelTypes = [];
    personChanges = [];
    // store this here for now, rather that in the database. Needs to move to database eventually
    genderOptions = ["", "M", "F"];

    constructor(private apiService: ApiService) {
        this.loadAllData();
    }

    login(un: string, pw: string) {
        console.log("in dataservice.login");

        return this.apiService.post("/api/v1/login", JSON.stringify({
                username : un,
                password: pw
        }));

    }

    loadAllData() {
        // populate all objects for this user
        this.getAllPeople().subscribe();
        this.getAllParentalRels().subscribe();
        this.getAllPairBondRels().subscribe();
        this.getAllParentalRelTypes().subscribe();
        this.getAllPersonChanges().subscribe();
    }

    clearAllData() {
        // empty all objects
        this.persons = [];
        this.parentalRelationships = [];
        this.pairBondRelationships = [];
        this.parentalRelTypes = [];
        this.personChanges = [];
    }

    dateCalculator (inDate: string, arg: string, value: number): string {
        let date = new Date(inDate);
            switch (arg) {
                 case "addYear":
                     date.setFullYear(date.getFullYear() + value);
                     break;
                 case "subYear":
                     date.setFullYear(date.getFullYear() - value);
                     break;
                 default:
                     console.log("Invalid arguments in call to dateCalculator");
                     break;
             }
         return date.toISOString().substr(0, 10);
     }

    getFormattedDate(inDate) {
        if (inDate) {
            return inDate.substr(0, 10);
        } else {
            return "";
        }
    }

    getAllPeople() {
        // console.log("in get all people");
        return this.apiService.get("/people")
            .do(function(res) {
                this.persons = res;
            }.bind(this)
        );
    }

    getAllParentalRels() {
        // console.log("in get all parentalRels");
        return this.apiService.get("/parentalrels")
            .do(function(res) {
                this.parentalRelationships = res;
            }.bind(this)
        );
    }

    getAllPairBondRels() {
        // console.log("in get all pair bonds");
        return this.apiService.get("/pairbondrels")
            .do(function(res) {
                this.pairBondRelationships = res;
            }.bind(this)
        );
    }

    getAllParentalRelTypes () {
        return this.apiService.get("/parentalreltypes")
            .do(function(res) {
                this.parentalRelTypes = res;
            }.bind(this)
        );
    }

    getAllPersonChanges () {
        return this.apiService.get("/personchanges")
            .do(function(res) {
                this.personChanges = res;
                console.log("after get of personChanges with:", res);
            }.bind(this)
        );
    }

    getPersonById(_id: string) {
        return this.persons.find(function(person){
                            return person._id === _id;
                     });
    }

    addToArray(arr, element) {
        if ( !arr.includes(element) ) {
            arr.push(element);
        }
        return arr;
    }

    createPerson() {
        return this.apiService.post("/create", JSON.stringify({
            objectType: "person",
            object: {
                fName : "",
                mName: "",
                lName: "",
                sexAtBirth: "",
                birthDate: "",
                birthPlace: ""
            }
        })).do(function(res) {
            this.persons.push(res);
            console.log("after call to create Person, with", res);
        }.bind(this));

    }

    createParent(star_id: string) {
        return this.apiService.post("/create", JSON.stringify({
            objectType: "parentalRel",
            object: {
                child_id: star_id,
                parent_id: null,
                relationshipType: "",
                subType: "",
                startDate: "",
                endDate: ""
            }
        })).do(function(res) {
            if (res.child_id) {
                this.parentalRelationships.push(res);
            } else {
                alert("Error adding parent, check internet connection. Or logout and log back in and try again: " + res.message);
            }
        }.bind(this));

    }

    createPairBond(star_id: string) {
        return this.apiService.post("/create", JSON.stringify({
            objectType: "pairBondRel",
            object: {
                // _id: this.next_id.toString(),
                personOne_id: star_id,
                personTwo_id: null,
                relationshipType: "",
                startDate: "",
                endDate: ""
            }
        })).do(function(res) {
            if (res.personOne_id) {
                this.pairBondRelationships.push(res);
            } else {
                alert("Error adding pair bond, check internet connection. Or logout and log back in and try again: " + res.message);
            }
        }.bind(this));
    }

    createPersonChange(star_id: string) {
        console.log("in dataService.createPersonChange");
        return this.apiService.post("/create", JSON.stringify({
            objectType: "personChange",
            object: {
                person_id: star_id,
                dateChange: "",
                fName : "",
                mName: "",
                lName: "",
                sex: ""
            }
        })).do(function(res) {
            console.log("after createPersonChange. Result is:", res);
            this.personChanges.push(res);
        }.bind(this));
    }

    deletePerson(_id: string) {
        // console.log("in dataService.deletePerson, with:", _id);
        // first find every record where the person is in a parentalRel, and delete that record
        // this should be done with one call to the server, but I'm going to do it here for speed sake
        let parentalRels = this.parentalRelationships.filter(function(parentalRel) {
            return parentalRel.parent_id === _id ||
                parentalRel.child_id === _id;
        });
        console.log("in dataService.deletePerson, parents to delete:", parentalRels);
        for (let parentalRel of parentalRels) {
            this.deleteParentalRel(parentalRel._id).subscribe();
        }

        // next, find every record where the person is in a pairBondRel, and delete that record
        let pairBondRels = this.pairBondRelationships.filter(function(rel) {
            return rel.personOne_id === _id ||
                rel.personTwo_id === _id;
        });
        console.log("in dataService.deletePerson, pairBonds to delete:", pairBondRels);
        for (let pairBondRel of pairBondRels) {
            this.deletePairBondRel(pairBondRel._id).subscribe();
        }

        // now we can delete the person record
        return this.apiService.post("/delete", JSON.stringify({
            objectType: "person",
            _id: _id
        })).do(function(res) {
            this.persons = res;
        }.bind(this));
    }

    deleteParentalRel(_id: string) {
        // console.log("in dataService.deleteParentalRel, with:", _id);

        return this.apiService.post("/delete", JSON.stringify({
            objectType: "parentalRel",
            _id: _id
        })).do(function(res) {
            this.parentalRelationships = res;
        }.bind(this));
    }

    deletePairBondRel(_id: string) {
        // console.log("in dataService.deletePairBondRel, with:", _id);

        return this.apiService.post("/delete", JSON.stringify({
            objectType: "pairBondRel",
            _id: _id
        })).do(function(res) {
            this.pairBondRelationships = res;
        }.bind(this));
    }

    deletePersonChange(_id: string) {
        console.log("in dataService.deletePersonChange, with:", _id);

        return this.apiService.post("/delete", JSON.stringify({
            objectType: "personChange",
            _id: _id
        })).do(function(res) {
            this.personChanges = res;
        }.bind(this));
    }

    updatePerson(newValue) {
        // console.log("in dataService.updatePerson", newValue);
        return this.apiService.post("/update", JSON.stringify({
            objectType: "person",
            object: newValue
            })).do(function(res){
                this.overwrite(this.getPersonById(newValue._id));
        }.bind(this));

    }

    updateParentalRel(newValue) {
        // console.log("in dataService.updateParentRel", newValue);
        return this.apiService.post("/update", JSON.stringify({
            objectType: "parentalRel",
            object: newValue
            })).do(function(res){
                this.overwrite(this.getParentalRelById(newValue._id));
        }.bind(this));
    }

    updatePairBondRel(newValue) {
        // console.log("in dataService.updatepairBondRel", newValue);
        return this.apiService.post("/update", JSON.stringify({
            objectType: "pairBondRel",
            object: newValue
            })).do(function(res){
                this.overwrite(this.getPairBondRelById(newValue._id));
        }.bind(this));
    }

    updatePersonChange(newValue) {
        console.log("in dataService.updatePersonChange", newValue);
        return this.apiService.post("/update", JSON.stringify({
            objectType: "personChange",
            object: newValue
            })).do(function(res){
                this.overwrite(this.getPersonChangeById(newValue._id));
        }.bind(this));
    }

    getParentalRelById(_id: string) {
        return this.parentalRelationships.find(function(parentRel){
            return parentRel._id === _id;
            }
        );
    }

    getPairBondRelById(_id: string) {
        return this.pairBondRelationships.find(function(pairBondRel){
            return pairBondRel._id === _id;
            }
        );
    }

    getPersonChangeById(_id: string) {
        return this.personChanges.find(function(personChange){
            return personChange._id === _id;
            }
        );
    }

    overwrite(orig, newValues) {
        for (let i in newValues) {
            if (newValues.hasOwnProperty(i)) {
                orig[i] = newValues[i];
            }
        }
    }
}