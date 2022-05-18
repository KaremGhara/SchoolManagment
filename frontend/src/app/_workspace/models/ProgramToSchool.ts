import { Time } from "@angular/common";
import { ProgramModel } from "./program-model";
import { SchoolModel } from "./school-model";

export class ProgramToSchool {

    constructor(
        public program?:ProgramModel,
        public school?:SchoolModel,
        public startDate?: Date,
        public endDate?: Date,
        public timeDescription?: Time,
    ) { }
}
