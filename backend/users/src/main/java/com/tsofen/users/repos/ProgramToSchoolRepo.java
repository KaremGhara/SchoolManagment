package com.tsofen.users.repos;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.tsofen.users.beans.Program;
import com.tsofen.users.beans.ProgramToSchoolProperties;


@Repository
public interface ProgramToSchoolRepo extends JpaRepository<ProgramToSchoolProperties, Integer>{
	public ProgramToSchoolProperties  findByTimeDescription(String time);
	public ProgramToSchoolProperties  findByprogram_idAndSchool_idEquals(int ProgId,int schoolId);

//	@Query(value = "select * from tsofen_project.programs join tsofen_project.program_to_school_properties using (program_id) where school_id=:id;", nativeQuery = true)
//	public List<Program> getProgramsBySchool(@Param(value = "id") int schoolId);
}
