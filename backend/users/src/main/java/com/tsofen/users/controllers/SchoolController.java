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
import org.springframework.web.bind.annotation.RestController;

import com.tsofen.users.beans.ProgramToSchoolProperties;
import com.tsofen.users.beans.Classroom;
import com.tsofen.users.beans.Program;
import com.tsofen.users.beans.School;
import com.tsofen.users.beans.Student;
import com.tsofen.users.services.SchoolService;
@CrossOrigin
@RestController
@RequestMapping("api/schools")
public class SchoolController {
	@Autowired
	private SchoolService schoolService;
	
	@PostMapping("add-school")
	public HttpStatus addSchool(@RequestBody School school) {
		if(this.schoolService.addSchool(school)==true) {
			return HttpStatus.ACCEPTED;
		}
		else {return HttpStatus.BAD_REQUEST;}
		
	}
	
	
	
	@GetMapping("get-all-schools")
	public List<School> getAll() {
		return schoolService.getAllSchool();
	}
	
	@GetMapping("get-school-by-id")
	public School getById(int id) {
		return schoolService.getById(id);
	}
	
	@PostMapping("add-link")
	public boolean addLink(@RequestBody ProgramToSchoolProperties programToSchoolProperties, int programId, int schoolId) {
		return schoolService.link(programToSchoolProperties, programId, schoolId);		
	}
	
	@PutMapping("edit-link")
	public boolean editLink(@RequestBody ProgramToSchoolProperties programToSchoolProperties) {
		return schoolService.updateLink(programToSchoolProperties);
	}
	
	@GetMapping("get-school-classes")
	public List<Classroom> getSchoolClasses(int schoolId){
		return schoolService.getSchoolClasses(schoolId);
	}
	
	@GetMapping("get-link")
	public ProgramToSchoolProperties getLink(int schoolId, int ProgId){
		return schoolService.getLinked(schoolId,ProgId);
	}
	
	@GetMapping("get-school-by-user-id")
    public School getUserBySchoolId(int userId) {
        return schoolService.getSchoolByUserId(userId);
    }
}
