package com.tsofen.users.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tsofen.users.beans.Program;
import com.tsofen.users.beans.ProgramToSchoolProperties;
import com.tsofen.users.repos.ProgramRepo;
import com.tsofen.users.repos.ProgramToSchoolRepo;


@Service
public class ProgramToSchoolServices {

	
	@Autowired
	private ProgramToSchoolRepo programToSchoolRepo;
	
	// All programsToSchool
	public List<ProgramToSchoolProperties> getAllProgramToSchool()
	{
		return this.programToSchoolRepo.findAll();
	}
	
}
