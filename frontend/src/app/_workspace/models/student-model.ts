import { SchoolClassModel } from "./school-class-model";

export class StudentModel {

	constructor(
		public id?:number,
		public firstName?:string,
		public lastName?:string,
		public socialId?:string,
		public parent1Id?:string,
		public parent2Id?:string,
		public classroom?:SchoolClassModel
	){}
	


}

