import { CommonModule } from "@angular/common";
import { UserRole } from "../common-utils/classes/user-role";
import { SchoolModel } from "./school-model";

export class UserModel {
static id: any;

constructor(
    public id?:number,
	public fname?:string,
	public lname?:string,
	public socialId?:string,
    public email?:string,
	public phone?:string,
	public password?:string,
	public role?:UserRole,
	public status:boolean = true,
	public school?:SchoolModel,
	public  attach?: boolean,
	public img?:string,

)
{}
}
