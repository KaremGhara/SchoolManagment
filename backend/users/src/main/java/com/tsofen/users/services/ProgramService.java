package com.tsofen.users.services;

import java.util.Collection;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import com.tsofen.users.beans.Program;
import com.tsofen.users.beans.ProgramToSchoolProperties;
import com.tsofen.users.beans.School;
import com.tsofen.users.beans.Student;
import com.tsofen.users.beans.User;
import com.tsofen.users.repos.ProgramRepo;
import com.tsofen.users.repos.ProgramToSchoolRepo;
import com.tsofen.users.repos.UserRepo;

@Service
public class ProgramService {
	@Autowired
	private ProgramRepo programsRepo;
	
	
	@Autowired 
	private UserRepo usersRepo; 
	
	
	@Autowired
	private ProgramToSchoolRepo programToSchoolRepo;
	
	
	// All programs
	public List<Program> getAllPrograms()
	{
		return this.programsRepo.findAll();
	}
	
	
	
	// Add program
	public boolean addProgram(Program program, int programManagerId) {
		Program existProgram = programsRepo.findByNameIgnoreCase(program.getName());
		if(existProgram==null) {
			User user = this.usersRepo.findById(programManagerId);
			if(user==null)
			{
				return false;
			}
			program.setProgrammanager(user);
			programsRepo.save(program);
			return true;
		}
		return false;
	}
	
	
	// Update program
	@Transactional
	public boolean updateProgram(@RequestBody Program program) {
		Program exsitProgram = programsRepo.findByIdEquals(program.getId());
		Program exsitProgramByName = programsRepo.findByNameIgnoreCase(program.getName());
		if(exsitProgram!=null) {
			if (exsitProgramByName!=null) {
			if (exsitProgramByName.getId() == program.getId()) {
				program.setId(exsitProgram.getId());
				programsRepo.save(program);
				return true;
			
			}}
			else if (exsitProgramByName==null) {
				programsRepo.save(program);
				return true;
				
			}
			return false;}
		return false;
	}
	

	
	// Delete program
	public boolean deleteProgram(int id) {
		 Program delStudent =  programsRepo.findByIdEquals(id);			
		 if(delStudent!=null)
		 {
			 programsRepo.deleteById(delStudent.getId());
			 return true;
		 }
		return false;		
	}
	
	
	
	// find by ID
	public Program findByIdEquals(int id){
		return this.programsRepo.findByIdEquals(id);
	}
	
	
	public List<Program> findByNameIgnoreCase(String name){
		return this.programsRepo.findByNameEquals(name);
	}

	public List<Program> findByCostBetween(int min, int max){
		return this.programsRepo.findByCostBetween(min, max);
	}
	
	public List<Program> findBySchool(int schoolId){
		return this.programsRepo.getProgramsBySchool(schoolId);
	}


	public List<Program> findPrograms(int schoolId){
		List<Program> programsId = findBySchool(schoolId);
		List<Program> listPrograms = getAllPrograms();
		for (Program prog: programsId) {
			if (listPrograms.contains(prog)) {
				listPrograms.remove(prog);
			}

		}
		return listPrograms;
	}
	
	
//	public boolean link(ProgramToSchoolProperties programToSchoolProperties) {
//		School school=programToSchoolProperties.getSchool();
//		school.getProperties().add(programToSchoolProperties);
//		this.programToSchoolRepo.save(programToSchoolProperties);
//		return true;
//				
//	}

	
}
