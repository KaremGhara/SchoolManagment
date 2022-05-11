import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProgramModel } from '../models/program-model'
import { BehaviorSubject } from 'rxjs';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { ProgramToSchool } from '../models/ProgramToSchool';


@Injectable({
    providedIn: 'root'
})
export class ProgramServiceService extends UnsubscribeOnDestroyAdapter {

    dataChange: BehaviorSubject<ProgramModel[]> = new BehaviorSubject<ProgramModel[]>([]);

    constructor(private http: HttpClient) { super(); }
    baseURL: string = "http://localhost:8080/api/programs/";
    private links: ProgramToSchool;

    get data(): ProgramModel[] {
        return this.dataChange.value;
    }
    getProgramById(id: number): Observable<ProgramModel> {
        return this.http.get<ProgramModel>(this.baseURL + "search/byId?id=" + id);
    };

    getProgramBySchoolId(schoolId: number): Observable<ProgramModel[]> {

        return this.http.get<ProgramModel[]>(this.baseURL + "search/bySchoolId?schoolId=" + schoolId);

    };

    getNotLinkedPrograms(programsId: number[]): Observable<ProgramModel[]> {
        return this.http.get<ProgramModel[]>(this.baseURL + "search/byProgramsId?programsId=" + programsId);
    };

    getAllProgram(): Observable<ProgramModel[]> {
        return this.http.get<ProgramModel[]>(this.baseURL + "get_programs")
    }
    getAllProgramToSchool(): Observable<ProgramToSchool[]> {
        return this.http.get<ProgramToSchool[]>(this.baseURL + "get_programToSchool")
    }
    addProgram(program: ProgramModel, programManagerId: number): Observable<ProgramModel> {
        return this.http.post<ProgramModel>(this.baseURL + "add_program?programManagerId=" + programManagerId, program);
    }
    deleteProgram(id: number): Observable<ProgramModel> {
        return this.http.delete<ProgramModel>(this.baseURL + "delete/program?id=" + id);
    }
    editProgram(program: ProgramModel): Observable<ProgramModel> {
        return this.http.put<ProgramModel>(this.baseURL + "updateProgram", program);
    }
    linkProgram(link: ProgramToSchool): Observable<ProgramToSchool> {
        return this.http.post<ProgramToSchool>(this.baseURL + "addLink", link)
    }
    findNotLinkedPrograms(schoolId: number): Observable<ProgramModel[]> {
        return this.http.get<ProgramModel[]>(this.baseURL + "search/byIdSchool?schoolId=" + schoolId)
    }


}
