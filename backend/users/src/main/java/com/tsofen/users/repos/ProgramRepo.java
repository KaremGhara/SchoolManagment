package com.tsofen.users.repos;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.tsofen.users.beans.Program;

@Repository
public interface ProgramRepo extends JpaRepository<Program, Integer>{
	public Program findByNameIgnoreCase(String name);
	public List<Program> findByNameEquals(String name);
	public List<Program> findByCostBetween(int min, int max);
	public Program findByIdEquals(int Id);
	public List<Program> findAll();
	
	@Query(value = "select * from tsofen_project.programs join tsofen_project.program_to_school_properties using (program_id) where school_id=?1", nativeQuery = true)
	public List<Program> getProgramsBySchool( int schoolId);
	


}
