import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { SchoolClassModel } from '../models/school-class-model';
import { Observable } from 'rxjs';
//import {APP_URL} from '../models/global-constant'
import { StudentModel } from '../models/student-model';



@Injectable({
  providedIn: 'root'
})
export class SchoolClassServiceService {

  private serverUrl = "http://localhost:8080/api/classes/";

  constructor(private httpClient:HttpClient) {}


  getClasses(): Observable<SchoolClassModel[]>{
    return this.httpClient.get<SchoolClassModel[]>(this.serverUrl+"get_all_classes") 
  }
  getClassesBySchoolId(schoolId:number): Observable<SchoolClassModel[]>{
    return this.httpClient.get<SchoolClassModel[]>(this.serverUrl+"get-class-by-school-id?schoolId="+schoolId) 
  }
  

  getSchoolClasses(schoolId:number): Observable<SchoolClassModel[]>{
    return this.httpClient.get<SchoolClassModel[]>(this.serverUrl+"get-school-classes?schoolId="+schoolId); 
  }
  
  getClassRoomStudents(classroomId:number): Observable<StudentModel[]> {
    return this.httpClient.get<StudentModel[]>(this.serverUrl+"get_classroom_student?classroomId="+classroomId);
  }
  getClassById(id:number): Observable<SchoolClassModel>{
    return this.httpClient.get<SchoolClassModel>(this.serverUrl+"get-class-by-id?id="+id);
  }

  getStudentsBySchoolIdAndClassRoomId(schoolId:number,classroomId:number): Observable<StudentModel[]> {
    return this.httpClient.get<StudentModel[]>(this.serverUrl+"get-student-by-schoolId-classRoomId?schoolId="+schoolId+"&classroomId="+classroomId);
  }
}
