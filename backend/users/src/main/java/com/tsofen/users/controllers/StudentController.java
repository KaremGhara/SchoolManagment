package com.tsofen.users.controllers;

import java.util.List ;	
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.tsofen.users.beans.Program;
import com.tsofen.users.beans.Student;
import com.tsofen.users.helper.HelperCSV;
import com.tsofen.users.repos.StudentRepo;
import com.tsofen.users.services.StudentService;

@CrossOrigin
@RestController
@RequestMapping("api/students")
public class StudentController {

	@Autowired
	private StudentService studentService;

	@PostMapping("add-student")
	public boolean addStudent(@RequestBody Student  student,@RequestParam int classroomId) {
		if(this.studentService.addStudent(student,classroomId)) {
			return true;
		}
		else {return false;}
	}
	@GetMapping("get-all-student")
	public List<Student> getAll(){
		return studentService.getAllStudents();
	}

	@PutMapping("update-student")
	public HttpStatus editStudent(@RequestBody Student student) {
		if(studentService.updateStudent(student)==true) return HttpStatus.ACCEPTED;
		else {return HttpStatus.BAD_REQUEST;}

	}


	@GetMapping("get-all-student-by-school-id")
	public List<Student> getAllStudentBySchoolId(int schoolId)
	{
		return studentService.getAllStudentsInSchool(schoolId);
	}	
	@PostMapping("upload-student")
	public ResponseEntity<?> upload(@RequestParam("file") MultipartFile file,int schoolId){
		if(HelperCSV.checkFormatCSV(file)) {
			
			this.studentService.saveCSV(file,schoolId);
			return ResponseEntity.ok(Map.of("message", "File is uploaded and data is saved to db"));
		}
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Please upload excel file ");
	}


	@GetMapping("getStudentById")
	public Student findById(int id)
	{
		return studentService.findById(id);
	}
	@DeleteMapping("delete-student")
	public HttpStatus deleteStudent(int id) {
		if(studentService.deleteStd(id)==true) return HttpStatus.ACCEPTED;
		else {return HttpStatus.BAD_REQUEST;}
	}

	@GetMapping("find-StudentById")
	public Student findById(@RequestParam String socialId){
		return studentService.findBySocialId(socialId);
	}
	@GetMapping("find-StudentByExist")
	public List<Student> findByExist(boolean exist){
		return studentService.findByExist(exist);
	}
	
	@GetMapping("get-student-programs")
	public List<Program> getStudentPrograms(int studentId){
		return studentService.getStudentPrograms(studentId);
	}

	@GetMapping("get-student-avilabe-programs")
	public List<Program> findAvilablePrograms(int studentId){
		return studentService.findAvilablePrograms(studentId);
	}

	@PostMapping("add-program")
	public HttpStatus addProgram(@RequestParam int programId, int studentId) {
		if(this.studentService.addProgram(studentId, programId)) {
			return HttpStatus.ACCEPTED;
		}
		else {return HttpStatus.BAD_REQUEST;}
	}
	@PutMapping("remove-program")
	public HttpStatus removeProgram(@RequestParam int programId, int studentId) {
		if(this.studentService.removeProgram(studentId, programId)) {
			return HttpStatus.ACCEPTED;
		}
		else {return HttpStatus.BAD_REQUEST;}
	}
	
}