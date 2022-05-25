import { Component, OnDestroy, OnInit } from '@angular/core';
import { SchoolClassModel } from 'src/app/_workspace/models/school-class-model';
import {SchoolServiceService} from 'src/app/_workspace/services/school-service.service';
import {SchoolClassServiceService} from 'src/app/_workspace/services/school-class-service.service';
import { ProgramModel } from '../../models/program-model';
import { SchoolModel } from '../../models/school-model';
import { StudentModel } from '../../models/student-model';
import { StudentServiceService } from '../../services/student-service.service';
import { Program } from 'typescript';
import { ProgramServiceService } from '../../services/program-service.service';
@Component({
  selector: 'app-attach-students',
  templateUrl: './attach-students.component.html',
  styleUrls: ['./attach-students.component.sass']
})
export class AttachStudentsComponent implements OnInit {


  breadscrums = [
    {
      title: 'Attach student',
      items: ['Student'],
      active: 'Attach student',
    },
  ];

  constructor(private SchoolServiceService: SchoolServiceService,private classroomService : SchoolClassServiceService, private studentService : StudentServiceService, private programService: ProgramServiceService) { }

  school: SchoolModel=new SchoolModel();
  selectedSchool:SchoolModel;
  classrooms:SchoolClassModel[];
  selectedClassroom:SchoolClassModel=new SchoolClassModel();
  students:StudentModel[];
  selectedStudent:StudentModel;
  programs:ProgramModel[];
  aviablePrograms:ProgramModel[];
  schoolId:number


  ngOnInit(): void {
    const storedItems= JSON.parse(localStorage.getItem('currentUser'))
    this.schoolId=storedItems.id;

    this.SchoolServiceService.getSchoolByUserId(this.schoolId).subscribe({
      next: (school: SchoolModel )=>{
        this.school= school;
        this.getClassRooms();
      },
      error:(error)=> {alert("Couldn't load Schools")}
    })


  }

  getClassRooms()
  {
    this.SchoolServiceService.getSchoolClasses(this.school.id).subscribe((classRooms : SchoolClassModel[])=>{
      this.classrooms = classRooms;
    })
  }

  getStudents()
  {
    this.classroomService.getClassRoomStudents(this.selectedClassroom.id).subscribe((students : StudentModel[])=>{
      this.students = students;
    })
  }

  getPrograms()
  {
    this.studentService.getStudentPrograms(this.selectedStudent.id).subscribe((programs : ProgramModel[])=>{
      this.programs = programs;
    })
  }

  getAviableProgams(){
    this.studentService.getStudentAvilablePrograms(this.selectedStudent.id).subscribe((aviablePrograms : ProgramModel[])=>{
      this.aviablePrograms = aviablePrograms;
    })
  }


  schoolSelected(school : SchoolModel)
  {
    this.school = school;
    this.getPrograms();
    this.students=null;
    this.programs=null;
  }

  classRoomSelected(classroom : SchoolClassModel)
  {
    
    this.selectedClassroom = classroom;
    this.getStudents();
    this.programs=null;
  }

  StudentSelected(student : StudentModel)
  {
    this.selectedStudent = student;
    this.getPrograms();
    this.getAviableProgams();
  }
}
