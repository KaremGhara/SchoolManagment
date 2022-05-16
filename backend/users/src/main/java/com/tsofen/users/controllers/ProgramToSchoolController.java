package com.tsofen.users.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tsofen.users.beans.Program;
import com.tsofen.users.beans.ProgramToSchoolProperties;
import com.tsofen.users.services.ProgramService;
import com.tsofen.users.services.ProgramToSchoolServices;

@CrossOrigin
@RestController
@RequestMapping("api/programs")
public class ProgramToSchoolController {

@Autowired
private ProgramToSchoolServices programToSchoolService;
	
	@GetMapping("get_programToSchool")
	public List<ProgramToSchoolProperties> getAllProgramsoSchool(){
		return this.programToSchoolService.getAllProgramToSchool();
	}
	
	@GetMapping("get-link")
	public ProgramToSchoolProperties getLink( int ProgId,int schoolId){
		return programToSchoolService.getLinked(ProgId,schoolId);
	}

}
