import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { SchoolModel } from '../models/school-model';
import { Observable } from 'rxjs';
import { ProgramToSchool } from '../models/ProgramToSchool';
import { SchoolClassModel } from '../models/school-class-model';


@Injectable({
  providedIn: 'root'
})
export class SchoolServiceService {
  private serverUrl = "http://localhost:8080/api/schools/";

  constructor(private httpClient:HttpClient) { }
  private schools: SchoolModel[] ;
  private links: ProgramToSchool ;

  public getSchoolById(id: number): Observable<SchoolModel> {
    return this.httpClient.get<SchoolModel>(this.serverUrl+"get-school-by-id?id="+id);
  }

  public getSchools(): Observable<SchoolModel[]> {
    return this.httpClient.get<SchoolModel[]>(this.serverUrl+"get-all-schools") 
  }

  public addSchool(school: SchoolModel): Observable<void>{
    return this.httpClient.post<void>(this.serverUrl+"add-school", school)
  }

  public linkSchool(link: ProgramToSchool): Observable<ProgramToSchool>{
    return this.httpClient.post<ProgramToSchool>(this.serverUrl+"add-link?schoolId="+link.school.id+"&programId="+link.program.id, link)
  }

  getSchoolClasses(schoolId:number): Observable<SchoolClassModel[]>{
    return this.httpClient.get<SchoolClassModel[]>(this.serverUrl+"get-school-classes?schoolId="+schoolId); 
  }
  editlink(link:ProgramToSchool): Observable<ProgramToSchool>{
    return this.httpClient.post<ProgramToSchool>(this.serverUrl+"edit-link", link)
  }

  getLinkById(schoolId:number, progId:number): Observable<ProgramToSchool>{
    return this.httpClient.get<ProgramToSchool>(this.serverUrl+"get-link?schoolId="+schoolId+"&&ProgId="+progId)
  }
}
