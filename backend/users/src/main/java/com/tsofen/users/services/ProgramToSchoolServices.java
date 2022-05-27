package com.tsofen.users.services;

import java.util.List;
import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import com.tsofen.users.beans.ProgramToSchoolProperties;
import com.tsofen.users.repos.ProgramToSchoolRepo;

@Service
public class ProgramToSchoolServices {

	@Autowired
	private ProgramToSchoolRepo programToSchoolRepo;

	// All programsToSchool
	public List<ProgramToSchoolProperties> getAllProgramToSchool() {
		return this.programToSchoolRepo.findAll();
	}

	public ProgramToSchoolProperties getLinked(@RequestBody int ProgId, @RequestBody int schoolId) {
		return programToSchoolRepo.findByprogram_idAndSchool_idEquals(ProgId, schoolId);
	}

	public List<ProgramToSchoolProperties> getLinkedBySchoolId(@RequestBody int schoolId) {
		return programToSchoolRepo.findBySchool_idEquals(schoolId);
	}

	@Transactional
	public boolean updateLinkProgram(ProgramToSchoolProperties programToSchoolProperties) {
		ProgramToSchoolProperties exsitLink = programToSchoolRepo.findByprogram_idAndSchool_idEquals(
				programToSchoolProperties.getId().getProgramId(), programToSchoolProperties.getId().getSchoolId());
		if (exsitLink != null) {
			programToSchoolProperties.getId().setProgramId(exsitLink.getId().getProgramId());
			programToSchoolProperties.getId().setSchoolId(exsitLink.getId().getSchoolId());
			programToSchoolRepo.save(programToSchoolProperties);
			return true;
		}
		return false;
	}

}
