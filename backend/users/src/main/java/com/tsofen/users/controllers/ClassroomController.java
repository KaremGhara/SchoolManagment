package com.tsofen.users.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.tsofen.users.beans.Classroom;
import com.tsofen.users.beans.Student;
import com.tsofen.users.services.ClassroomService;
@CrossOrigin
@RestController
@RequestMapping("api/classes")
public class ClassroomController {
	@Autowired
	private ClassroomService classroomService;

	@GetMapping("get_all_classes")
	public List<Classroom> getAllClasses(){
		return classroomService.getAllClasses();
	}
	@GetMapping("get-class-by-id")
	public Classroom getClassById(int classId) {
		 return classroomService.getClassById(classId);
		
	}
	
	@GetMapping("get-class-by-school-id")
	public List<Classroom> getClassBySchoolId(int schoolId) {
		 return classroomService.getAllClassesBySchoolId(schoolId);
	}
	
	@GetMapping("get_classroom_student")
	public List<Student> getClassroomStudents(int classroomId){
		return classroomService.getClassroomStudents(classroomId);
	}

	@PostMapping("add_classroom")
	public void addClassroom(@RequestBody Classroom classroom, int schoolId) {
		classroomService.addClassroom(classroom, schoolId);
	}

	@PutMapping("edit_classroom")
	public void editclassroom(@RequestBody Classroom classroom) {
		classroomService.editClassroom(classroom);
	}

	@PutMapping("delete_classroom")
	public void deleteclassroom(@RequestParam int id ) {
		classroomService.deleteClassroom(id);
	}
	

	@GetMapping("Search/ByGrade")
	public List<Classroom> SearchClassesByGrade(@RequestParam String Grade){
		return classroomService.SearchClassbyGrade(Grade);	
	}
	
}