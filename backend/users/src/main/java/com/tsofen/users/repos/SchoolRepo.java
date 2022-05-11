package com.tsofen.users.repos;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.tsofen.users.beans.Program;
import com.tsofen.users.beans.ProgramToSchoolProperties;
import com.tsofen.users.beans.School;

@Repository
public interface SchoolRepo extends JpaRepository<School, Integer>{
	public School  findByName(String name);
	public School  findById(int schoolId);
	
	
	@Query(value = "SELECT * FROM  tsofen_project.programs join tsofen_project.program_to_school_properties using (program_id) join tsofen_project.schools using (school_id) where school_id=?1 AND program_id=?2 ", nativeQuery = true)
	public ProgramToSchoolProperties getLink( int school_id, int program_id);
}
