import { UserModel } from "./user-model";
import { ProgramToSchool } from "./ProgramToSchool";

export class ProgramModel {

    constructor(
        public id?: number,
        public name?: String,
        public cost?: number,
        public shortDescription?: String,
        public longDescription?: String,
        public programmanager?: UserModel,
        public properties?:ProgramToSchool []
    ) { }
}
