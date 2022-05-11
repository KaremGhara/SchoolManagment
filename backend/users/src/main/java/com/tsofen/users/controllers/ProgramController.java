package com.tsofen.users.controllers;

import java.util.Collection;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.tsofen.users.beans.Classroom;
import com.tsofen.users.beans.Program;
import com.tsofen.users.beans.ProgramToSchoolProperties;
import com.tsofen.users.beans.Student;
import com.tsofen.users.services.ProgramService;

@CrossOrigin
@RestController
@RequestMapping("api/programs")
public class ProgramController {
	@Autowired
	private ProgramService programService;
	

	@GetMapping("get_programs")
	public List<Program> getAllPrograms(){
		return this.programService.getAllPrograms();
	}
	
	
	@PostMapping("add_program")
	//add_program?programManagerId=1
	public boolean addProgram(@RequestBody Program program, @RequestParam int programManagerId) {
		return programService.addProgram(program, programManagerId);
	}
	

	@PutMapping("updateProgram")
	public boolean editProgram(@RequestBody Program program) {
		return programService.updateProgram(program);
	}
	

	@DeleteMapping("delete/program")
	public HttpStatus deleteProgram(int id) {
		if(programService.deleteProgram(id)) return HttpStatus.ACCEPTED;
		else {return HttpStatus.BAD_REQUEST;}
	}
	
	
	@GetMapping("search/byId")
	public Program findByIdEquals(int id){
		return this.programService.findByIdEquals( id);
	}
	
	
	@GetMapping("search/byName")
	public List<Program> findByNameIgnoreCase(String name){
		return this.programService.findByNameIgnoreCase( name);
	}
	

	@GetMapping("search/bycost")
	public List<Program> findByCostBetween(int min, int max){
		return this.programService.findByCostBetween(min, max);
	}
	
	@GetMapping("search/bySchoolId")
	public List<Program> findBySchool(int schoolId){
		return this.programService.findBySchool(schoolId);
	}
	

	@GetMapping("search/byIdSchool")
	public List<Program> findPrograms(int schoolId){
		return this.programService.findPrograms(schoolId);
	}
	
//	@PostMapping("addLink")
//	public boolean addLink(@RequestBody ProgramToSchoolProperties programToSchoolProperties) {
//		return this.programService.link(programToSchoolProperties);		
//	}
	
}
