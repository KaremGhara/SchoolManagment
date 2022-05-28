package com.tsofen.users.repos;

import java.util.List; 
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.tsofen.users.beans.Classroom;

@Repository
public interface ClassroomRepo extends JpaRepository<Classroom, Integer> {
	public List<Classroom> findAllByGradeIgnoreCase(String Grade);
	public Classroom findByGradeAndOrdinalNumberAndId(String Grade,String OrdinalNumber,int schoolId);
	public List<Classroom> findAllByStatus(boolean status);
	public Classroom findByGradeAndOrdinalNumber(String grade,String ordinalNumber);
	public Classroom findById(int classId);
	List<Classroom> findByschool_idEquals(int schooId);
	Classroom findByschool_idAndId(int schooId,int classRoomId);


	

}
