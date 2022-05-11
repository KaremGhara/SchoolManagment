import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { StudentModel } from '../models/student-model'
import {APP_URL} from '../models/global-constant'
import { ProgramModel } from '../../_workspace/models/program-model';


@Injectable({
  providedIn: 'root'
})
export class StudentServiceService {
  
  constructor(private http:HttpClient) { }
 
  getAllStudents(): Observable<StudentModel[]> {
    return this.http.get<StudentModel[]>(APP_URL+"students/get-all-student");
  }

  updateStudent(student: StudentModel):Observable<StudentModel> {
    return this.http.put<StudentModel>(APP_URL+"students/update-student",student)
  }
  getStudentById(id:number):Observable<StudentModel>{
    return this.http.get<StudentModel>(APP_URL+"students/getStudentById?id="+id);
  }
  deleteStudent(id:number):Observable<StudentModel>{
    
     return this.http.delete<StudentModel>(APP_URL+"students/delete-student?id="+id);
  }
  addStudent(student: StudentModel,id:number):Observable<StudentModel> {
    return this.http.post<StudentModel>(APP_URL+"students/add-student?classroomId="+id,student)
  }
  saveStudentsFile(formData:FormData,id: number): Observable<StudentModel>{
    return this.http.post(APP_URL+"students/upload-student?schoolId="+id,formData);
  }
  getStudentsBySchoolId(id: number): Observable<StudentModel[]> {
    return this.http.get<StudentModel[]>(APP_URL+"students/get-all-student-by-school-id?schoolId="+id);
  }






  getStudentPrograms(id:number):Observable<ProgramModel[]>{
    return this.http.get<ProgramModel[]>(APP_URL+"students/get-student-programs?studentId="+id);
  }
  removeProgram(programId: number, studentId:number):Observable<void>{
    return this.http.put<void>(APP_URL+"students/remove-program?programId="+programId+"&studentId="+studentId,null);
  }
  getStudentAvilablePrograms(studentId:number):Observable<ProgramModel[]>{
    return this.http.get<ProgramModel[]>(APP_URL+"students/get-student-avilabe-programs?studentId="+studentId);
  }
  addProgram(programId:number, studentId: number):Observable<StudentModel> {
    return this.http.post<StudentModel>(APP_URL+"students/add-program?programId="+programId+"&studentId="+studentId,null)
  }


}
