package com.tsofen.users.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.tsofen.users.beans.Classroom;
import com.tsofen.users.beans.School;
import com.tsofen.users.beans.Student;
import com.tsofen.users.repos.ClassroomRepo;
import com.tsofen.users.repos.SchoolRepo;
import com.tsofen.users.repos.StudentRepo;

@Service
public class ClassroomService {
	@Autowired
	private ClassroomRepo classroomRepo;

	@Autowired
	private SchoolRepo schoolRepo;
	
	@Autowired
	private StudentRepo studentRepo;

	
	public List<Classroom> getAllClasses(){
		return classroomRepo.findAllByStatus(true);
	}

	


	//@SuppressWarnings("unchecked")
	public List<Student> getClassroomStudents(int classRoomId){
		Classroom classRoom= classroomRepo.findById(classRoomId);
		return classRoom.getStudents();
	}
	
	
	//Check with mahmod
	public void addClassroom(Classroom classroom, int schoolId) {
		Classroom exists = 
				classroomRepo.findByGradeAndOrdinalNumber(classroom.getGrade(), classroom.getOrdinalNumber());
		if(exists!=null)
			throw new IllegalStateException("School class " + exists.getGrade()+" " +exists.getOrdinalNumber()+" Already Exists!");
		else
		{
			School  school =schoolRepo.findById(schoolId);
			classroom.setSchool(school);
			classroomRepo.save(classroom);
			
		}
			
	}


	public void editClassroom(Classroom classroom) {
		Classroom class2change = classroomRepo.findById(classroom.getId());
		classroom.setId(class2change.getId());
		classroomRepo.save(classroom);
	}

	
	public void deleteClassroom(int id) {
		Classroom classroom=classroomRepo.getById(id);
		classroom.setStatus(false);
	    classroomRepo.save(classroom);

		
		
	}
	
	public List<Classroom> SearchClassbyGrade(String grade) {
		return classroomRepo.findAllByGradeIgnoreCase(grade);
	}
	
	public Classroom getClassById(int id) {
		 return classroomRepo.findById(id);
		
	}
	
	public void deleteStudentClassRoom(int id) {
		Student student=studentRepo.getById(id);
		student.setActive(false);
		studentRepo.save(student);
	}


}
