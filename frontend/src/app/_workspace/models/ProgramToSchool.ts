import { ProgramModel } from "./program-model";
import { SchoolModel } from "./school-model";

export class ProgramToSchool {

    constructor(
        public program?:ProgramModel,
        public school?:SchoolModel,
        public startDate?: String,
        public endDate?: String,
        public timeDescription?: String,
    ) { }
}
