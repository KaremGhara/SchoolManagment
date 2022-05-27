package com.tsofen.users.repos;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.tsofen.users.beans.ProgramToSchoolProperties;

@Repository
public interface ProgramToSchoolRepo extends JpaRepository<ProgramToSchoolProperties, Integer> {
	public ProgramToSchoolProperties findByTimeDescription(String time);

	public ProgramToSchoolProperties findByprogram_idAndSchool_idEquals(int ProgId, int schoolId);

	public List<ProgramToSchoolProperties> findBySchool_idEquals(int schoolId);

}
