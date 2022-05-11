import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserModel } from '../models/user-model'
import {APP_URL} from '../models/global-constant';





@Injectable({
  providedIn: 'root'
})


export class UserServiceService {
  public loggedInUser : UserModel = null;
  dialogData: any;
  dataChange: BehaviorSubject<UserModel[]> = new BehaviorSubject< UserModel[]>([]);

  getDialogData() {

    alert(this.dialogData);
 }
 get data(): UserModel[] {
   return this.dataChange.value;
 }
 

  //apiURL="http://localhost:8080/api/";

  constructor(private http:HttpClient) {  }

  getAllUsers(): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(APP_URL+"users/get-all-users");
}
//update12/316:03
updateSystemUser(user:UserModel):Observable<UserModel>{
  return this.http.put<UserModel>(APP_URL+"users/edit-user",user);
}
createUser(user: UserModel):Observable<UserModel> {
  return this.http.post<UserModel>(APP_URL+"users/create-user",user);
}
getUserById(id:number):Observable<UserModel>{
  return this.http.get<UserModel>(APP_URL+"users/get-user-by-id?id="+id);
}
//original
deleteUser(id:number):Observable<UserModel>{
  return this.http.delete<UserModel>(APP_URL+"users/delete-user?id="+id);
}
softDeleteUser(user:UserModel):Observable<UserModel>{
  return this.http.put<UserModel>(APP_URL+"users/soft_delete_user?id=",user);
}
// getAllUsersDeleted():Observable<UserModel>{
//   return this.http.get<UserModel>(APP_URL+"users/soft-delete");
// }
getUserBySocialId(sId:string):Observable<UserModel>{
  return this.http.get<UserModel>(APP_URL+"users/get-user-by-socialId?sId="+sId);
}
loginUser(user:UserModel):Observable<UserModel>{
  return this.http.post<UserModel>(APP_URL+"users/login",user);
}

getUserByEmail(email:string):Observable<UserModel>{
  return this.http.get<UserModel>(APP_URL+"users/get-user-by-email?email="+email);
}
// getUserByEmail(EmailModule:EmailModule):Observable<UserModel>{
//   return this.http.get<UserModel>(APP_URL+"users/get-user-by-email?EmailModule="+EmailModule);
// }

saveUsersFile(formData:FormData): Observable<UserModel>{
  alert(formData)
  return this.http.post<UserModel>(APP_URL+"users/upload",formData);
}

getUserByRole(role:String):Observable<UserModel[]>{
  return this.http.get<UserModel[]>(APP_URL+"users/get-user-by-role?role="+role);
}
}

function user<T>(arg0: string, user: any): Observable<UserModel> {
  throw new Error('Function not implemented.');
}
