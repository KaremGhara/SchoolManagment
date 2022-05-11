package com.tsofen.users.services;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.transaction.Transactional;

import org.hibernate.Session;
import org.hibernate.Filter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.multipart.MultipartFile;

import com.tsofen.users.beans.Classroom;
import com.tsofen.users.beans.Program;
import com.tsofen.users.beans.ProgramToSchoolProperties;
import com.tsofen.users.beans.School;
import com.tsofen.users.beans.Student;
import com.tsofen.users.helper.HelperCSV;
import com.tsofen.users.repos.ClassroomRepo;
import com.tsofen.users.repos.ProgramRepo;
import com.tsofen.users.repos.SchoolRepo;
import com.tsofen.users.repos.StudentRepo;

@Service
public class StudentService {
	@Autowired
	private StudentRepo studentRepo;
	
	@Autowired
	SchoolRepo schoolRepo;
	
	@Autowired
	ClassroomRepo classroomRepo;

	@Autowired
	ProgramRepo programRepo;
	
	@Autowired
	ClassroomService classroomService;
	
	HelperCSV helperCSV=new HelperCSV();
	
	@Autowired
	private EntityManager entityManager;

	
	public List<Student> getAllStudents() {
		return studentRepo.findAll();
	}

	public boolean addStudent(Student student,int classRoomId) {
		Student exsitingStudent=studentRepo.findBySocialId(student.getSocialId());
		if(exsitingStudent==null) {
			Classroom classroom=this.classroomRepo.findById(classRoomId);
			if(classroom==null)
			{
				return false;
			}
			student.setClassroom(classroom);
			student.getClassroom().setSchool(classroom.getSchool());
			studentRepo.save(student);
			return true;
		}
		return false;
	}
	
	public List<Student> getAllStudentsInSchool(int schoolId) {
	    List<Student> listStu = new ArrayList<Student>();
		School school=schoolRepo.findById(schoolId);
		List<Classroom> classroom=school.getClassrooms();
		
		for(Classroom classes:classroom) {
			Classroom classRoom= classroomRepo.findById(classes.getId());
			listStu.addAll(classRoom.getStudents()); 
		}
		
		return listStu;
	}
	
	public List<Student> findAll(boolean isDeleted){
	       Session session = entityManager.unwrap(Session.class);
	        Filter filter = session.enableFilter("deletedStudentFilter");
	        filter.setParameter("isDeleted", isDeleted);
	        List<Student> students =  studentRepo.findAll();
	        session.disableFilter("deletedProductFilter");
	        return students;
	    }
	

	@Transactional
	public boolean updateStudent(Student  student) {
		Student exsitStudent = studentRepo.findById(student.getId());
		if(exsitStudent!=null) {
			student.setId(exsitStudent.getId());
			student.getClassroom().setId(student.getClassroom().getId());
			studentRepo.save(student);
			return true;
		}
		return false;
	}

	//,int schoolId
	public void saveCSV(MultipartFile file,int schoolId) {
		try {
			List<Student> students = helperCSV.convertExcelToStudent(file.getInputStream());
			for(Student stu:students)
			{
				
				
				Student exsisting = studentRepo.findBySocialId(stu.getSocialId());
				if(exsisting==null)
				{
				Classroom classroom=classroomRepo.findByGradeAndOrdinalNumber(stu.getClassroom().getGrade(),stu.getClassroom().getOrdinalNumber());
				
				if(classroom==null)
				{
					
					School school=schoolRepo.findById(schoolId);
					stu.getClassroom().setSchool(school);
					studentRepo.save(stu);
				}
				else {
					School school=schoolRepo.findById(schoolId);
					classroom.setSchool(school);
					stu.setClassroom(classroom);
					studentRepo.save(stu);
				}
				
				}
			}

		} catch (IOException e) {
			e.printStackTrace();
		}
	}

//	public boolean deleteStd(int id) {
//		Student delStudent =  studentRepo.findById(id);
//
//		if(delStudent!=null)
//		{
//			studentRepo.deleteById(id);
//			return true;
//		}
//		return false;
//
//	}
	
	
	public boolean deleteStd(int id) {
		Student delStudent =  studentRepo.findById(id);

		if(delStudent!=null)
		{
			classroomService.deleteStudentClassRoom(id);
			return true;
		}
		return false;
	}
	


	public Student findBySocialId(String socialId) {
		Student student = studentRepo.findBySocialId(socialId);
		if(student==null)
			throw new IllegalStateException("Student with ID: " + socialId + " Doesn't Exist!");
		else
			return student;
	}
	public Student findById(int id) {
		return studentRepo.findById(id);

	}
	
	public List<Student> findByExist(boolean exist){
		return studentRepo.findByIsActive(exist);
	}

	public List<Program> getStudentPrograms(int studentId) {
		return studentRepo.findById(studentId).getPrograms();
	}
	
	public boolean addProgram(int studentId, int programId) {
		Program programToAdd= programRepo.getById(programId);
		Student exsitingStudent = studentRepo.findById(studentId);
		
		for (Program isExsitingprogram : exsitingStudent.getPrograms()) {
			if (isExsitingprogram.getId()== programId) {
				return false;
			}
		}
		exsitingStudent.getPrograms().add(programToAdd);
		studentRepo.save(exsitingStudent);
		return true;
	}
	
	public List<Program> findAvilablePrograms(int studentId){
		Student student= studentRepo.findById(studentId);
		List<Program> studentPrograms= student.getPrograms();
		List<Program> avilablePrograms = programRepo.getProgramsBySchool(student.getClassroom().getSchool().getId());
		for (Program prog: studentPrograms) {
			if (studentPrograms.contains(prog)) {
				avilablePrograms.remove(prog);
			}
		}
		return avilablePrograms;
	}
	public boolean removeProgram(int studentId, int programId) {
		Student existingStudent = studentRepo.findById(studentId);
		List<Program> existingPrograms = existingStudent.getPrograms();
		System.out.println("existingPrograms.size():"+existingPrograms.size());
		for (int i = 0; i < existingPrograms.size(); i++) {
			if (existingPrograms.get(i).getId() == programId) {
				existingStudent.getPrograms().remove(i);		
				studentRepo.save(existingStudent);
				return true;
			}
		}	
		return false;
	}
}






