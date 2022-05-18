package com.tsofen.users.services;

import java.util.List; 

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import com.tsofen.users.beans.Classroom;
import com.tsofen.users.beans.Program;
import com.tsofen.users.beans.ProgramToSchoolProperties;
import com.tsofen.users.beans.School;
import com.tsofen.users.beans.Student;
import com.tsofen.users.beans.User;
import com.tsofen.users.repos.ProgramRepo;
import com.tsofen.users.repos.ProgramToSchoolRepo;
import com.tsofen.users.repos.SchoolRepo;
import com.tsofen.users.repos.UserRepo;

@Service
public class SchoolService {
	@Autowired
	private SchoolRepo schoolRepo;
	
	@Autowired
	private ProgramRepo programRepo;
	
	@Autowired
	private ProgramToSchoolRepo programToSchoolRepo;
	
	@Autowired
	private UserRepo userRepo;
	
	public boolean addSchool(School school) {
		School exsitingSchool=schoolRepo.findByName(school.getName());
		if(exsitingSchool==null) {			
			schoolRepo.save(school);
			return true;
		}
		else {
			return false;
		}
	}
	
	public boolean updateLink(@RequestBody ProgramToSchoolProperties programToSchoolProperties) {
		ProgramToSchoolProperties exsitprogramAttachedtoSchool = programToSchoolRepo.findByprogram_idAndSchool_idEquals(programToSchoolProperties.getId().getProgramId(),programToSchoolProperties.getId().getSchoolId());
		if(exsitprogramAttachedtoSchool!=null) {
			programToSchoolProperties.setId(exsitprogramAttachedtoSchool.getId());
			programToSchoolRepo.save(programToSchoolProperties);
			return true;
		}
		return false;

	}
		
		
	public List<School> getAllSchool() {
		return schoolRepo.findAll()	;
	}
	
	public School getById(int schoolId) {
		return schoolRepo.findById(schoolId);
	}
	
	public boolean link(ProgramToSchoolProperties programToSchoolProperties, int programId, int schoolId) {
		System.out.println("linking program: "+programToSchoolProperties);
		
		
		
		//School school=this.schoolRepo.findById(schoolId);
		Program program=this.programRepo.findByIdEquals(programId);
		programToSchoolProperties.setProgram(program);
		//programToSchoolProperties.setSchool(school);
		//System.out.println("school:"+school);
		//school.getProperties().add(programToSchoolProperties);
		programToSchoolRepo.save(programToSchoolProperties);
		return true;
				
	}
 
	public ProgramToSchoolProperties getLinked(@RequestBody int schoolId,@RequestBody int progId) {
		return schoolRepo.getLink(schoolId,progId);
	}
	
	
	public List<Classroom> getSchoolClasses(int schoolId){
		//changer to function that get all classes of a school
		return getById(schoolId).getClasses();
	}
	
	
	public School getSchoolByUserId(int userId) {
		User user = userRepo.findById(userId);
		School school=new School();
		school=user.getSchool();
		return school;
	}
}